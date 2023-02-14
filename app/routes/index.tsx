import { defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { ProductCard } from "~/components/ProductCard";
import { ProductCardSkeleton } from "~/components/ProductCardSekelton";
import { getKeyboards, getOtherProducts } from "~/queries.server";

function slow<T>(data: T, ms: number) {
  return new Promise<T>((resolve) =>
    setTimeout(() => {
      return resolve(data);
    }, ms)
  );
}

export async function loader() {
  const keyboards = await getKeyboards();

  const other = getOtherProducts().then((data) => slow(data, 2000));

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
          <Suspense fallback={<ProductCardSkeleton />}>
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
