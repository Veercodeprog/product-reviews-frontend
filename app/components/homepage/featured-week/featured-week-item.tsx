export default function FeaturedWeekItem({featuredProduct}:any )  {
return(
<>
<div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4 ">
                    <div className="relative">
                      <img
                        className="w-full rounded-lg"
                        src={featuredProduct.icon} width={200} height={150}
                        alt="image1"
                      />

                      <h2 className="image--headings md__down:text-2xl">
                    {featuredProduct.name} 
                    </h2>
                      <p className="image--desc md__down:text-xl">
                                          </p>
                    </div>
                  </div>
</>
)

}
