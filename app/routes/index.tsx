import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "db";

export async function loader({ request }: LoaderArgs) {
  const data = await db.products.findMany();
  return data;
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log({ data });
  return <div>Homepage</div>;
}
