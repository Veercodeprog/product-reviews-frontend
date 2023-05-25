'use client'
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import Nav from "../../components/blog/nav";
import { fetchCategories,fetchArticleDescription ,preload } from "@/app/utils/strapi/articleDescription";
import { getStrapiMedia } from "@/app/utils/strapi/media";
import { get } from "http";
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



const Article = async(props: any) => {

  const { slug } = props.params;
console.log("slug::", slug);
  console.log(slug);
  preload(slug);
 const articleData =  fetchArticleDescription(slug);
  const categoryData =  fetchCategories();
    

      const article = await articleData;
      const categories = await categoryData;



  console.log("image::", article);

 const image = article.attributes.image
const  formats  = article.attributes.author.data.attributes.picture
// const imageUrls = Object.values(formats).map((format) => format.url);
// const srcset = imageUrls.join(", ");




  return (
<>
       <Nav categories={categories} />
    
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={article.attributes.author.data.attributes.picture}
         data-srcset={formats}
        data-uk-img
      >
        <h1 className= "">{article.attributes.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small ">
         <ReactMarkdown>
  {article.attributes.content}
</ReactMarkdown>

          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
             {article.attributes?.author?.data && article.attributes.author.data.attributes.picture && (
              <img
                src={getStrapiMedia(
                  article.attributes.author.data.attributes.picture.data.attributes                )}
                alt={
                  article.attributes.author.data.attributes.picture.data &&
                  article.attributes.author.data.attributes.picture.data.attributes &&
                  article.attributes.author.data.attributes.picture.data.attributes.alternativeText
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
                <Moment format="MMM Do YYYY">
                  {article.attributes.published_at}
                </Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
  </>
  );
};

export default Article;