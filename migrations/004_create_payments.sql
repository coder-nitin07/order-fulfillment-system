CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL,
  auth_user_id UUID NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL CHECK (
    status IN ('INITIATED', 'SUCCESS', 'FAILED', 'REFUNDED')
  ),
  created_at TIMESTAMP DEFAULT NOW()
);