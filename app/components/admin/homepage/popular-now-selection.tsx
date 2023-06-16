import Link from "next/link";
export default function PopularNowSelection({
  showProducts,
  setShowProducts,
}: {
  showProducts: boolean;
  setShowProducts: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleCategoryClick = () => {
    setShowProducts(false);
  };

  const handleProductClick = () => {
    setShowProducts(true);
  };
  return (
    <>
      <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:ring-purple-200 rounded-lg p-4 sm:p-6 xl:p-8 cursor-pointer">
        <div
          className={` shadow rounded-lg p-4 sm:p-6 xl:p-8 ${
            showProducts ? "bg-purple-800 hover:bg-purple-900" : "bg-white"
          }

`}
          onClick={handleProductClick}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                Products or Apps
              </span>
              <h3 className="text-base font-normal text-gray-500">
                Popular now
              </h3>
            </div>
          </div>
        </div>
        <div
          className={` shadow rounded-lg p-4 sm:p-6 xl:p-8 ${
            showProducts ? "bg-white" : "bg-purple-800 hover:bg-purple-900"
          }
`}
          onClick={handleCategoryClick}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                Categories
              </span>
              <h3 className="text-base font-normal text-gray-500">
                Popular now
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
