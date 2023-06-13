import BlogImage from "./blog-image";
export default function PopularNowTableRow({ popular }: { popular: any }) {
  return (
    <>
      <tr>
        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
          {/* Payment from{" "} */}
          <span className="font-semibold">{popular.name}</span>
        </td>
        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
          {popular.display_text}
        </td>

        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
          <div className="flex items-center justify-center">
            <button
              className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                popular.is_active
                  ? "bg-blue-500 hover:bg-blue-700 text-white"
                  : "bg-white text-black"
              }`}
            >
              On
            </button>
            <button
              className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                popular.is_active
                  ? "bg-white text-black"
                  : "bg-blue-500 hover:bg-blue-700 text-white"
              }`}
            >
              Off
            </button>
          </div>
        </td>
        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
          {" "}
          {popular.hyperlink}
        </td>
        <td className="p-4 mx-5 whitespace-nowrap text-sm font-semibold text-gray-900">
          <button className="hidden sm:inline-flex ml-5 text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
            Edit
          </button>
        </td>
      </tr>
    </>
  );
}
