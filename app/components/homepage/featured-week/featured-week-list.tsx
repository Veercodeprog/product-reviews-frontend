import Image from "next/image";

import FeaturedWeekItem from "./featured-week-item";
export default function FeaturedWeekList() {



 const articleCount = 4;
return(
<>

   


       <div className="featured-article-list">
                <div className="flex flex-wrap ml-2">
                 {Array.from({ length: articleCount }).map((_, index) => (
<FeaturedWeekItem key={index}  />
        
      ))}
                  
                  
                </div>
                <div className="flex flex-wrap ml-2">
                      {Array.from({ length: articleCount }).map((_, index) => (
        <FeaturedWeekItem key={index} />
      ))}
                </div>
              </div>
</>
)
}