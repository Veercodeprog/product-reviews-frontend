'use client'
import PopularNowTableRow from "./popular-now-row";
import PopularNowSelection from "./popular-now-selection";
import { useState } from "react";
const PopularNowTable = ({ popularNow }: { popularNow: any }) => {
  const [showProducts, setShowProducts] = useState(true);

  // Filter the popularNow data based on the is_product property
  const filteredData = popularNow.filter(
    (p: any) => p.is_product === showProducts
  );
  return (
    <>
      <PopularNowSelection
        showProducts={showProducts}
        setShowProducts={setShowProducts}
      />
     <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
        <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900">
              Popular Now
            </h3>
            <a
              href="#"
              className="text-sm font-medium text-purple-600 hover:bg-gray-100 rounded-lg p-2"
            >
              view all
            </a>
          </div>
          <div className="flow-root">
            <div className="shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product name or Cateogory name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Popular Now Text
                    </th>
                    {/* <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                  </th> */}
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Active
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Link
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    ></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredData.map((p: any) => {
                    return (
                      <PopularNowTableRow key={p.popular_now_id} popular={p} />
                    );
                  })}
                </tbody>
                {/* <button className="hidden sm:inline-flex ml-5 text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
change the popular now text
</button> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PopularNowTable;
