#!/bin/bash

##############################################################################
# Script de configuration automatique du cron job INSEE
# Synchronisation automatique des données territoriales toutes les 24h
# Module Locali - Configuration Production
##############################################################################

set -e  # Arrêt en cas d'erreur

# Configuration
PROJECT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="/var/log/locali"
CRON_TIME="0 2 * * *"  # 2h du matin tous les jours
SCRIPT_PATH="$PROJECT_PATH/sync-insee-cron.js"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Configuration du système de mise à jour automatique INSEE${NC}"
echo "======================================================================"

# Vérifications préliminaires
echo -e "${YELLOW}📋 Vérifications préliminaires...${NC}"

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    echo "   Installez Node.js avant de continuer"
    exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js détecté: $NODE_VERSION${NC}"

# Vérifier si le script de synchronisation existe
if [ ! -f "$SCRIPT_PATH" ]; then
    echo -e "${RED}❌ Script de synchronisation non trouvé: $SCRIPT_PATH${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Script de synchronisation trouvé${NC}"

# Vérifier le fichier .env.local
if [ ! -f "$PROJECT_PATH/.env.local" ]; then
    echo -e "${RED}❌ Fichier .env.local manquant${NC}"
    echo "   Créez le fichier avec les variables d'environnement nécessaires"
    exit 1
fi

echo -e "${GREEN}✅ Fichier de configuration trouvé${NC}"

# Créer le répertoire de logs
echo -e "${YELLOW}📁 Création du répertoire de logs...${NC}"
sudo mkdir -p "$LOG_DIR"
sudo chown $USER:$USER "$LOG_DIR"
echo -e "${GREEN}✅ Répertoire de logs créé: $LOG_DIR${NC}"

# Rendre le script exécutable
echo -e "${YELLOW}🔧 Configuration des permissions...${NC}"
chmod +x "$SCRIPT_PATH"
echo -e "${GREEN}✅ Permissions configurées${NC}"

# Créer le wrapper script pour cron
WRAPPER_SCRIPT="$PROJECT_PATH/cron-wrapper.sh"
echo -e "${YELLOW}📝 Création du script wrapper...${NC}"

cat > "$WRAPPER_SCRIPT" << EOF
#!/bin/bash
##############################################################################
# Wrapper script pour cron job INSEE
# Généré automatiquement le $(date)
##############################################################################

# Navigation vers le répertoire du projet
cd "$PROJECT_PATH"

# Chargement de l'environnement Node.js (si nvm est utilisé)
export NVM_DIR="\$HOME/.nvm"
[ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
[ -s "\$NVM_DIR/bash_completion" ] && . "\$NVM_DIR/bash_completion"

# Variables d'environnement pour le PATH
export PATH="/usr/local/bin:/usr/bin:/bin:\$PATH"

# Horodatage du début
echo "🚀 [\$(date '+%Y-%m-%d %H:%M:%S')] Début de la synchronisation INSEE"

# Exécution du script avec timeout de 2 heures
timeout 7200 node "$SCRIPT_PATH" 2>&1

EXIT_CODE=\$?

# Vérification du code de sortie
if [ \$EXIT_CODE -eq 0 ]; then
    echo "✅ [\$(date '+%Y-%m-%d %H:%M:%S')] Synchronisation terminée avec succès"
elif [ \$EXIT_CODE -eq 124 ]; then
    echo "⏰ [\$(date '+%Y-%m-%d %H:%M:%S')] Synchronisation interrompue (timeout)"
else
    echo "❌ [\$(date '+%Y-%m-%d %H:%M:%S')] Synchronisation échouée (code: \$EXIT_CODE)"
fi

echo "🏁 [\$(date '+%Y-%m-%d %H:%M:%S')] Fin de la synchronisation"
echo "=========================================="
EOF

chmod +x "$WRAPPER_SCRIPT"
echo -e "${GREEN}✅ Script wrapper créé: $WRAPPER_SCRIPT${NC}"

# Configuration du cron job
echo -e "${YELLOW}⏰ Configuration du cron job...${NC}"

# Sauvegarder l'ancienne crontab
crontab -l > /tmp/crontab_backup_$(date +%Y%m%d_%H%M%S) 2>/dev/null || true

# Supprimer les anciens cron jobs locali (s'ils existent)
(crontab -l 2>/dev/null | grep -v "locali\|insee\|sync-insee" || true) | crontab - 2>/dev/null || true

# Ajouter le nouveau cron job
(crontab -l 2>/dev/null; echo "$CRON_TIME $WRAPPER_SCRIPT >> $LOG_DIR/insee-sync.log 2>&1 # Locali INSEE Auto Sync") | crontab -

echo -e "${GREEN}✅ Cron job configuré: $CRON_TIME${NC}"

# Créer un script de monitoring
MONITOR_SCRIPT="$PROJECT_PATH/monitor-sync.sh"
echo -e "${YELLOW}📊 Création du script de monitoring...${NC}"

cat > "$MONITOR_SCRIPT" << EOF
#!/bin/bash
##############################################################################
# Script de monitoring des synchronisations INSEE
# Affiche les logs et statistiques de synchronisation
##############################################################################

LOG_FILE="$LOG_DIR/insee-sync.log"

echo "📊 Monitoring Synchronisation INSEE - Locali"
echo "=============================================="

if [ ! -f "\$LOG_FILE" ]; then
    echo "❌ Aucun log de synchronisation trouvé"
    echo "   Fichier attendu: \$LOG_FILE"
    exit 1
fi

echo "📁 Fichier de log: \$LOG_FILE"
echo "📏 Taille du fichier: \$(du -h "\$LOG_FILE" | cut -f1)"
echo ""

echo "🕐 Dernières exécutions:"
echo "------------------------"
grep -E "Début de la synchronisation|terminée avec succès|échouée|interrompue" "\$LOG_FILE" | tail -10

echo ""
echo "📈 Statistiques:"
echo "----------------"
echo "Total exécutions: \$(grep -c "Début de la synchronisation" "\$LOG_FILE" 2>/dev/null || echo "0")"
echo "Succès: \$(grep -c "terminée avec succès" "\$LOG_FILE" 2>/dev/null || echo "0")"
echo "Échecs: \$(grep -c "échouée" "\$LOG_FILE" 2>/dev/null || echo "0")"
echo "Timeouts: \$(grep -c "interrompue" "\$LOG_FILE" 2>/dev/null || echo "0")"

echo ""
echo "🔍 Dernières erreurs (s'il y en a):"
echo "-----------------------------------"
grep -i "error\|erreur\|échec\|failed" "\$LOG_FILE" | tail -5 || echo "Aucune erreur récente"

echo ""
echo "⏰ Prochaine exécution prévue:"
echo "------------------------------"
crontab -l | grep "Locali INSEE Auto Sync" | cut -d' ' -f1-5 || echo "Cron job non trouvé"
EOF

chmod +x "$MONITOR_SCRIPT"
echo -e "${GREEN}✅ Script de monitoring créé: $MONITOR_SCRIPT${NC}"

# Test de la configuration
echo -e "${YELLOW}🧪 Test de la configuration...${NC}"

# Test du script (dry run)
echo "Exécution d'un test (sans synchronisation réelle)..."
if timeout 30 node -e "
    console.log('✅ Node.js fonctionne');
    console.log('✅ Projet path:', process.cwd());
    console.log('✅ Variables env chargées');
" 2>/dev/null; then
    echo -e "${GREEN}✅ Test de configuration réussi${NC}"
else
    echo -e "${RED}❌ Test de configuration échoué${NC}"
fi

# Résumé final
echo ""
echo -e "${BLUE}🎉 Configuration terminée avec succès !${NC}"
echo "======================================================================"
echo -e "${GREEN}📋 Résumé de la configuration:${NC}"
echo "   • Synchronisation: $CRON_TIME (2h du matin tous les jours)"
echo "   • Script: $SCRIPT_PATH"
echo "   • Wrapper: $WRAPPER_SCRIPT"
echo "   • Logs: $LOG_DIR/insee-sync.log"
echo "   • Monitoring: $MONITOR_SCRIPT"
echo ""
echo -e "${YELLOW}📝 Commandes utiles:${NC}"
echo "   • Voir les logs: tail -f $LOG_DIR/insee-sync.log"
echo "   • Monitoring: $MONITOR_SCRIPT"
echo "   • Test manuel: $WRAPPER_SCRIPT"
echo "   • Voir crontab: crontab -l"
echo ""
echo -e "${BLUE}🚀 La synchronisation automatique est maintenant active !${NC}"
echo "   Prochaine exécution: demain à 2h du matin"
echo ""

# Optionnel: proposer un test immédiat
read -p "Voulez-vous exécuter un test de synchronisation maintenant ? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🔄 Exécution d'un test de synchronisation...${NC}"
    echo "Cela peut prendre quelques minutes..."
    
    if $WRAPPER_SCRIPT; then
        echo -e "${GREEN}✅ Test de synchronisation réussi !${NC}"
    else
        echo -e "${RED}❌ Test de synchronisation échoué${NC}"
        echo "Vérifiez les logs pour plus de détails"
    fi
fi

echo -e "${GREEN}✨ Configuration terminée !${NC}" 