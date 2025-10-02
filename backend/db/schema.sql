-- Admins table (for dashboard login)
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Packages table (hotspot internet packages)
CREATE TABLE packages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    duration_minutes INTEGER NOT NULL,
    speed_limit VARCHAR(50),
    router_id INTEGER
);

-- Routers table (MikroTik devices)
CREATE TABLE routers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    ip VARCHAR(100) NOT NULL,
    api_port INTEGER DEFAULT 8728,
    username VARCHAR(100) NOT NULL,
    password_encrypted VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table (end-users who use hotspot)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(20) UNIQUE NOT NULL,
    current_package_id INTEGER,
    status VARCHAR(20) DEFAULT 'inactive',
    session_expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table (MPesa logs)
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    package_id INTEGER,
    transaction_id VARCHAR(50),
    phone VARCHAR(20),
    amount INTEGER,
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Foreign Key Constraints
ALTER TABLE users
    ADD CONSTRAINT fk_current_package
    FOREIGN KEY (current_package_id)
    REFERENCES packages(id)
    ON DELETE SET NULL;

ALTER TABLE packages
    ADD CONSTRAINT fk_router
    FOREIGN KEY (router_id)
    REFERENCES routers(id)
    ON DELETE SET NULL;

ALTER TABLE payments
    ADD CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL;

ALTER TABLE payments
    ADD CONSTRAINT fk_package
    FOREIGN KEY (package_id)
    REFERENCES packages(id)
    ON DELETE SET NULL;