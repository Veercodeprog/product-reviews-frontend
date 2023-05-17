import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import images from "../../../data/images"
function OverviewTab() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (direction) => {
    if (direction === "next" && currentIndex < images.length - 3) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
<section className="mb-20">
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Image Gallery</h2>
      </div>
      <div className="flex flex-wrap -mx-4 overflow-hidden">
        {images.slice(currentIndex, currentIndex + 3).map((imageUrl, index) => (
          <div
            key={index}
            className="w-full overflow-hidden lg:w-1/3 xl:w-1/3 px-4 relative"
          >
            <div style={{ position: "relative" }}>
              <Image
                className="w-full h-48 object-cover object-center mb-10" width={200} height={150}
                src={imageUrl}
                alt={`Image ${index + currentIndex + 1}`}  
              />
              {index === 0 && (
                <button
                  className="bg-purple-800 hover:bg-purple-600 text-white font-black  rounded-full h-11 w-11	 flex items-center justify-center"
                  onClick={() => handleScroll("prev")}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "-5%",
                    transform: "translateY( -50%)",
                    zIndex: 1,
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                </button>
              )}
              {index === 2 && (
                <button
                  className="bg-purple-800 hover:bg-purple-600 rounded-full text-white font-black  h-11 w-11 flex sm:items-center sm:justify-center items-end"
                  onClick={() => handleScroll("next")}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-5%",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                  }}
                >
                  <FontAwesomeIcon icon={faAngleRight} size="2x" />
                </button>
              )}
            </div>
          </div>
        ))}
 
      </div>
<p className="card-text para leading-tight">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
    </div>
</section>
  );
}

export default OverviewTab;
