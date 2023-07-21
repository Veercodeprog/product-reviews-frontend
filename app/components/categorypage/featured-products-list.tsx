import Image from "next/image";

export default function FeaturedProductsList({featuredProducts}:any )  {
return(
<div className="lg:max-w-lg lg:w-full  md:w-1/2 w-5/6">
              <div className="flex flex-wrap ">
                {featuredProducts && featuredProducts.map((featuredProduct: any) => (
                <div key={featuredProduct.product_id}  className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4 ">
                 <div className="relative">
                   <Image
                        className="w-full rounded-lg"
                        src={featuredProduct.icon} width={200} height={150}
                        alt="image1"
                      />
                    <h2 className="image--headings md__down:text-2xl  capitalize">
                      {featuredProduct.name} 
                    </h2>
                    <p className="image--desc md__down:text-xl">
                      {featuredProduct.short_description}
                    </p>
                  </div>
                </div>
                ))}




             
              </div>
            </div>
)
}
