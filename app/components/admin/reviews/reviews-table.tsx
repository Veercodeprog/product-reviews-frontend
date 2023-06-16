"use client";
import { useState } from "react";
import ReviewsTableRowAdmin from "./reviews-table-row";
export default function ReviewsTableAdmin({
  reviewsTableData,
}: {
  reviewsTableData: any;
}) {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [reviewsData, setReviewsData] = useState(reviewsTableData);

  // Create an array of unique product names
  const productNames = Array.from(
    new Set(reviewsTableData.map((review: any) => review.product?.name))
  );

  // Filter the reviews based on the selected product
  const filteredReviews = selectedProduct
    ? reviewsData.filter((review: any) => review.product?.product_id === selectedProduct)
    : reviewsData;

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(event.target.value);
  };
  const handleReviewDelete = (reviewId: number) => {
    const updatedReviews = reviewsData.filter(
      (review: any) => review.review_id !== reviewId
    );
    setReviewsData(updatedReviews);
  };
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Reviews</h3>
          <span className="text-base font-normal text-gray-500">
            List of reviews
          </span>
        </div>
        <div>
          <label
            htmlFor="product"
            className="mr-2 text-sm font-medium text-gray-500"
          >
            Select Product:
          </label>
          <select
            id="product"
            name="product"
            value={selectedProduct}
            onChange={handleProductChange}
            className="border-gray-300 rounded-md p-1 text-sm"
          >
            <option value="">All Products</option>
            {/* Render product options based on unique product names */}
            {productNames.map((productName: any) => (
              <option key={productName} value={productName}>
                {productName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        {/* table head */}
      </table>

      {filteredReviews.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          {/* table body */}
          {filteredReviews.map((review: any) => (
            <ReviewsTableRowAdmin
              key={review.review_id}
              reviews={review}
              handleReviewDelete={handleReviewDelete}
            />
          ))}
        </table>
      ) : (
        <p>No reviews found for the selected product.</p>
      )}
    </>
  );
}
