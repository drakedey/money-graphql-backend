CREATE TABLE money_user (
  id BIGSERIAL,
  name VARCHAR(44) NOT NULL,
  last_name VARCHAR(44) NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  CONSTRAINT user_pk PRIMARY KEY (id),
  CONSTRAINT email_user_unique UNIQUE (email)
);

CREATE TYPE currency_type AS ENUM('USD', 'COP', 'VEF');

CREATE TABLE money_account (
  id BIGSERIAL,
  amount BIGINT DEFAULT 0,
  currency currency_type DEFAULT 'USD',
  CONSTRAINT money_account_pk PRIMARY KEY(id)
);

CREATE TABLE money_account_user (
  id BIGSERIAL,
  money_account_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  CONSTRAINT money_account_user_pk PRIMARY KEY (id),
  CONSTRAINT money_account_fk FOREIGN KEY (money_account_id)
    REFERENCES money_account (id),
  CONSTRAINT user_fk FOREIGN KEY (user_id)
    REFERENCES money_user (id),
  CONSTRAINT user_account_unique UNIQUE (money_account_id, user_id)
);

CREATE TYPE transaction_type AS ENUM('ADD', 'SUBSTRACT');

CREATE TABLE transaction (
  id BIGSERIAL,
  ammount BIGINT NOT NULL,
  type transaction_type DEFAULT 'ADD',
  money_account_user_id BIGINT NOT NULL,
  created_date DATE DEFAULT NOW(),
  CONSTRAINT transaction_pk PRIMARY KEY (id),
  CONSTRAINT money_account_user_fk FOREIGN KEY (money_account_user_id)
    REFERENCES money_account_user(id)
);

CREATE TYPE account_user_type AS ENUM('OWNER', 'VIEWER', 'CONTRIBUTOR');

ALTER TABLE money_account_user ADD COLUMN user_rol account_user_type DEFAULT 'OWNER';

CREATE TABLE role (
  id VARCHAR NOT NULL,
  name VARCHAR(40) NOT NULL,
  CONSTRAINT role_pk PRIMARY KEY (id)
);

CREATE TYPE permission_type AS ENUM ('VIEW', 'EXECUTE');

CREATE TABLE permission (
  id VARCHAR NOT NULL,
  type permission_type DEFAULT 'VIEW',
  description VARCHAR(200),
  CONSTRAINT permission_pk PRIMARY KEY(id)
);

CREATE TABLE permission_role (
  role_id VARCHAR NOT NULL,
  permission_id VARCHAR NOT NULL,
  CONSTRAINT role_fk FOREIGN KEY (role_id)
    REFERENCES role (id),
  CONSTRAINT permission_fk FOREIGN KEY (permission_id)
    REFERENCES permission (id),
  CONSTRAINT permission_role_unique UNIQUE (role_id, permission_id)
)
