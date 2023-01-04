-- migrate:up
CREATE TABLE order_product (
	id INT NOT NULL AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  order_status_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (order_id) REFERENCES orders (id),
	FOREIGN KEY (product_id) REFERENCES products (id),
	FOREIGN KEY (order_status_id) REFERENCES order_status (id)
);

-- migrate:down
DROP TABLE order_product;
