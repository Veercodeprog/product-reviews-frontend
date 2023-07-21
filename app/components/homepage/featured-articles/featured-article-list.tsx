import FeaturedArticleItem from "./featured-article-item";
export default function FeaturedArticleList({ articles }: { articles: any }) {
  const articleCount = 4;

  const firstSectionArticles = articles.slice(0, articleCount);
  const secondSectionArticles = articles.slice(articleCount, articleCount * 2);
  return (
    <>
      <div className="featured-article-list">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {firstSectionArticles.map((article: any, index: number) => (
            <FeaturedArticleItem
              key={`${article.attributes.slug}`}
              article={article}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {secondSectionArticles.map((article: any, index: number) => (
            <FeaturedArticleItem
              key={`${article.attributes.slug}`}
              article={article}
            />
          ))}
        </div>
      </div>
    </>
  );
}
