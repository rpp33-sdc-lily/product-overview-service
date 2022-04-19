-- SELECT COUNT(*) as count_product_row FROM productoverview.products;

-- SELECT COUNT(*) as count_cart_row FROM productoverview.cart;

-- SELECT COUNT(*) as count_features_row FROM productoverview.features;

-- SELECT COUNT(*) as count_photos_row FROM productoverview.photos;

-- SELECT COUNT(*) as count_skus_row FROM productoverview.skus;

-- SELECT COUNT(*) as count_styles_row FROM productoverview.styles;

-- SELECT * FROM productoverview.photos limit 10;

-- SELECT * FROM productoverview.styles limit 10;


-- select
-- 	json_build_object(
-- 			'product_id', '1', 'results', json_agg(
-- 				json_build_object(
-- 					'style_id', s.id,
-- 					'name', s.name,
-- 					'original_price', s.original_price,
-- 					'sale_price', s.sale_price,
-- 					'default?', s.default_style,
-- 					'photos', photos,
-- 					'skus', skus
-- 				)
-- 			)
-- 	) styles
-- from productoverview.styles s
-- left join (
-- 	select styleId,
-- 				 json_agg(
-- 					 	json_build_object(
-- 							 'thumbnail_url', p.thumbnail_url,
-- 							 'url', p.url
-- 						 )
-- 				 ) photos
-- 				 from productoverview.photos p
-- 				 left join (
-- 					 SELECT
-- 					 	styleId,
-- 						 json_agg(
-- 							 json_build_object(
-- 								 'quantity', k.quantity,
-- 								 'size', k.size
-- 							 )
-- 						 ) skus
-- 						 from productoverview.skus k
-- 						 group by 1
-- 				 ) k on p.styleId = k.styleId
-- 				 group by styleId
-- ) p on p.styleId = k.styleId;


-- 				 json_agg(
-- 					 k.id,
-- 					 json_build_object(
-- 						 'quantity', k.quantity,
-- 						 'size', k.size
-- 					 )
-- 				 ) skus
-- 				 from productoverview.photos p, productoverview.skus
-- 				 group by 1
-- 				--  where p.id = k.id
-- ) p on s.id = p.styleId where s.productId = 1


-- from productoverview.photos p group by 1
-- inner join (
-- 	select k.id, json_agg(
-- 		json_build_object(
-- 			'quantity', k.quantity,
-- 			'size', k.size
-- 		)
-- 	) skus from productoverview.skus k
-- )

-- ) p on s.id = p.styleId where s.productId = 1




select json_build_object(
	'product', '1',
	'results', json_agg(
		json_build_object(
			'style_id', s.id,
			'name', s.name,
			'original_price', s.original_price,
			'sale_price', s.sale_price,
			'default?', s.default_style,
			'photos', (select (json_agg(
				json_build_object(
					'thumbnail_url', p.thumbnail_url,
					'url', p.url
				)
			)
			) as photos from productoverview.photos p where p.styleId = s.id

			),
			'skus', (select json_object_agg(
					k.id, json_build_object(
						'quantity', k.quantity,
						'size', k.size
					)
				) from productoverview.skus k where k.styleId = s.id
			)

			)
		)
	)
from productoverview.styles s where s.productId = 1

-- select count(quantity), size from productoverview.skus group by size;