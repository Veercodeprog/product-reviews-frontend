import { fetchArticles, preload } from "@/app/utils/strapi/strapiPreloadData";
// import AllArticlesTable from "@/app/components/admin/homepage/article-table";
import { getAllPopularNowAdmin } from "@/app/utils/dataApi";
import PopularNowTable from "@/app/components/admin/homepage/popular-now-table";
export default async function HomePageContent() {
  preload(); // Start fetching the data eagerly using the preload function

  const articleData = fetchArticles();
  const popularNowData = getAllPopularNowAdmin();
  const articles = await articleData;
  const popularNow = await popularNowData;
  // {articles.map((article:any, i:any) => {
  //         return (
  //           <AllArticlesTable
  //             article={article}
  //             key={`article__left__${article.attributes.slug}`}
  //           />
  //         );
  //       })}
  return (
    <>
      <main>
        <div className="pt-6 px-4">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-shrink-0">
                  <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                    HomePage Content
                  </span>
                  {/* <h3 className="text-base font-normal text-gray-500">Sales this week</h3> */}
                </div>
                {/* <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                        12.5%
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div> */}
              </div>
              <div id="main-chart" />
            </div>

            {/* <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
            undo
            <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Blogs{" "}
                  </h3>
                  <span className="text-base font-normal text-gray-500">
                    {" "}
                    list of blogs
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href="#"
                    className="text-sm font-medium text-purple-600 hover:bg-gray-100 rounded-lg p-2"
                  >
                    View all
                  </a>
                </div>
              </div>
              <div className="flex flex-col mt-8">
                <div className="overflow-x-auto rounded-lg">
                  <div className="align-middle inline-block min-w-full">
                   
                      <AllArticlesTable articles={articles} />

                    
                  </div>
                </div>
              </div>
            </div> */}
       
       <PopularNowTable popularNow={popularNow} />
        </div>
        </div>
      </main>
    </>
  );
}
