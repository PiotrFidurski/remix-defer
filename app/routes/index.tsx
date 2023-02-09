import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "db";
import { ProductCard } from "~/components/ProductCard";

export async function loader({ request }: LoaderArgs) {
  const data = await db.products.findMany();

  const keyboards = data.filter((product) => product.type === "keyboards");
  const other = data.filter((product) => product.type !== "keyboards");
  return {
    keyboards,
    other,
  };
}

export default function Index() {
  const products = useLoaderData<typeof loader>();

  return (
    <>
      <div className="bg-gray-400 p-4">
        <div className="grid grid-cols-4 gap-4 max-w-6xl m-auto w-full">
          {products?.keyboards?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="bg-gray-600 p-4">
        <div className="grid grid-cols-4 gap-4 max-w-6xl m-auto w-full">
          {products?.other?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
