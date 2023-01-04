-- migrate:up
CREATE TABLE payments(
	id INT NOT NULL AUTO_INCREMENT,
	order_id INT NOT NULL,
	total_price DECIMAL(10, 3) NOT NULL, 
	methods VARCHAR(50) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (order_id) REFERENCES orders (id)
);
-- migrate:down
DROP TABLE payments;
