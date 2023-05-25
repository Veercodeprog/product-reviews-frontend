import './blog.css'
import React, { useEffect, useState } from "react";
import Articles from "../../app/components/blog/articles";
 import Layout from "../components/blog/layout";
import { preload } from "../../app/utils/strapiApi";
import { cache } from 'react';
// import 'server-only';

interface Article {
  attributes: {
    image: string;
    category: any; // Replace 'any' with the actual type of the 'category' property
  };
}

interface Category {
  // Define the properties of the Category object here
}

interface Homepage {
  attributes: {
 
    hero: {
      title: string;
    };
  };
}

const fetchArticles = cache(async () => {
  try {
    const articlesRes = await preload("/articles", { populate: ["image", "category"] }, );
    return articlesRes.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
});

const fetchCategories = cache(async () => {
  try {
    const categoriesRes = await preload("/categories", { populate: "*" });
    return categoriesRes.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
});

const fetchHomepage = cache(async () => {
  try {
    const homepageRes = await preload("/homepage", {
      populate: {
        hero: "*",
        seo: { populate: "*" },
      },
    });
    return homepageRes.data;
  } catch (error) {
    console.error("Error fetching homepage:", error);
    throw error;
  }
});



export default async function Blog () {


const articleData = fetchArticles();
const categoryData = fetchCategories();
const homepageData = fetchHomepage();

const articles = await articleData;
const [categories, homepage] = await Promise.all([categoryData, homepageData]);


  // if (!data) {
  //   return <div>Loading...</div>;
  // }

 

  return (
    <>

       <Layout categories={categories} >
  <div className="flex justify-center">
    <div className="w-full max-w-3xl">
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          {/* <h1>{homepage.attributes.hero.title}</h1> */}
          <Articles articles={articles} />
        </div>
      </div>
    </div>
  </div>
     </Layout> 

    </>
  );
};

