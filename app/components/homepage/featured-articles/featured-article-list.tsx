import Image from "next/image";

import FeaturedArticleItem from "./featured-article-item";
export default function FeaturedArticleList({ articles }: { articles:any }) {

 console.log("articles::",articles)

 const articleCount = 4;


  const firstSectionArticles = articles.slice(0, articleCount);
  const secondSectionArticles = articles.slice(articleCount, articleCount * 2);
return(
<>

   

       <div className="featured-article-list">
                <div className="flex flex-wrap ml-2">
                  {firstSectionArticles.map((article: any, index: number) => (
        <FeaturedArticleItem  key={`${article.attributes.slug}`} article={article} />
      ))}
                  
                  
                </div>
                <div className="flex flex-wrap ml-2">
                {secondSectionArticles.map((article: any, index: number) => (
        <FeaturedArticleItem key={`${article.attributes.slug}`} article={article} />
      ))}
                </div>
              </div>
</>
)
}