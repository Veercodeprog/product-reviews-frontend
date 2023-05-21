import { faImage, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function PersonalDetailsForm({ onNext, onPrevious }: { onNext: any, onPrevious: (e: React.MouseEvent<HTMLButtonElement>) => void  }  ) {
  // ...
const [productName, setProductName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [productIcon, setProductIcon] = useState<string>('');
  const [webUrl, setWebUrl] = useState('');
const [overview, setOverview] = useState('');
  const [features, setFeatures] = useState('');
const [screenshots, setScreenshots] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState('');
const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');


// const [productName, setProductName] = useState('');
//   const [shortDescription, setShortDescription] = useState('');
const handleProductIconImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]; // Get the first selected file

  if (file) {
    // Perform any necessary operations on the file (e.g., extracting file name, URL, etc.)
    const fileURL = URL.createObjectURL(file);

    setProductIcon(fileURL);
  }
};

const handleScreenshotImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]; // Get the first selected file

  if (file) {
    // Perform any necessary operations on the file (e.g., extracting file name, URL, etc.)
    const fileURL = URL.createObjectURL(file);

    // Create a copy of the screenshots array
    const updatedScreenshots = [...screenshots];

    // Update the specific screenshot image at the given index
    updatedScreenshots[index] = fileURL;

    // Set the updated screenshots array in the state
    setScreenshots(updatedScreenshots);
  }
};



  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

 const personalFormData = {
    productName,
    shortDescription,
      productIcon: productIcon ? productIcon.toString() : '' // Convert to string if necessary
,
    webUrl,
    overview,
    features,
    screenshots,
    videoUrl,
    category,
    tags,
  };
// setPersonalFormData(personalFormData);
    // handlePersonalDetailsNext(personalData);
 onNext( e,personalFormData);
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
              name="productname"
              id="productname"
              placeholder="Product Name"
              className=" block w-1/3 items-start  px-4 py-2 border border-gray-300 rounded-md"
 value={productName}
          onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="flex flex-row mb-4">
            <label htmlFor="lname" className=" w-1/5 md:w-1/6   mb-2 font-bold">
              Short Description :
            </label>
            <input
              type="text"
              name="shortdesc"
              id="shortdesc"
              placeholder=" Short Description"
              className=" block w-1/3  px-4 py-2 border border-gray-300 rounded-md"
 value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-row mb-4">
            <label htmlFor="product-img" className=" w-1/5 md:w-1/6 font-bold">
              <FontAwesomeIcon icon={faImage} /> Product Icon:
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
onChange={handleProductIconImageChange}
            />
          </div>

          <div className="flex flex-row items-center mb-4">
            <label
              htmlFor="product-img"
              className=" w-1/5 md:w-1/6mr-4 font-bold"
            >
              <FontAwesomeIcon icon={faImage} /> Product Icon:
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
            <label htmlFor="url" className="  w-1/5 md:w-1/6  mb-2 font-bold">
              Website Url :
            </label>
            <input
              type="text"
              name="url"
              id="url"
              placeholder=" Website Url"
              className=" block w-1/3  px-4 py-2 border border-gray-300 rounded-md"
 value={webUrl}
          onChange={(e) => setWebUrl(e.target.value)}
            />
          </div>
          <div className="flex flex-row	 mb-4">
            <label htmlFor="overview" className="  w-1/5 md:w-1/6  mb-2 font-bold">
              Overview :
            </label>
            <textarea
              
              name="overview"
              id="overview"
              placeholder="Overview"
              className=" block w-1/3 h-32  px-4 py-2 border border-gray-300 rounded-md"
 value={overview}
          onChange={(e) => setOverview(e.target.value)}
            />
          </div>
          <div className="flex flex-row	 mb-4">
            <label htmlFor="features" className="  w-1/5 md:w-1/6  mb-2 font-bold">
              Features :
            </label>
            <textarea
            
              name="features"
              id="features"
              placeholder="Features"
              className=" block w-1/3 h-32  px-4 py-2 border border-gray-300 rounded-md"
 value={features}
          onChange={(e) => setFeatures(e.target.value)}
            />
          </div>

          <div className="flex flex-row items-center mb-4">
            <label
              htmlFor="product-imgs"
              className=" w-1/5 md:w-1/6 mr-4 font-bold"
            >
              <FontAwesomeIcon icon={faImage} /> Screenshots:
            </label>
            <div className="  flex sm:flex-row">
              <div className="relative w-40 h-40 bg-black rounded-md mr-6">
                <label
                  htmlFor="product-img1"
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
                  id="product-img1"
                  name="product-img1"
                  className="hidden"
  onChange={(e) => handleScreenshotImageChange(0, e)} // Pass the index 0 for the first screenshot

                />
              </div>
              <div className="relative w-40 h-40 bg-black rounded-md mr-6">
                <label
                  htmlFor="product-img2"
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
                  id="product-img2"
                  name="product-img2"
                  className="hidden"
  onChange={(e) => handleScreenshotImageChange(1, e)} // Pass the index 0 for the first screenshot

                />
              </div>
              <div className="relative w-40 h-40 bg-black rounded-md mr-6">
                <label
                  htmlFor="product-img3"
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
                  id="product-img3"
                  name="product-img3"
                  className="hidden"
  onChange={(e) => handleScreenshotImageChange(2, e)} // Pass the index 0 for the first screenshot

                />
              </div>
            </div>
          </div>
          <div className="flex flex-row	 mb-4">
            <label htmlFor="vid-url" className="w-1/5 md:w-1/6 mb-2 font-bold">
              Video Url :
            </label>
            <input
              type="text"
              name="vid-url"
              id="vid-url"
              placeholder="Add url"
              className=" block w-1/3   px-4 py-2 border border-gray-300 rounded-md"
 value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
          <div className="flex flex-row mb-4">
            <label htmlFor="category" className="w-1/5 md:w-1/6 mb-2 font-bold">
              Category :
            </label>
            <select
              name="category"
              id="category"
              className="block w-1/3 px-4 py-2 border border-gray-300 rounded-md"
 value={category}
          onChange={(e) => setCategory(e.target.value)}
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
            <label htmlFor="tags" className="w-1/5 md:w-1/6 mb-2 font-bold">
              Tags :
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="tags"
              className=" block w-1/3   px-4 py-2 border border-gray-300 rounded-md"
 value={tags}
          onChange={(e) => setTags(e.target.value)}
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