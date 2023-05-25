import SearchInput from "./components/homepage/search-input";
import PopularNowText from "./components/homepage/popular-now-text";
import FeaturedArticleList from "./components/homepage/featured-articles/featured-article-list";
import HomeButtonList from "./components/homepage/home-button-list";

export const revalidate = 60;
export default function Home() {
  return (
    <>
      <main className="">
        <div className=" container mx-auto p-2 sm:max-w-lg mt-24">
          <div className="mb-10 font-light leading-normal">
            <h2 className="page-headings">Discover the best products</h2>

            <div className="relative mb-10">
              <SearchInput />

              <PopularNowText />
            </div>
            <HomeButtonList />
            <HomeButtonList />

            <div className="featured-week--section mt-10">
              <p className="small--sub--headings">Featured This Week</p>

              <FeaturedArticleList />
            </div>
            <div className="featured-article--section">
              <p className="small--sub--headings">Featured Articles</p>
              <FeaturedArticleList />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
