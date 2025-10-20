const data = [
  {
    productName: "Classic Cotton T-Shirt",
    price: 799,
    description:
      "This classic cotton T-shirt is crafted with breathable fabric, making it ideal for daily wear. It offers a soft, smooth texture and maintains shape after multiple washes. Perfect for casual outings, gym, or layering during chilly weather.",
    category: "Men",
    subCategory: "Topwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Elegant Floral Kurti",
    price: 1199,
    description:
      "An elegant floral kurti made with soft rayon fabric, designed to keep you comfortable and stylish throughout the day. Ideal for festive wear, casual outings, or office attire, this kurti blends traditional charm with modern fashion.",
    category: "Woman",
    subCategory: "Topwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Denim Skinny Jeans",
    price: 1499,
    description:
      "These denim skinny jeans are designed for a snug fit, offering both style and comfort. The high-quality stretchable fabric ensures durability and ease of movement, making them perfect for casual wear, travel, or a stylish outing.",
    category: "Men",
    subCategory: "Bottomwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Kids Winter Hoodie",
    price: 999,
    description:
      "This kids winter hoodie is made with ultra-soft fleece to keep your child warm and cozy. It features a front pocket, ribbed cuffs, and a hood for extra protection against the cold. Ideal for school or playtime.",
    category: "Kid",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Premium Polo Shirt",
    price: 899,
    description:
      "A premium polo shirt crafted from high-quality cotton for maximum comfort. Its classic collar design and modern fit make it suitable for both casual and semi-formal occasions. A wardrobe essential for men who value style and ease.",
    category: "Men",
    subCategory: "Topwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Elegant Pleated Skirt",
    price: 1399,
    description:
      "This elegant pleated skirt is made with a soft, flowy fabric that moves beautifully with every step. Perfect for parties, office wear, or casual outings, it pairs well with tops and blouses, making it a versatile wardrobe piece.",
    category: "Woman",
    subCategory: "Bottomwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Boy’s Jogger Pants",
    price: 899,
    description:
      "These boy’s jogger pants are made from durable cotton blend fabric, offering excellent comfort and flexibility. The elastic waistband and cuffed hems ensure a secure fit, making them perfect for active play, sports, or everyday wear.",
    category: "Kid",
    subCategory: "Bottomwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Men’s Puffer Jacket",
    price: 2999,
    description:
      "This men’s puffer jacket provides superior insulation and warmth without compromising on style. The lightweight design, water-resistant fabric, and adjustable fit make it a perfect choice for winter adventures, daily commutes, or casual wear.",
    category: "Men",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Women’s Woolen Cardigan",
    price: 2499,
    description:
      "This women’s woolen cardigan is designed for warmth and elegance. Made from soft, high-quality wool, it drapes beautifully over any outfit. Perfect for layering during cold months, it offers a cozy yet stylish look for all occasions.",
    category: "Woman",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Kids Printed T-Shirt",
    price: 699,
    description:
      "This kids printed T-shirt is made with soft cotton fabric that ensures breathability and comfort all day. Featuring cute and playful prints, it’s perfect for everyday wear, school, or outings. Durable stitching ensures long-lasting quality.",
    category: "Kid",
    subCategory: "Topwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Striped Linen Shirt",
    price: 1299,
    description:
      "This striped linen shirt is designed for men who prefer breathable and lightweight clothing. Its natural linen fabric ensures a cool and crisp feel, ideal for summer. Pair it with chinos or jeans for a relaxed yet classy look.",
    category: "Men",
    subCategory: "Topwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "High-Rise Denim Skirt",
    price: 1599,
    description:
      "This high-rise denim skirt is a stylish choice for women who love versatile outfits. Made from durable stretch denim, it offers a flattering fit and a chic silhouette. Perfect for casual weekends or pairing with elegant tops.",
    category: "Woman",
    subCategory: "Bottomwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Kids Winter Coat",
    price: 1899,
    description:
      "Keep your little one warm with this cozy kids winter coat. Designed with a padded interior and a soft hood, it offers excellent protection against chilly winds. Its playful design ensures both comfort and cuteness during winter.",
    category: "Kid",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Casual Hoodie",
    price: 1799,
    description:
      "This casual hoodie for men is made from soft fleece fabric, making it perfect for layering during colder months. It features a relaxed fit, adjustable hood, and kangaroo pocket, offering both style and comfort for daily use.",
    category: "Men",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Women’s Leggings",
    price: 799,
    description:
      "These women’s leggings are crafted from soft, stretchable fabric that ensures all-day comfort and flexibility. Ideal for workouts, yoga, or casual wear, they offer a flattering fit and pair well with tunics, tops, or hoodies.",
    category: "Woman",
    subCategory: "Bottomwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Boys Graphic Sweatshirt",
    price: 999,
    description:
      "This boys graphic sweatshirt features a fun print and is made with warm fleece fabric. The ribbed cuffs and hem provide a snug fit, making it ideal for winter playtime, school, or casual outings during colder days.",
    category: "Kid",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Men’s Formal Shirt",
    price: 1599,
    description:
      "This men’s formal shirt is tailored from premium cotton fabric, offering a crisp and polished look. Ideal for office wear, meetings, or formal events, its breathable texture ensures comfort throughout the day, while maintaining a professional style.",
    category: "Men",
    subCategory: "Topwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Women’s Crop Top",
    price: 699,
    description:
      "This women’s crop top is made with a blend of cotton and spandex, offering a soft, stretchy fit. It’s perfect for summer outfits, casual hangouts, or layering with jackets. Its minimal design gives it a modern and trendy vibe.",
    category: "Woman",
    subCategory: "Topwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Boys Denim Shorts",
    price: 899,
    description:
      "These boys denim shorts are designed for comfort and durability. Made with high-quality fabric, they offer ease of movement for active kids. Perfect for playdates, summer outings, or everyday wear with a cool and casual vibe.",
    category: "Kid",
    subCategory: "Bottomwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Men’s Cargo Pants",
    price: 1799,
    description:
      "These men’s cargo pants are made with durable cotton twill fabric. Designed with multiple pockets and a relaxed fit, they’re ideal for travel, adventure, or casual wear. Their rugged design ensures both style and functionality in everyday use.",
    category: "Men",
    subCategory: "Bottomwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Women’s Wool Scarf",
    price: 599,
    description:
      "This women’s wool scarf is crafted from soft and cozy fabric that keeps you warm in winter. Its elegant design and versatile color make it easy to pair with coats or sweaters. A perfect winter essential for a chic look.",
    category: "Woman",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Kids Polo Shirt",
    price: 749,
    description:
      "This kids polo shirt is made with soft cotton fabric that feels gentle on the skin. Its classic collar and short sleeves make it perfect for casual wear, school uniforms, or playdates. Durable stitching ensures it lasts longer.",
    category: "Kid",
    subCategory: "Topwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Men’s Knit Sweater",
    price: 2499,
    description:
      "This men’s knit sweater offers both warmth and style. Made with premium wool-blend fabric, it’s lightweight yet cozy. Perfect for layering over shirts, it works for both casual and semi-formal occasions during winter months.",
    category: "Men",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Women’s Denim Jacket",
    price: 2799,
    description:
      "This women’s denim jacket combines classic style with modern tailoring. Made with soft yet durable denim, it’s ideal for layering over dresses or tops. Perfect for all seasons, adding a timeless and chic touch to any outfit.",
    category: "Woman",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Kids Cotton Shorts",
    price: 699,
    description:
      "These kids cotton shorts are made with breathable, soft fabric, ensuring maximum comfort during playtime. Their elastic waistband provides a snug fit, making them ideal for summer outings, park visits, or daily casual wear.",
    category: "Kid",
    subCategory: "Bottomwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Men’s V-Neck T-Shirt",
    price: 799,
    description:
      "This men’s V-neck T-shirt is crafted from 100% premium cotton for maximum comfort. Its breathable fabric and minimalist design make it perfect for everyday wear, gym sessions, or layering with jackets and shirts.",
    category: "Men",
    subCategory: "Topwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Women’s Palazzo Pants",
    price: 1299,
    description:
      "These women’s palazzo pants offer a comfortable, flowy fit with elegant drape. Made from soft fabric, they are perfect for casual wear, office attire, or festive occasions. Pair with crop tops or kurtis for a chic look.",
    category: "Woman",
    subCategory: "Bottomwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Boys Sweatpants",
    price: 899,
    description:
      "These boys sweatpants are made from warm fleece material, ensuring comfort and ease of movement. The elastic waistband provides a secure fit, making them perfect for sports, playtime, or lounging during winter.",
    category: "Kid",
    subCategory: "Bottomwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Men’s Flannel Shirt",
    price: 1799,
    description:
      "This men’s flannel shirt is made with brushed cotton fabric that provides extra warmth and softness. Its classic check design makes it a perfect casual winter outfit. Ideal for layering or wearing on its own.",
    category: "Men",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Women’s Knit Sweater",
    price: 2599,
    description:
      "This women’s knit sweater is crafted from soft wool-blend fabric that ensures warmth and comfort. Its modern fit and elegant texture make it perfect for layering or wearing alone during cold days.",
    category: "Woman",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Girls Floral Dress",
    price: 1099,
    description:
      "This girls floral dress is made from lightweight, breathable fabric, ensuring comfort and style. Its playful floral print and flared design make it perfect for parties, casual outings, or family gatherings.",
    category: "Kid",
    subCategory: "Topwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Men’s Track Pants",
    price: 1199,
    description:
      "These men’s track pants are designed for performance and comfort. Made from stretchable fabric, they offer a perfect fit for workouts, jogging, or casual wear. Breathable and soft, they’re ideal for daily use.",
    category: "Men",
    subCategory: "Bottomwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Women’s Cotton Kurti",
    price: 1399,
    description:
      "This women’s cotton kurti features intricate patterns and soft fabric. Its breathable material ensures comfort throughout the day, making it ideal for office, casual outings, or festive wear.",
    category: "Woman",
    subCategory: "Topwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Boys Winter Jacket",
    price: 1999,
    description:
      "This boys winter jacket offers warmth and style with its padded insulation and durable outer layer. Ideal for cold weather, it provides comfort and protection for outdoor adventures.",
    category: "Kid",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Men’s Denim Jacket",
    price: 2899,
    description:
      "This men’s denim jacket combines rugged style with everyday comfort. Made with high-quality denim, it’s perfect for layering in cool weather or creating a bold casual outfit.",
    category: "Men",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Women’s Tunic Top",
    price: 1199,
    description:
      "This women’s tunic top is crafted from soft cotton fabric, offering breathable comfort. Its flowy design and elegant detailing make it perfect for both office wear and casual outings.",
    category: "Woman",
    subCategory: "Topwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Kids Jogger Set",
    price: 1299,
    description:
      "This kids jogger set includes a comfortable sweatshirt and jogger pants, made from soft cotton fabric. Perfect for winter, school, or playtime, ensuring warmth and freedom of movement.",
    category: "Kid",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Men’s Linen Pants",
    price: 1699,
    description:
      "These men’s linen pants are lightweight, breathable, and ideal for warm climates. Their relaxed fit and classic design make them perfect for casual outings or semi-formal settings.",
    category: "Men",
    subCategory: "Bottomwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Women’s Slim Jeans",
    price: 1799,
    description:
      "These women’s slim jeans are made with stretchable denim, offering both style and comfort. Ideal for everyday wear, they pair perfectly with tops, tunics, and jackets for a chic look.",
    category: "Woman",
    subCategory: "Bottomwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Girls Denim Jacket",
    price: 1499,
    description:
      "This girls denim jacket is designed to add a cool touch to any outfit. Made with soft denim, it’s perfect for layering during cool weather, school days, or outings.",
    category: "Kid",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Men’s Sweatshirt",
    price: 1499,
    description:
      "This men’s sweatshirt is crafted from premium fleece fabric, ensuring warmth and a soft feel. Its modern fit and minimal design make it a versatile winter essential.",
    category: "Men",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Women’s Shrug",
    price: 1299,
    description:
      "This women’s shrug adds elegance to any outfit. Made with soft, lightweight fabric, it’s perfect for layering during cooler evenings, office wear, or casual outings.",
    category: "Woman",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Boys Trousers",
    price: 1099,
    description:
      "These boys trousers are made with a soft cotton blend, ensuring a comfortable fit. Ideal for school, casual wear, or formal occasions, they’re both stylish and practical.",
    category: "Kid",
    subCategory: "Bottomwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Men’s Henley T-Shirt",
    price: 999,
    description:
      "This men’s Henley T-shirt offers a stylish twist on the classic tee. Made with soft cotton fabric, it’s breathable, comfortable, and perfect for casual wear or layering.",
    category: "Men",
    subCategory: "Topwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Women’s Long Skirt",
    price: 1499,
    description:
      "This women’s long skirt flows beautifully with every step. Crafted from soft, lightweight fabric, it’s ideal for summer outings, festive occasions, or pairing with crop tops.",
    category: "Woman",
    subCategory: "Bottomwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Girls Wool Sweater",
    price: 1199,
    description:
      "This girls wool sweater provides warmth and comfort in cold weather. Its soft knit fabric and cute design make it perfect for winter school days or family outings.",
    category: "Kid",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Men’s Overshirt",
    price: 1899,
    description:
      "This men’s overshirt combines the style of a shirt with the warmth of a jacket. Perfect for layering, it’s made with thick cotton fabric for durability and comfort.",
    category: "Men",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Women’s Blouse Top",
    price: 1199,
    description:
      "This women’s blouse top is made with soft chiffon fabric, ensuring a flowy and elegant fit. Ideal for office wear, parties, or casual outings with a chic touch.",
    category: "Woman",
    subCategory: "Topwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Boys Hoodie",
    price: 1199,
    description:
      "This boys hoodie is crafted from warm fleece, making it perfect for chilly weather. Its comfortable fit and trendy design make it ideal for daily wear or outings.",
    category: "Kid",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Men’s Chino Pants",
    price: 1599,
    description:
      "These men’s chino pants offer a sleek look with a comfortable fit. Made with premium cotton twill, they’re perfect for office wear, casual outings, or semi-formal events.",
    category: "Men",
    subCategory: "Bottomwear",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    productName: "Women’s Wool Coat",
    price: 3299,
    description:
      "This women’s wool coat is designed to keep you warm while looking elegant. Made with soft wool blend, it’s perfect for winter parties, work, or casual outings.",
    category: "Woman",
    subCategory: "WinterWear",
    availableSizes: ["S", "M", "L", "XL"],
  },
];

export default data;
