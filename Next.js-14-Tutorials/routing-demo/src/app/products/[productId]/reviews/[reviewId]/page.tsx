"use client";
import { notFound } from "next/navigation";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

// Nested Dynamic Routes

// http://localhost:3000/products/1/reviews/1
export default function ProductDetail({
  params,
}: {
  params: { productId: string; reviewId: string };
}) {
  // Throw error 50% of the time
  // const random = getRandomInt(2);
  // if (random === 1) {
  //   throw new Error("Error loading review");
  // }

  if (parseInt(params.reviewId) > 1000) {
    notFound();
  }
  return (
    <h1>
      Review {params.reviewId} for product {params.productId}
    </h1>
  );
}
