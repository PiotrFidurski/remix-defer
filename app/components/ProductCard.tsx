import { products } from "@prisma/client";
import { useState } from "react";

type Props = {
  product: products;
};

export function ProductCard({ product }: Props) {
  const [color, setColor] = useState("red");
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 p-2">
      <img
        className="w-full"
        src={product.image?.thumbnail}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold mb-2 text-md text-gray-200">
          {product.name}
        </div>
      </div>

      <div className="px-6 pt-4 pb-2">
        <button
          onClick={() => setColor("blue")}
          style={{ color }}
          className="inline-block bg-green-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          {product.brand}
        </button>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {product.type}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {product.brand}
        </span>
      </div>
    </div>
  );
}
