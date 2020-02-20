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

CREATE TYPE transaction_status AS ENUM('PENDING', 'IN PROCESS', 'FAILED', 'COMPLETED');

CREATE TABLE transaction (
  id BIGSERIAL,
  ammount BIGINT NOT NULL,
  status transaction_status DEFAULT 'PENDING',
  money_account_user_id BIGINT NOT NULL,
  CONSTRAINT transaction_pk PRIMARY KEY (id),
  CONSTRAINT money_account_user_fk FOREIGN KEY (money_account_user_id)
    REFERENCES money_account_user(id)
);