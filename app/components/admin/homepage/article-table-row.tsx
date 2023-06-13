import BlogImage from "./blog-image";
export default function ArticleTableRow({ article }: { article: any }) {
  return (
    <>
      <tr>
        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
          {/* Payment from{" "} */}
          {/* <span className="font-semibold">{article.attributes.title}</span> */}
        </td>
        <td className="p-4 whitespace-nowrap">
          {/* <BlogImage image={article.attributes.image} /> */}
        </td>

        <td className="p-4 whitespace-nowrap">
          <input type="checkbox" name="" value="" />
        </td>
      </tr>
    </>
  );
}
