import "server-only";
import SearchInput from "./components/homepage/search-input";
import PopularNowText from "./components/homepage/popular-now-text";
import FeaturedArticleList from "./components/homepage/featured-articles/featured-article-list";
import HomeButtonList from "./components/homepage/home-button-list";
import FeaturedWeekList from "./components/homepage/featured-week/featured-week-list";
import { getAllPopularNowActive } from "./utils/dataApi";
import { preload, fetchArticles } from "./utils/strapi/strapiPreloadData";
import { getFeaturedProductsHomepage } from "./utils/dataApi";
export const revalidate = 60;
export default async function Home() {
  preload(); // Start fetching the data eagerly using the preload function

  const articleData = fetchArticles();
  const articles = await articleData;
  const popularNowData = getAllPopularNowActive();
  const popularNow = await popularNowData;
 const featuredProductsData = getFeaturedProductsHomepage();
    const featuredProducts = await featuredProductsData;
  return (
    <>
      <main className="">
        <div className=" container mx-auto p-2 sm:max-w-lg mt-24">
          <div className="mb-10 font-light leading-normal">
            <h2 className="page-headings">Discover the best products</h2>

            <div className="relative mb-10">
              <SearchInput />
              <div className="flex flex-wrap items-center">
                <p className="text-lg inline-flex items-center flex-shrink-0 mt-3 max-w-screen pr-4">
                  <span className=" mr-2 font-medium">Popular Now:</span>
                  {popularNow &&
                    popularNow.map((popularNow: any) => (
                      <PopularNowText popularNow={popularNow} />
                    ))}
                </p>
              </div>
            </div>
            <HomeButtonList />
            <HomeButtonList />

            <div className="featured-week--section mt-10">
              <p className="small--sub--headings">Featured This Week</p>

              <FeaturedWeekList  featuredProducts={featuredProducts}  />
            </div>
            <div className="featured-article--section">
              <p className="small--sub--headings">Featured Articles</p>
              <FeaturedArticleList articles={articles} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
