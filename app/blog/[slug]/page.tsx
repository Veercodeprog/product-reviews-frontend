import "server-only";

import { useContext } from "react";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";

import Nav from "../../components/blog/nav";
import Comments from "@/app/components/blog/blog-descritpion/comments";
import {
  fetchCategories,
  fetchArticleDescription,
  preload,
} from "@/app/utils/strapi/articleDescription";
import SessionManager from "@/app/utils/session";
import { getStrapiMedia } from "@/app/utils/strapi/media";
import { get } from "http";
import moment from "moment";
interface Article {
  attributes: {
    title: string;
    description: string;
    image: string;
    author: {
      data: {
        attributes: {
          picture: {
            data: {
              attributes: {
                alternativeText: string;
              };
            };
          };
          name: string;
        };
      };
    };
    published_at: string;
    content: string;
  };
}

export default async function ArticleDescription(props: any) {
  // const [user, setUser] = useState(null);

  const { slug } = props.params;
  preload(slug);
  const articleData = fetchArticleDescription(slug);
  const categoryData = fetchCategories();

  const article = await articleData;
  const categories = await categoryData;

  const image = article.attributes.image;
  const formats = article.attributes.author.data.attributes.picture;

  return (
    <>
      <div className="container px-4  mx-auto py-10 prose sm:max-w-[80%]">
        {/* <Nav categories={categories} /> */}
        <p className="text-3xl">hiiiii{article.id}</p>
        <div
          id="banner"
          style={{
            "--image-url": `url(${article.attributes.author.data.attributes.picture})`,
          }}
          className="bg-[image:var(--image-url)] aspect-[3/1] object-cover my-4 relative w-full min-h-[200px] bg-gradient-to-r from-violet-500 to-fuchsia-500"
          // className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
          data-src={article.attributes.author.data.attributes.picture}
          data-srcset={formats}
          data-uk-img
        >
          <p className="text-sm absolute my-0 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 text-white">
            {article.attributes.title}
          </p>
        </div>
        <div className="uk-section">
          <div className="uk-container uk-container-small ">
            <ReactMarkdown>{article.attributes.content}</ReactMarkdown>

            <hr className="mb-4"/>

            <h6 className="font-medium text-lg mb-3">Author</h6>
            <div className="flex items-center" data-uk-grid="true">
              <div className="w-20">
                {article.attributes?.author?.data &&
                  article.attributes.author.data.attributes.picture && (
                    <img
                      src={getStrapiMedia(
                        article.attributes.author.data.attributes.picture.data
                          .attributes
                      )}
                      alt={
                        article.attributes.author.data.attributes.picture
                          .data &&
                        article.attributes.author.data.attributes.picture.data
                          .attributes &&
                        article.attributes.author.data.attributes.picture.data
                          .attributes.alternativeText
                      }
                      className="w-14 h-auto rounded-full h-14 object-cover my-0" 
                    />
                  )}
              </div>
              <div className="flex-1">
                <p className="my-0 font-medium text-black">
                  By {article.attributes.author.data.attributes.name}
                </p>
                <p className="my-0 text-sm">
                  {moment().format("MMM Do YYYY")}
                  {/* <Moment format="MMM Do YYYY"> */}
                  {article.attributes.published_at}
                  {/* </Moment> */}
                </p>
              </div>
            </div>
            <hr/>
            <div className="">
            <h6 className="font-medium text-lg mb-3">Comments</h6>
              <Comments articleId={article.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
