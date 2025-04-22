import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const relatedProducts = products
        .filter((item) => category === item.category)
        .filter((item) => subCategory === item.subCategory)
        .slice(0, 5);

      setRelated(relatedProducts);
    }
  }, [products, category, subCategory]);

  return (
    <div className="flex-1">
      <div className="text-center py-8 text-3xl">
        <Title text1={"RELATED"} text2={"COLLECTION"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
      {!related.length && (
        <p className="text-center text-gray-500">No related products found.</p>
      )}
    </div>
  );
};

export default RelatedProducts;
