-- SELECT * FROM productoverview.products;

-- SELECT COUNT(*) as count_row FROM productoverview.products;

-- SELECT * FROM productoverview.products WHERE category='Shirt';


-- SCHEMA: productoverview

-- DROP SCHEMA IF EXISTS productoverview ;

--  DROP TABLE productoverview.styles;

-- SELECT pg_cancel_backend(pid) FROM pg_stat_activity WHERE state = 'active' and pid <> pg_backend_pid();

-- select pg_cancel_backend(3659);

CREATE SCHEMA IF NOT EXISTS productoverview
    AUTHORIZATION postgres;

COMMENT ON SCHEMA productoverview
    IS 'RPP33-SDC-lily';

CREATE TABLE IF NOT EXISTS productoverview.products (
	id SERIAL PRIMARY KEY,
	name varchar(255),
	slogan varchar(255),
	description varchar(8000),
	category varchar(255),
	default_price varchar(255)
);

CREATE TABLE IF NOT EXISTS productoverview.cart (
	id SERIAL PRIMARY KEY,
	user_session int,
	product_id int,
	active int
);

CREATE TABLE IF NOT EXISTS productoverview.features (
	id SERIAL PRIMARY KEY,
	product_id int,
	feature varchar(255),
	value varchar(255)
);

CREATE TABLE IF NOT EXISTS productoverview.photos (
	id SERIAL PRIMARY KEY,
	styleId int,
	url text,
	thumbnail_url text
);

CREATE TABLE IF NOT EXISTS productoverview.skus (
	id SERIAL PRIMARY KEY,
	styleId int,
	size varchar(50),
	quantity int
);


CREATE TABLE IF NOT EXISTS productoverview.styles (
	id SERIAL PRIMARY KEY,
	productId int,
	name varchar(50),
	sale_price varchar(50),
	original_price varchar(50),
	default_style int
);

-- ALTER TABLE productoverview.styles ALTER COLUMN sale_price NULL;
-- UPDATE productoverview.styles SET sale_price = NULL;


-- DROP TABLE productoverview.products

--  SELECT * FROM productoverview.products;

-- SELECT * FROM information_schema.tables WHERE table_schema = 'productoverview';

-- SELECT * FROM productoverview.products ORDER BY id LIMIT 10;

-- SELECT * FROM productoverview.cart;

-- SELECT * FROM productoverview.features ORDER BY id LIMIT 10;

-- SELECT * FROM productoverview.photos ORDER BY id LIMIT 10;

-- SELECT * FROM productoverview.skus ORDER BY id LIMIT 10;

-- SELECT * FROM productoverview.styles ORDER BY id LIMIT 10;


-- select row_to_json(t)
-- from (
--   select id, slogan,
--     (
--       select array_to_json(array_agg(row_to_json(d)))
--       from (
--         select feature, value
--         from productoverview.features
--         where product_id=11
--       ) d
--     ) as features
--   from productoverview.products
--   where id = 11
-- ) t

select row_to_json(t)
from (
  select productId as product_id,
    (
      select array_to_json(array_agg(row_to_json(d)))
      from (
        -- select id as style_id, name, default_style as default
				select id as style_id, name, original_price, default_style as default, (
					select array_to_json(array_agg(row_to_json(p)))
					from (
						select productoverview.photos.thumbnail_url, productoverview.photos.url
						from productoverview.photos, productoverview.styles
						where
						productoverview.photos.styleId = productoverview.styles.id
						and productoverview.styles.productId = 1

						-- 	select productoverview.photos.thumbnail_url, productoverview.photos.url
						-- from productoverview.photos where ()
					) p
				) as photos
        from productoverview.styles
        where productId = 1
      ) d
    ) as results
  from productoverview.styles
  where productId = 1
) t;

-- select * from productoverview.styles limit 3;

-- select * from pg_stat_activity where state = 'active';

-- select thumbnail_url, url
-- 	from productoverview.photos, productoverview.styles
	-- inner join productoverview.styles
	-- 	inner join (select * from productoverview.styles as styles where styles.productId = 8)
	-- on productoverview.photos.styleId = productoverview.styles.id;

	-- select productoverview.photos.thumbnail_url, productoverview.photos.url
	-- from productoverview.photos, productoverview.styles
	-- where
	-- 	productoverview.photos.styleId = productoverview.styles.id
	-- 	and productoverview.styles.productId = 8;