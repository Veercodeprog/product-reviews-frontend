export default function PopularNowText() {
return(
<div className="flex flex-wrap items-center">
                <p className="text-lg inline-flex items-center flex-shrink-0 mt-3">
                  <span className="px-2 font-medium">Popular Now:</span>
                  <a
                    href=""
                    className=" font-light sm:font-normal text-blue-500 underline hover:no-underline"
                  >
                    best tool
                  </a>
                  <a
                    href=""
                    className=" font-light sm:font-normal text-blue-500 underline hover:no-underline ml-2"
                  >
                    copywriting
                  </a>
                  <a
                    href=""
                    className="font-light sm:font-normal text-blue-500 underline hover:no-underline ml-2"
                  >
                    canva
                  </a>
                </p>
              </div>
)
}