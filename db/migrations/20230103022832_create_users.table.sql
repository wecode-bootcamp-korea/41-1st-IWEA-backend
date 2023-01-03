-- migrate:up
CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  name VARCHAR(50) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  address VARCHAR(50) NOT NULL,
  points DECIMAL(10, 3) NULL DEFAULT 1000000,
  PRIMARY KEY (id),
  CONSTRAINT users_ukey UNIQUE (email)
);

-- migrate:down
DROP TABLE users;