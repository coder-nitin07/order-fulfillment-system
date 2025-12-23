CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL CHECK (
    status IN (
      'CREATED',
      'PAYMENT_PENDING',
      'PAID',
      'CANCELLED',
      'SHIPPED',
      'DELIVERED'
    )
  ),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);