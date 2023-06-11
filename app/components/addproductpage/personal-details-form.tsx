import { faImage, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, use } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllCategoriesName } from "@/app/utils/dataApi";
import axios from "axios";
function PersonalDetailsForm({
  onNext,
  onPrevious,
}: {
  onNext: any;
  onPrevious: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  // ...
  const [productName, setProductName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [productIcon, setProductIcon] = useState<string>("");
  const [webUrl, setWebUrl] = useState("");
  const [overview, setOverview] = useState("");
  const [features, setFeatures] = useState("");
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState<{ id: string; name: string } | null>(
    null
  );

  const [categories, setCategories] = useState<any[]>([]); // Use proper type for categories state
const [screenshotFiles, setScreenshotFiles] = useState<File[]>([]);
const [productIconFile, setProductIconFile] = useState<File | null>(null);
const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getAllCategoriesName();
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

//   const uploadImage =(files)=>{
// const formData = new FormData();
// formData.append("file", files[0]);
// formData.append("upload_preset", "product_rev");
// axios.post("https://api.cloudinary.com/v1_1/dnd0u1l0f/image/upload", formData).then((res)=>{
// }
  const handleProductIconImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]; // Get the first selected file

    if (file) {
      // Perform any necessary operations on the file (e.g., extracting file name, URL, etc.)
      const fileURL = URL.createObjectURL(file);
      setProductIcon(fileURL);

    setProductIconFile(file);

// console.log("fileURL:", fileURL);
 
    }
  };

  const handleScreenshotImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]; // Get the first selected file

    if (file) {
      // Perform any necessary operations on the file (e.g., extracting file name, URL, etc.)
      const fileURL = URL.createObjectURL(file);

      // Create a copy of the screenshots array
      const updatedScreenshots = [...screenshots];
   const updatedScreenshotsFiles = [...screenshotFiles];

      updatedScreenshots[index] = fileURL; // Set the updated screenshots array in the state
    updatedScreenshotsFiles[index] = file; // Set the updated screenshot files array in the state

      setScreenshots(updatedScreenshots);
    setScreenshotFiles(updatedScreenshotsFiles);

    }
  };

const validateForm = () => {
  const errors: any = {};

  // Validate productName field
  if (!productName) {
    errors.productName = "Product Name is required";
  }

  // Validate shortDescription field
  if (!shortDescription) {
    errors.shortDescription = "Short Description is required";
  }

  // Validate productIcon field
  if (!productIcon) {
    errors.productIcon = "Product Icon is required";
  }

  // Validate webUrl field
  if (!webUrl) {
    errors.webUrl = "Website URL is required";
  }

  // Validate overview field
  if (!overview) {
    errors.overview = "Overview is required";
  }

  // Validate features field
  if (!features) {
    errors.features = "Features is required";
  }

  // Validate screenshots fields
  if (screenshots.length === 0) {
    errors.screenshots = "At least one screenshot is required";
  }

  // Validate videoUrl field
  if (!videoUrl) {
    errors.videoUrl = "Video URL is required";
  }

  // Validate category field
  if (!category) {
    errors.category = "Category is required";
  }

  // Validate tags field
  if (!tags) {
    errors.tags = "Tags is required";
  }

  return errors;
};


  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
// console.log("screenshotFiles:", screenshotFiles);
// console.log("screrenshots :", screenshots);
 const errors = validateForm();

  // Set the form errors
  setFormErrors(errors);

  // Check if there are any errors
  if (Object.keys(errors).length === 0) {
    if (category) {
      const { id, name } = category;
     
      // console.log("productIconFile on submit:", productIconFile);
      // console.log("screenshotFiles on submit:", screenshotFiles);

      const personalFormData = {
        productName,
        shortDescription,
        productIcon,
        productIconFile,
        webUrl,
        overview,
        features,
        screenshots,
        screenshotFiles,
        videoUrl,
        category: {
          id,
          name,
        },
        tags,
      };

      //  const iconFileObj = productIconFile;

      // Use the screenshots File objects directly

      onNext(e, personalFormData, productIconFile, screenshotFiles);
    }
  }
  };

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onPrevious(e);
  };

  return (
    <>
{formErrors.productName && <p className="text-red-500 mb-4">{formErrors.productName}</p>}

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
      {formErrors.shortDescription && <p className="text-red-500 mb-4">{formErrors.shortDescription}</p>}
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
      {/* <div className="flex flex-row mb-4">
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
      </div> */}
      {formErrors.productIcon && <p className="text-red-500 mb-4">{formErrors.productIcon}</p>}
      <div className="flex flex-row items-center mb-4">
        <label htmlFor="product-img" className=" w-1/5 md:w-1/6mr-4 font-bold">
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
            onChange={handleProductIconImageChange}
          />
          {productIcon && (
            <img
              src={productIcon}
              alt="Product Icon"
              className="w-full h-full rounded-md"
            />
          )}
        </div>
      </div>
      {formErrors.webUrl && <p className="text-red-500 mb-4">{formErrors.webUrl}</p>}
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
      {formErrors.overview && <p className="text-red-500 mb-4">{formErrors.overview}</p>}
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
      {formErrors.features && <p className="text-red-500 mb-4">{formErrors.features}</p>}
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
          {[0, 1, 2].map((index) => (
            <div
              className="relative w-40 h-40 bg-black rounded-md mr-6"
              key={index}
            >
              <label
                htmlFor={`product-img${index + 1}`}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-75 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faCloudUploadAlt}
                  className="text-gray-300 mr-2"
                />
                Upload Image
              </label>
              <input
                type="file"
                id={`product-img${index + 1}`}
                name={`product-img${index + 1}`}
                className="hidden"
                onChange={(e) => handleScreenshotImageChange(index, e)}
              />
              {screenshots[index] && (
                <img
                  src={screenshots[index]}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-full rounded-md"
                />
              )}
            </div>
          ))}
          {/* <div className="relative w-40 h-40 bg-black rounded-md mr-6">
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
          </div> */}
          {/* <div className="relative w-40 h-40 bg-black rounded-md mr-6">
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
          </div> */}
        </div>
      </div>
      {formErrors.videoUrl && <p className="text-red-500 mb-4">{formErrors.videoUrl}</p>}
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
      {formErrors.category && <p className="text-red-500 mb-4">{formErrors.category}</p>}
      <div className="flex flex-row mb-4">
        <label htmlFor="category" className="w-1/5 md:w-1/6 mb-2 font-bold">
          Category :
        </label>
        <select
          name="category"
          id="category"
          className="block w-1/3 px-4 py-2 border border-gray-300 rounded-md"
          value={category ? `${category.id}|${category.name}` : ""}
          onChange={(e) => {
            const [categoryId, categoryName] = e.target.value.split("|");
            setCategory({
              id: categoryId,
              name: categoryName,
            });
          }}
        >
          <option value="">--Select Category--</option>
          {categories.map((category: any) => (
            <option
              key={category.category_id}
              value={`${category.category_id}|${category.name}`}
            >
              {category.name} ({category.category_id})
            </option>
          ))}
        </select>
      </div>
      {formErrors.tags && <p className="text-red-500 mb-4">{formErrors.tags}</p>}
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
  );
}

export default PersonalDetailsForm;
