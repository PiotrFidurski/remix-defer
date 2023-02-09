import { db } from "db";

export function getKeyboards() {
  return db.products.findMany({
    where: {
      type: { equals: "keyboards" },
    },
  });
}

export function getOtherProducts() {
  return db.products.findMany({
    where: {
      type: {
        not: {
          equals: "keyboards",
        },
      },
    },
  });
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
