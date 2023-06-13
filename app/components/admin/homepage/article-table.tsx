import ArticleTableRow from "./article-table-row";
const AllArticlesTable = ({ articles }: { articles: any }) => {
  return (
    <>
 <div className="shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Blog Title
            </th>
            <th
              scope="col"
              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Image
            </th>
            {/* <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                  </th> */}
            <th
              scope="col"
              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Featured
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {articles.map((article: any, i: any) => {
            return (
              <ArticleTableRow
                article={article}
                key={`${article.attributes.slug}`}
              />
            );
          })}
        </tbody>
<button className="hidden sm:inline-flex ml-5 text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
  Add New Featured Blog
</button>
      </table>
</div>
    </>
  );
};
export default AllArticlesTable;
