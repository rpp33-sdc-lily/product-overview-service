-- SELECT COUNT(*) as count_product_row FROM productoverview.products;

-- SELECT COUNT(*) as count_cart_row FROM productoverview.cart;

-- SELECT COUNT(*) as count_features_row FROM productoverview.features;

-- SELECT COUNT(*) as count_photos_row FROM productoverview.photos;

-- SELECT COUNT(*) as count_skus_row FROM productoverview.skus;

-- SELECT COUNT(*) as count_styles_row FROM productoverview.styles;

-- SELECT * FROM productoverview.photos limit 10;

-- SELECT * FROM productoverview.styles limit 10;


select
	json_build_object(
			'product_id', '1', 'results', json_agg(
				json_build_object(
					'style_id', s.id,
					'name', s.name,
					'original_price', s.original_price,
					'sale_price', s.sale_price,
					'default?', s.default_style,
					'photos', photos
				)
			)
	) styles
from productoverview.styles s
left join (
	select styleId,
				 json_agg(
					 	json_build_object(
							 'thumbnail_url', p.thumbnail_url,
							 'url', p.url
						 )
				 ) photos

from productoverview.photos p group by 1
) p on s.id = p.styleId where s.productId = 1