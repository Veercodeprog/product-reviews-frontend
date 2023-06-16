'use client'
 import { deleteReviewById } from "@/app/utils/postDataApi";   
export default function ReviewsTableRowAdmin({ reviews,handleReviewDelete }: { reviews: any ,handleReviewDelete:any  }) {
  const handleDelete = async () => {

console.log("reviews", reviews);
    try {
       const response = await deleteReviewById(reviews.review_id);
     handleReviewDelete(reviews.review_id);
   }
    catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <tbody className="bg-white">
        <tr>
          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
            <span className="font-semibold">{reviews.review_id}</span>
          </td>
          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
            <p className="whitespace-pre-line">{reviews.comment}</p>
          </td>
          <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
            <button
              className="sm:inline-flex ml-5 text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center "
              // onClick={handleDelete}
            >

              Approve
            </button>
          </td>
          <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
            <button
              className="sm:inline-flex ml-5 text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center "
               onClick={handleDelete}
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
}
