import { faImage, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function PersonalDetailsForm({ onNext, onPrevious }: { onNext: (e: React.MouseEvent<HTMLButtonElement>) => void, onPrevious: (e: React.MouseEvent<HTMLButtonElement>) => void }  ) {
  // ...

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onNext(e);
  };

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onPrevious(e);
  };
return(
<>

          <div className="flex flex-row	 mb-4">
            <label htmlFor="fname" className=" w-1/5 md:w-1/6  mb-2 font-bold">
              Product Name :
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="Product Name"
              className=" block w-1/3 items-start  px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-row mb-4">
            <label htmlFor="lname" className=" w-1/5 md:w-1/6   mb-2 font-bold">
              Short Description :
            </label>
            <input
              type="text"
              name="lname"
              id="lname"
              placeholder=" Short Description"
              className=" block w-1/3  px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-row mb-4">
            <label htmlFor="product-img" className=" w-1/5 md:w-1/6 font-bold">
              <FontAwesomeIcon icon={faImage} /> Product Image:
            </label>
            <label
              htmlFor="product-img"
              className="w-1/3 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
            >
              <FontAwesomeIcon icon={faCloudUploadAlt} className="	mr-2" />
              Upload Image
            </label>
            <input
              type="file"
              id="product-img"
              name="product-img"
              className="w-1/3 px-4 py-2 border border-gray-300 rounded-md hidden"
            />
          </div>

          <div className="flex flex-row items-center mb-4">
            <label
              htmlFor="product-img"
              className=" w-1/5 md:w-1/6mr-4 font-bold"
            >
              <FontAwesomeIcon icon={faImage} /> Product Image:
            </label>

            <div className="relative w-40 h-40 bg-black rounded-md">
              <label
                htmlFor="product-img"
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-75 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faCloudUploadAlt}
                  className=" text-gray-300 mr-2"
                />
                Upload Image
              </label>
              <input
                type="file"
                id="product-img"
                name="product-img"
                className="hidden"
              />
            </div>
          </div>

          <div className="flex flex-row	 mb-4">
            <label htmlFor="fname" className="  w-1/5 md:w-1/6  mb-2 font-bold">
              Website Url :
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder=" Website Url"
              className=" block w-1/3  px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-row	 mb-4">
            <label htmlFor="fname" className="  w-1/5 md:w-1/6  mb-2 font-bold">
              Overview :
            </label>
            <textarea
              
              name="fname"
              id="fname"
              placeholder="Overview"
              className=" block w-1/3 h-32  px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-row	 mb-4">
            <label htmlFor="fname" className="  w-1/5 md:w-1/6  mb-2 font-bold">
              Features :
            </label>
            <textarea
            
              name="fname"
              id="fname"
              placeholder="Features"
              className=" block w-1/3 h-32  px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-row items-center mb-4">
            <label
              htmlFor="product-img"
              className=" w-1/5 md:w-1/6 mr-4 font-bold"
            >
              <FontAwesomeIcon icon={faImage} /> Screenshots:
            </label>
            <div className="  flex sm:flex-row">
              <div className="relative w-40 h-40 bg-black rounded-md mr-6">
                <label
                  htmlFor="product-img"
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-75 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faCloudUploadAlt}
                    className=" text-gray-300 mr-2"
                  />
                  Upload Image
                </label>
                <input
                  type="file"
                  id="product-img"
                  name="product-img"
                  className="hidden"
                />
              </div>
              <div className="relative w-40 h-40 bg-black rounded-md mr-6">
                <label
                  htmlFor="product-img"
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-75 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faCloudUploadAlt}
                    className=" text-gray-300 mr-2"
                  />
                  Upload Image
                </label>
                <input
                  type="file"
                  id="product-img"
                  name="product-img"
                  className="hidden"
                />
              </div>
              <div className="relative w-40 h-40 bg-black rounded-md mr-6">
                <label
                  htmlFor="product-img"
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-75 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faCloudUploadAlt}
                    className=" text-gray-300 mr-2"
                  />
                  Upload Image
                </label>
                <input
                  type="file"
                  id="product-img"
                  name="product-img"
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row	 mb-4">
            <label htmlFor="fname" className="w-1/5 md:w-1/6 mb-2 font-bold">
              Video Url :
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="Add url"
              className=" block w-1/3   px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-row mb-4">
            <label htmlFor="fname" className="w-1/5 md:w-1/6 mb-2 font-bold">
              Category :
            </label>
            <select
              name="fname"
              id="fname"
              className="block w-1/3 px-4 py-2 border border-gray-300 rounded-md"
              onChange={(e) => console.log(e.target.value)}
            >
              <option value="">--Select URL--</option>
              <option value="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                Video 1
              </option>
              <option value="https://www.youtube.com/watch?v=KwY28rpyKDE">
                Video 2
              </option>
              <option value="https://www.youtube.com/watch?v=oyEuk8j8imI">
                Video 3
              </option>
            </select>
          </div>

          <div className="flex flex-row	 mb-4">
            <label htmlFor="fname" className="w-1/5 md:w-1/6 mb-2 font-bold">
              Tags :
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="tags"
              className=" block w-1/3   px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex  flex-row sm:justify-end mt-10 mb-10">
            <button
              type="button"
              className="previous w-34 sm:w-32 bg-gray-500 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mb-4 sm:mb-0 mr-8"
            >
              Save as Draft
            </button>
            <button
              type="button"
              className="next w-24  sm:w-32 bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mb-4 sm:mb-0 mr-8"
              onClick={handleNext}
            >
              Continue
            </button>
          </div>
</>
)
}

export default PersonalDetailsForm