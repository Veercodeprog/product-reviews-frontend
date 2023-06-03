// import React, { useEffect, useState } from "react";
// import "server-only";

import { useContext } from 'react';
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import { postComment } from "@/app/utils/strapi/commentsRename";
import { checkAuthState } from "@/app/utils/sessionnew";
import Nav from "../../components/blog/nav";
import Comments from '@/app/components/blog/blog-descritpion/comments';
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
  console.log("slug::", slug);
  // console.log(slug);
  preload(slug);
  const articleData = fetchArticleDescription(slug);
  const categoryData = fetchCategories();

  const article = await articleData;
  const categories = await categoryData;

  console.log("article_id::", article);

  const image = article.attributes.image;
  const formats = article.attributes.author.data.attributes.picture;




  return (
    <>
{/* <SessionManager
  updateUser={handleUpdateUser}
  setLoading={handleSetLoading}
/>      */}


 <Nav categories={categories} />
<p className=' text-5xl'>hiiiii{article.id}</p>
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={article.attributes.author.data.attributes.picture}
        data-srcset={formats}
        data-uk-img
      >

        <h1 className="text-sm">{article.attributes.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small ">
          <ReactMarkdown>{article.attributes.content}</ReactMarkdown>

          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {article.attributes?.author?.data &&
                article.attributes.author.data.attributes.picture && (
                  <img
                    src={getStrapiMedia(
                      article.attributes.author.data.attributes.picture.data
                        .attributes
                    )}
                    alt={
                      article.attributes.author.data.attributes.picture.data &&
                      article.attributes.author.data.attributes.picture.data
                        .attributes &&
                      article.attributes.author.data.attributes.picture.data
                        .attributes.alternativeText
                    }
                    className="w-auto h-auto"
                    style={{
                      position: "static",
                      borderRadius: "20%",
                      height: 60,
                    }}
                  />
                )}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By {article.attributes.author.data.attributes.name}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                {moment().format("MMM Do YYYY")}
                {/* <Moment format="MMM Do YYYY"> */}
                {article.attributes.published_at}
                {/* </Moment> */}
              </p>
            </div>


          </div>
<div className=" -ml-20 mb-10">
<Comments articleId= {article.id} />
         </div>
        </div>

      </div>

    </>
  );
}
