const productSchema = new Schema({
		id: Number,
		name: String,
		slogan: String,
		description: String,
		category: String,
		default_price: String,
		feature: String,
		value: String
});

const styleSchema = new Schema({
	style_id: Number,
	name: String,
	original_price: String,
	sale_price: String,
	default?: Boolean,
	thumbnail: String,
	url: String
});

const skusSchema = new Schema({
	skus_id: Number,
	quantity: Number,
	size: String
});