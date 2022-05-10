-- COPY productoverview.products
-- FROM '/Users/tanha/RPP33/SDC/csv data/product.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY productoverview.cart
-- FROM '/Users/tanha/RPP33/SDC/csv data/cart.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY productoverview.features
-- FROM '/Users/tanha/RPP33/SDC/csv data/features.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY productoverview.photos
-- FROM '/Users/tanha/RPP33/SDC/csv data/photos.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY productoverview.skus
-- FROM '/Users/tanha/RPP33/SDC/csv data/skus.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY productoverview.styles
-- FROM '/Users/tanha/RPP33/SDC/csv data/styles.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY productoverview.related
-- FROM '/Users/tanha/RPP33/SDC/csv data/related.csv'
-- DELIMITER ','
-- CSV HEADER;


-- ******** Deployment queries: *******

COPY productoverview.products
FROM '/home/ubuntu/csvdata/product.csv'
DELIMITER ','
CSV HEADER;

COPY productoverview.cart
FROM '/home/ubuntu/csvdata/cart.csv'
DELIMITER ','
CSV HEADER;

COPY productoverview.features
FROM '/home/ubuntu/csvdata/features.csv'
DELIMITER ','
CSV HEADER;

COPY productoverview.photos
FROM '/home/ubuntu/csvdata/photos.csv'
DELIMITER ','
CSV HEADER;

COPY productoverview.skus
FROM '/home/ubuntu/csvdata/skus.csv'
DELIMITER ','
CSV HEADER;

COPY productoverview.styles
FROM '/home/ubuntu/csvdata/styles.csv'
DELIMITER ','
CSV HEADER;

COPY productoverview.related
FROM '/home/ubuntu/csvdata/related.csv'
DELIMITER ','
CSV HEADER;