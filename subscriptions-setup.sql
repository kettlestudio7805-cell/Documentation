-- Supabase Database Setup for Subscriptions Table
-- Project ID: ysrjtiwfmxvwoxzmohpl
-- Project URL: https://ysrjtiwfmxvwoxzmohpl.supabase.co

-- Create subscriptions table with amount field
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    email TEXT NOT NULL,
    card_title TEXT NOT NULL,
    end_date TIMESTAMP NOT NULL,
    amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Add amount field to existing table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'subscriptions' AND column_name = 'amount'
    ) THEN
        ALTER TABLE subscriptions ADD COLUMN amount DECIMAL(10,2) NOT NULL DEFAULT 0.00;
    END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_end_date ON subscriptions(end_date);
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_amount ON subscriptions(amount);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON subscriptions TO authenticated;
GRANT ALL ON subscriptions TO service_role;

-- Insert sample data (optional)
INSERT INTO subscriptions (title, email, card_title, end_date, amount) VALUES
    ('Netflix Premium', 'user@example.com', 'Visa ****1234', NOW() + INTERVAL '6 months', 1499.00),
    ('Spotify Family', 'user@example.com', 'Mastercard ****5678', NOW() + INTERVAL '1 year', 1199.00),
    ('Adobe Creative Cloud', 'user@example.com', 'Amex ****9012', NOW() - INTERVAL '1 month', 3999.00)
ON CONFLICT DO NOTHING;

-- Display table structure
\d subscriptions;
