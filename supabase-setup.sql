-- Supabase Database Setup for Document Expiry Project
-- Project ID: ysrjtiwfmxvwoxzmohpl
-- Project URL: https://ysrjtiwfmxvwoxzmohpl.supabase.co

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    issuer TEXT,
    expiry_date TIMESTAMP NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW() NOT NULL,
    file_name TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    file_path TEXT NOT NULL, -- Add file path column for Supabase storage URLs
    ocr_text TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_certificates_expiry_date ON certificates(expiry_date);
CREATE INDEX IF NOT EXISTS idx_certificates_uploaded_at ON certificates(uploaded_at);
CREATE INDEX IF NOT EXISTS idx_certificates_name ON certificates(name);
CREATE INDEX IF NOT EXISTS idx_certificates_issuer ON certificates(issuer);
CREATE INDEX IF NOT EXISTS idx_certificates_file_path ON certificates(file_path);

-- If table already exists, add the file_path column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'certificates' AND column_name = 'file_path'
    ) THEN
        ALTER TABLE certificates ADD COLUMN file_path TEXT NOT NULL DEFAULT '';
        RAISE NOTICE 'Added file_path column to existing certificates table';
    ELSE
        RAISE NOTICE 'file_path column already exists in certificates table';
    END IF;
END $$;

-- Insert sample data for testing (optional)
-- INSERT INTO certificates (name, issuer, expiry_date, file_name, file_size, file_path, ocr_text) 
-- VALUES (
--     'AWS Certified Solutions Architect - Associate',
--     'Amazon Web Services',
--     NOW() + INTERVAL '1 year',
--     'sample-certificate.pdf',
--     1024000,
--     'https://ysrjtiwfmxvwoxzmohpl.supabase.co/storage/v1/object/public/certificates/sample.pdf',
--     'Sample certificate text extracted via OCR'
-- );

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON TABLE certificates TO postgres;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO postgres;

-- Display table structure
\d certificates;
