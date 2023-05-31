import { getStrapiMedia } from "@/app/utils/strapi/media";
import Link from "next/link";
export default function FeaturedArticleItem({ article }: { article: any }) {
const imageUrl = getStrapiMedia(article.attributes.image);
return(
<>

      
<div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4 ">
<Link href={`/blog/${article.attributes.slug}`}>
                    <div className="relative">
<div className="w-200 h-150">
                      <img
                        className=" w-full h-full rounded-lg object-cover "
                        src={imageUrl} 

                        alt={`${article.attributes.slug}`}
                      />
</div>

                      <h2 className="image--headings md__down:text-2xl">
                       {article.attributes.title}
                      </h2>
                      <p className="image--desc md__down:text-xl">
                     
                      </p>
                    </div>
 </Link>
                  </div>
 
   
{/* </Link> */}
</>
)

}