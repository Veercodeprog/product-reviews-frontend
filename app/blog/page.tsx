'use client'
import './blog.css'
import React, { useEffect, useState } from "react";
import Articles from "../../app/components/blog/articles";
 import Layout from "../components/blog/layout";
import Seo from "../../app/components/blog/seo";
import { fetchAPI } from "../../app/utils/strapiApi";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [homepage, setHomepage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, categoriesRes, homepageRes] = await Promise.all([
          fetchAPI("/articles", { populate: ["image", "category"] }),
          fetchAPI("/categories", { populate: "*" }),
          fetchAPI("/homepage", {
            populate: {
              hero: "*",
              seo: { populate: "*" },
            },
          }),
        ]);

        setArticles(articlesRes.data);
        setCategories(categoriesRes.data);
        setHomepage(homepageRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!homepage) {
    return <div>Loading...</div>;
  }

  return (
    <>
<div className=" justify-center items-center ">
       <Layout categories={categories} >
        <Seo seo={homepage.attributes.seo} />
        <div className="uk-section">
          <div className="uk-container uk-container-large">
            <h1>{homepage.attributes.hero.title}</h1>
            <Articles articles={articles} />
          </div>
        </div>
     </Layout> 
</div>
    </>
  );
};

export default Blog;
