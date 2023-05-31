
// import React, { useEffect, useState } from "react";
import 'server-only'
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import Nav from "../../components/blog/nav";
import { fetchCategories,fetchArticleDescription ,preload } from "@/app/utils/strapi/articleDescription";
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


export default async function Article(props: any  ) {

  const { slug } = props.params;
console.log("slug::", slug);
  // console.log(slug);
    preload(slug);
 const articleData =  fetchArticleDescription(slug);
  const categoryData =  fetchCategories();
    

      const article  = await articleData;
      const categories = await categoryData;



  // console.log("image::", article);

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
{moment().format("MMM Do YYYY")}
                {/* <Moment format="MMM Do YYYY"> */}
                  {article.attributes.published_at}
                {/* </Moment> */}
              </p>
            </div>

<div className="flex items-center justify-center h-screen">
  <div className="container">
    <div className="row justify-content-center mb-4">
      <div className="col-lg-8">
        <h5>2 Comments</h5>
      </div>
    </div>
    <div className="row justify-content-center mb-4">
      <div className="col-lg-8">
        <div className="comments">
          <div className="comment flex mb-4">
            <div className="flex-shrink-0">
              <div className="avatar avatar-sm rounded-circle">
                <img className="avatar-img" src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
              </div>
            </div>
            <div className="flex-grow-1 ms-2 ms-sm-3">
              <div className="comment-meta flex items-baseline">
                <h6 className="me-2">Jordan Singer</h6>
                <span className="text-muted">2d</span>
              </div>
              <div className="comment-body">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non minima ipsum at amet doloremque qui magni, placeat deserunt pariatur itaque laudantium impedit aliquam eligendi repellendus excepturi quibusdam nobis esse accusantium.
              </div>

              <div className="comment-replies bg-light p-3 mt-3 rounded">
                <h6 className="comment-replies-title mb-4 text-muted text-uppercase">2 replies</h6>

                <div className="reply flex mb-4">
                  <div className="flex-shrink-0">
                    <div className="avatar avatar-sm rounded-circle">
                      <img className="avatar-img" src="https://images.unsplash.com/photo-1501325087108-ae3ee3fad52f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=f7f448c2a70154ef85786cf3e4581e4b" alt="" />
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-2 ms-sm-3">
                    <div className="reply-meta flex items-baseline">
                      <h6 className="mb-0 me-2">Brandon Smith</h6>
                      <span className="text-muted">2d</span>
                    </div>
                    <div className="reply-body">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </div>
                  </div>
                </div>
                <div className="reply flex">
                  <div className="flex-shrink-0">
                    <div className="avatar avatar-sm rounded-circle">
                      <img className="avatar-img" src="https://randomuser.me/api/portraits/men/4.jpg" alt="" />
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-2 ms-sm-3">
                    <div className="reply-meta flex items-baseline">
                      <h6 className="mb-0 me-2">James Parsons</h6>
                      <span className="text-muted">1d</span>
                    </div>
                    <div className="reply-body">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore sed eos sapiente, praesentium.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="comment flex">
            <div className="flex-shrink-0">
              <div className="avatar avatar-sm rounded-circle">
                <img className="avatar-img" src="https://randomuser.me/api/portraits/women/63.jpg" alt="" />
              </div>
            </div>
            <div className="flex-shrink-1 ms-2 ms-sm-3">
              <div className="comment-meta flex">
                <h6 className="me-2">Jenna Roberts</h6>
                <span className="text-muted">4d</span>
              </div>
              <div className="comment-body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto laborum in corrupti dolorum, quas delectus nobis porro accusantium molestias sequi.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="comment-form flex items-center">
          <div className="flex-shrink-0">
            <div className="avatar avatar-sm rounded-circle">
              <img className="avatar-img" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt="" />
            </div>
          </div>
          <div className="flex-grow-1 ms-2 ms-sm-3">
            <form>
              <textarea className="form-control py-0 px-1 border-0" rows="1" placeholder="Start writing..." style={{ resize: "none" }}></textarea>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




          </div>
        </div>
      </div>
  </>
  );
};

