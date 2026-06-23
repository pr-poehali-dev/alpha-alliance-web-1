CREATE TABLE product_groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE product_categories (
  id SERIAL PRIMARY KEY,
  group_id INTEGER NOT NULL REFERENCES product_groups(id),
  name VARCHAR(255) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  group_id INTEGER NOT NULL REFERENCES product_groups(id),
  category_id INTEGER REFERENCES product_categories(id),
  title VARCHAR(500) NOT NULL,
  specs JSONB DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
