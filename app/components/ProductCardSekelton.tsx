import { products } from "@prisma/client";

function SingleCard() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-black opacity-60 p-2 min-h-[400px]">
      <div className="px-6 py-4">
        <div className="font-bold mb-2 text-md text-gray-200"></div>
      </div>
      <div className="px-6 pt-4 pb-2"></div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <>
      <SingleCard />
      <SingleCard />
      <SingleCard />
      <SingleCard />
      <SingleCard />
      <SingleCard />
    </>
  );
}
