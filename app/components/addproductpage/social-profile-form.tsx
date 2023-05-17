import { faImage, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function SocialProfileForm({ onNext, onPrevious }: { onNext: (e: React.MouseEvent<HTMLButtonElement>) => void, onPrevious: (e: React.MouseEvent<HTMLButtonElement>) => void }  ) {
  // ...

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onNext(e);
  };

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onPrevious(e);
  };
const handleChangeImage = () => {
    const avatarImg = document.getElementById("avatar-img");
    if (avatarImg) {
      avatarImg.click();
    }
  };

return(
<>
	<div className="flex flex-row items-center mb-4">
				<label
				htmlFor="avatar-img"
				className="w-1/3  sm:w-1/6 mr-4 font-bold"
				>
				{/* <FontAwesomeIcon icon={faImage} /> Avatar Image: */}
				</label>

				<div className="relative items-end w-1/4 h-20 sm:w-40 sm:h-40 rounded-full overflow-hidden">
				<div
					className="image-box w-full h-full bg-center bg-no-repeat bg-cover"
					style={{
					backgroundImage:
						"url(https://dummyimage.com/200x200/000/fff)",
					}}
				/>

				<label
					htmlFor="avatar-img"
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-800"
				>
					<FontAwesomeIcon
					icon={faCloudUploadAlt}
					className="text-gray-300"
					/>
					<input
					type="file"
					id="avatar-img"
					name="avatar-img"
					className="hidden"
					/>
				</label>
				</div>

            <div className="ml-4">
              <button
                type="button"
                className="justify-end next w-24 sm:w-32 bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mb-4 sm:mb-0 mr-8"
                onClick={handleChangeImage}
              >
                Change
              </button>
            </div>
          </div>

          <div className="flex flex-row	 mb-4">
            <label htmlFor="fname" className=" w-1/3 md:w-1/6  mb-2 font-bold">
              Product Name :
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="Product Name"
              className=" block w-1/2 items-start  px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-row	 mb-4">
            <label htmlFor="fname" className=" w-1/3 md:w-1/6  mb-2 font-bold">
              Role :
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="Product Name"
              className=" block w-1/2   px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-row	 mb-4">
            <label htmlFor="fname" className=" w-1/3 md:w-1/6  mb-2 font-bold">
              Bio :
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="Product Name"
              className=" block w-1/2   px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-row	 mb-4">
            <label htmlFor="fname" className=" w-1/3 md:w-1/6  mb-2 font-bold">
              Work Email :
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="Product Name"
              className=" block w-1/2 items-start  px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-row	 mb-4">
            <label htmlFor="fname" className="w-1/3 md:w-1/6  mb-2 font-bold">
              Overview :
            </label>
            <textarea
            
              name="fname"
              id="fname"
              placeholder="Overview"
              className=" block w-1/2 items-start  px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-row	 mb-4">
            <label htmlFor="fname" className=" w-1/3 md:w-1/6  mb-2 font-bold">
              Linkedin :
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="Product Name"
              className=" block w-1/2 items-start  px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-row	 mb-4">
            <label htmlFor="fname" className=" w-1/3 md:w-1/6  mb-2 font-bold">
              Twitter :
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="Product Name"
              className=" block w-1/2 items-start  px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="  flex flex-row	 mb-4">
            <div className=" text-end w-full sm:w-1/2">
              <button
                type="button"
                className=" justify-end   next w-24  sm:w-32 bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mb-4 sm:mb-0 mr-8"
              >
                Add Member+
              </button>
            </div>
          </div>
          <div className="flex  flex-row sm:justify-end mt-10 mb-10">
            <button
              type="button"
              className="previous w-24 sm:w-32 bg-gray-500 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mb-4 sm:mb-0 mr-8"
              onClick={handlePrevious}
            >
              Previous
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

export default SocialProfileForm