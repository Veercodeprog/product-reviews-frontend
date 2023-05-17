import Image from "next/image";

export default function FeaturedProductsList(){
return(
<div className="lg:max-w-lg lg:w-full  md:w-1/2 w-5/6">
              <div className="flex flex-wrap ml-2">
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4 ">
                  <div className="relative">
                    <Image
                      className="w-full rounded-lg"
                      src="https://dummyimage.com/200x150/000/fff.jpg"
                      alt="image1"
                    />
                    <h2 className="image--headings md__down:text-2xl">
                      Image Title
                    </h2>
                    <p className="image--desc md__down:text-xl">
                      Image Description
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4 ">
                  <div className="relative">
                    <Image
                      className="w-full rounded-lg"
                      src="https://dummyimage.com/200x150/000/fff.jpg"
                      alt="image1"
                    />
                    <h2 className="image--headings md__down:text-2xl">
                      Image Title
                    </h2>
                    <p className="image--desc md__down:text-xl">
                      Image Description
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4 ">
                  <div className="relative">
                    <Image
                      className="w-full rounded-lg"
                      src="https://dummyimage.com/200x150/000/fff.jpg"
                      alt="image1"
                    />
                    <h2 className="image--headings md__down:text-2xl">
                      Image Title
                    </h2>
                    <p className="image--desc md__down:text-xl">
                      Image Description
                    </p>
                  </div>
                </div>
              </div>
            </div>
)
}