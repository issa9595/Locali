-- Script SQL pour créer la table communes_insee dans Supabase
-- À exécuter dans l'éditeur SQL de Supabase

-- Supprimer la table si elle existe déjà (optionnel)
-- DROP TABLE IF EXISTS communes_insee;

-- Créer la table communes_insee
CREATE TABLE communes_insee (
  -- Identifiant principal : code INSEE de la commune
  id TEXT PRIMARY KEY,
  
  -- Informations de base
  nom TEXT NOT NULL,
  code_insee TEXT NOT NULL UNIQUE,
  
  -- Données démographiques et géographiques
  population INTEGER,
  surface NUMERIC,
  
  -- Géométrie (GeoJSON)
  geometrie JSONB,
  
  -- Coordonnées du centre
  centre_lat NUMERIC,
  centre_lng NUMERIC,
  
  -- Timestamps
  derniere_mise_a_jour TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX idx_communes_insee_code ON communes_insee(code_insee);
CREATE INDEX idx_communes_insee_nom ON communes_insee(nom);
CREATE INDEX idx_communes_insee_population ON communes_insee(population);
CREATE INDEX idx_communes_insee_surface ON communes_insee(surface);

-- Index géospatial pour les requêtes géographiques
CREATE INDEX idx_communes_insee_centre ON communes_insee(centre_lat, centre_lng);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_communes_insee_updated_at
  BEFORE UPDATE ON communes_insee
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Activer Row Level Security (RLS) si nécessaire
-- ALTER TABLE communes_insee ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique (optionnel)
-- CREATE POLICY "Allow public read access" ON communes_insee
--   FOR SELECT TO public USING (true);

-- Politique pour permettre les modifications authentifiées (optionnel)
-- CREATE POLICY "Allow authenticated insert/update" ON communes_insee
--   FOR ALL TO authenticated USING (true);

-- Commentaires pour la documentation
COMMENT ON TABLE communes_insee IS 'Table des communes françaises synchronisée avec l''API Géo française';
COMMENT ON COLUMN communes_insee.id IS 'Code INSEE de la commune (identifiant unique)';
COMMENT ON COLUMN communes_insee.code_insee IS 'Code INSEE officiel de la commune';
COMMENT ON COLUMN communes_insee.population IS 'Population municipale de la commune';
COMMENT ON COLUMN communes_insee.surface IS 'Surface de la commune en hectares';
COMMENT ON COLUMN communes_insee.geometrie IS 'Géométrie de la commune au format GeoJSON';
COMMENT ON COLUMN communes_insee.centre_lat IS 'Latitude du centre de la commune';
COMMENT ON COLUMN communes_insee.centre_lng IS 'Longitude du centre de la commune';
COMMENT ON COLUMN communes_insee.derniere_mise_a_jour IS 'Date de dernière synchronisation avec l''API INSEE'; 