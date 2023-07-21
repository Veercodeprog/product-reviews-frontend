import { faImage, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
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
      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="fname" className=" sm:col-span-1 font-bold">
          Product Name :
        </label>
        <div className="sm:col-span-3">
          <input
            type="text"
            name="productname"
            id="productname"
            placeholder="Product Name"
            className=" block sm:col-span-3 items-start  px-4 py-2 w-full border border-gray-300 rounded-md"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          {formErrors.productName && (
            <p className="text-red-500 my-1 text-sm">
              {formErrors.productName}
            </p>
          )}
        </div>
      </div>
      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="lname" className="sm:col-span-1 font-bold">
          Short Description :
        </label>
        <div className="sm:col-span-3">
          <input
            type="text"
            name="shortdesc"
            id="shortdesc"
            placeholder=" Short Description"
            className="  px-4 py-2 w-full border border-gray-300 rounded-md"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
          {formErrors.shortDescription && (
            <p className="text-red-500 my-1 text-sm">
              {formErrors.shortDescription}
            </p>
          )}
        </div>
      </div>
      {/* <div className="grid grid-cols-4 gap-3 mb-4">
        <label htmlFor="product-img" className=" col-span-1 font-bold">
          <FontAwesomeIcon icon={faImage} /> Product Icon:
        </label>
        <label
          htmlFor="product-img"
          className="col-span-3 flex items-center justify-center px-4 py-2 w-full border border-gray-300 rounded-md cursor-pointer"
        >
          <FontAwesomeIcon icon={faCloudArrowUp} className="	mr-2" />
          Upload Image
        </label>
        <input
          type="file"
          id="product-img"
          name="product-img"
          className="w-1/3 px-4 py-2 w-full border border-gray-300 rounded-md hidden"
          onChange={handleProductIconImageChange}
        />
      </div> */}

      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="product-img" className="sm:col-span-1 font-bold">
          Product Icon:
        </label>
        <div className="sm:col-span-3">
          <div className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <label
              htmlFor="product-img"
              className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center opacity-75 hover:opacity-100 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                className=" w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
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
                className="w-full h-full rounded-md object-cover"
              />
            )}
          </div>
          {formErrors.productIcon && (
            <p className="text-red-500 my-1 text-sm">
              {formErrors.productIcon}
            </p>
          )}
        </div>
      </div>
      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="url" className="sm:col-span-1 font-bold">
          Website Url :
        </label>
        <div className="sm:col-span-3">
          <input
            type="text"
            name="url"
            id="url"
            placeholder=" Website Url"
            className=" px-4 py-2 w-full border border-gray-300 rounded-md"
            value={webUrl}
            onChange={(e) => setWebUrl(e.target.value)}
          />
          {formErrors.webUrl && (
            <p className="text-red-500 my-1 text-sm">{formErrors.webUrl}</p>
          )}
        </div>
      </div>
      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="overview" className="sm:col-span-1 font-bold">
          Overview :
        </label>
        <div className=" sm:col-span-3">
          <textarea
            name="overview"
            id="overview"
            placeholder="Overview"
            className="  px-4 py-2 w-full border border-gray-300 rounded-md"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
          />
          {formErrors.overview && (
            <p className="text-red-500 my-1 text-sm">{formErrors.overview}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="features" className="sm:col-span-1 font-bold">
          Features :
        </label>
        <div className="sm:col-span-3">
          <textarea
            name="features"
            id="features"
            placeholder="Features"
            className=" px-4 py-2 w-full border border-gray-300 rounded-md"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />
          {formErrors.features && (
            <p className="text-red-500 my-1 text-sm">{formErrors.features}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="product-imgs" className="sm:col-span-1 font-bold">
          <FontAwesomeIcon icon={faImage} /> Screenshots:
        </label>
        <div className="grid gap-3 grid-cols-3 sm:col-span-3">
          {[0, 1, 2].map((index) => (
            <div
              className="relative flex flex-col items-center justify-center w-full aspect-square border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              key={index}
            >
              <label
                htmlFor={`product-img${index + 1}`}
                className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center opacity-75 hover:opacity-100 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faCloudArrowUp}
                  className=" w-8 h-8 text-gray-500 dark:text-gray-400"
                />
                <p className="mb-2 text-[9px] md:text-sm text-center px-3 text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                {/* <p className="text-[9px] text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p> */}
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
                icon={faCloudArrowUp}
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
                icon={faCloudArrowUp}
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

      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="vid-url" className="sm:col-span-1 font-bold">
          Video Url :
        </label>
        <div className="sm:col-span-3">
          <input
            type="text"
            name="vid-url"
            id="vid-url"
            placeholder="Add url"
            className="  px-4 py-2 w-full border border-gray-300 rounded-md"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          {formErrors.videoUrl && (
            <p className="text-red-500 my-1 text-sm">{formErrors.videoUrl}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="category" className="sm:col-span-1 font-bold">
          Category :
        </label>
        <div className="sm:col-span-3">
          <select
            name="category"
            id="category"
            className=" px-4 py-2 w-full border border-gray-300 rounded-md"
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
            {categories &&
              categories.map((category: any) => (
                <option
                  key={category.category_id}
                  value={`${category.category_id}|${category.name}`}
                >
                  {category.name} ({category.category_id})
                </option>
              ))}
          </select>
          {formErrors.category && (
            <p className="text-red-500 my-1 text-sm">{formErrors.category}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="tags" className="sm:col-span-1 font-bold">
          Tags :
        </label>
        <div className="sm:col-span-3 ">
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="tags"
            className="px-4 py-2 w-full w-full border border-gray-300 rounded-md"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          {formErrors.tags && (
            <p className="text-red-500 my-1 text-sm">{formErrors.tags}</p>
          )}

          <p className="mt-2">
            <span className="inline-flex capitalize items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 group ">
              hello
              <button type="button" className="w-3 h-3 relative rounded-sm translate-x-1 group-hover:bg-purple-400">
                {/* <span className="hidden">Remove</span> */}
                <svg viewBox="0 0 14 14" className="w-3 h-3 stroke-purple-500 group-hover:stroke-white">
                  <path d="M4 4l6 6m0-6l-6 6"></path>
                </svg>
                <span className="absolute inset-0"></span>
              </button>
            </span>
          </p>
        </div>
      </div>

      <div className="flex gap-4 pb-20 flex-row sm:justify-end mt-10 mb-10">
        <button
          type="button"
          className="previous w-34 sm:w-32 bg-gray-500 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 w-full text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mb-4 sm:mb-0 "
        >
          Save as Draft
        </button>
        <button
          type="button"
          className="next  w-34 sm:w-32 bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 w-full text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mb-4 sm:mb-0 "
          onClick={handleNext}
        >
          Continue
        </button>
      </div>
    </>
  );
}

export default PersonalDetailsForm;
