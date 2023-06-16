import "server-only";
import { getAllReviews } from "@/app/utils/postDataApi";
import ReviewsTableAdmin from "@/app/components/admin/reviews/reviews-table";
export default async function ReviewsAdmin() {
  const reviewsData = getAllReviews();
  const reviews = await reviewsData;

  return (
    <>
      <main>
        <div className="pt-6 px-4">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {" "}
                    Reviews
                  </h3>
                  <span className="text-base font-normal text-gray-500">
                    {" "}
                    list of reviews
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href="#"
                    className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
                  >
                    View all
                  </a>
                </div>
              </div>
              <div className="flex flex-col mt-8">
                <div className="overflow-x-auto rounded-lg">
                  <div className="align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden sm:rounded-lg">
                      {reviews && (
                        <ReviewsTableAdmin reviewsTableData={reviews} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
