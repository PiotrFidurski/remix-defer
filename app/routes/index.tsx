import { defer, LoaderArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { db } from "db";
import { Suspense } from "react";
import { ProductCard } from "~/components/ProductCard";
import { ProductCardSkeleton } from "~/components/ProductCardSekelton";
import { delay, getKeyboards, getOtherProducts } from "~/queries.server";

export async function loader({ request }: LoaderArgs) {
  const keyboards = await getKeyboards();

  const other = delay(3000).then(() => getOtherProducts().then((data) => data));

  return defer({
    keyboards,
    other,
  });
}

export default function Index() {
  const { keyboards, other } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="bg-gray-600 p-4">
        <div className="grid grid-cols-4 gap-4 max-w-6xl m-auto w-full">
          <Suspense fallback={<div>loading...</div>}>
            <Await resolve={keyboards}>
              {(products) =>
                products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="bg-gray-400 p-4">
        <div className="grid grid-cols-4 gap-4 max-w-6xl m-auto w-full">
          <Suspense fallback={<ProductCardSkeleton />}>
            <Await resolve={other} errorElement={<div>error</div>}>
              {(products) =>
                products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
}
