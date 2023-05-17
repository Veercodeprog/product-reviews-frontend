import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
export default function ProductCards(){
return(
 <div className="container mx-auto flex flex-col md:flex-row items-center sm:mb-14">
            <div className="md:w-3/4 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-center text-center">
              <div className="flex items-center">

                    
                <Image
                      
                        src="https://dummyimage.com/200x150/000/fff.jpg"
                        alt="image1" width={200} height={150}
                  className="mr-8"
                />
                <p className="card-text para">
                  hiu Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse pharetra nec ligula quis tristique. Duis semper
                  nisi vitae eros consectetur laoreet. Nulla facilisi.
                </p>
              </div>
            </div>
            {/* small screen */}
            <div className="md:w-1/4 md:pr-0 flex flex-col md:items-end items-center ss:items-start sm:items-center text-center ">
              <div className="flex  md:justify-end  xs:mt-4 sm:hidden  mb-20  md:mr-0 sm:mr-96 se:-ml-32 se:-mt-16  xs:-ml-56 ss:-ml-64">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-2xl mr-5 mt-1 -ml-4"
                />
                <button
                  type="button"
                  className=" max-w-4xl border border-purple-800 bg-white bg-opacity-0 hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-gray-800 text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900"
                >
                  View more1
                </button>
              </div>
              <div className="hidden sm:flex justify-start md:justify-end -mt-5  md:items-end ">
                <div className="flex">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="mt-2 text-2xl mr-14 "
                  />
                  <button
                    type="button"
                    className="max-w-4xl border border-purple-800 bg-white bg-opacity-0 hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-gray-800 text-sm px-6 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900"
                  >
                    View more
                  </button>
                </div>
              </div>
            </div>
          </div>
)
}