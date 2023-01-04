-- migrate:up
CREATE TABLE products (
	  id INT NOT NULL AUTO_INCREMENT,
    korean_name VARCHAR(50) NOT NULL,
    english_name VARCHAR(50) NOT NULL,
    thumbnail VARCHAR(2000) NOT NULL,
    short_description VARCHAR(100) NOT NULL,
    long_description TEXT NOT NULL,
    category_id INT NOT NULL,
    price DECIMAL(10, 3) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- migrate:down
DROP TABLE products;