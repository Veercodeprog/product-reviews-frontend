import "./blog.css";
import Articles from "../../app/components/blog/articles";
import Nav from "../components/blog/nav";
import {
  fetchArticles,
  fetchCategories,
  fetchHomepage,
  preload,
} from "../utils/strapi/strapiPreloadData";

// export const revalidate = 10;

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

// const fetchArticles = cache(async () => {
//   try {
//     const articlesRes = await fetchAPI("/articles", { populate: ["image", "category"] }, );
//     return articlesRes.data;
//   } catch (error) {
//     console.error("Error fetching articles:", error);
//     throw error;
//   }
// });

// const fetchCategories = cache(async () => {
//   try {
//     const categoriesRes = await fetchAPI("/categories", { populate: "*" });
//     return categoriesRes.data;
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     throw error;
//   }
// });

// const fetchHomepage = cache(async () => {
//   try {
//     const homepageRes = await fetchAPI("/homepage", {
//       populate: {
//         hero: "*",
//         seo: { populate: "*" },
//       },
//     });
//     return homepageRes.data;
//   } catch (error) {
//     console.error("Error fetching homepage:", error);
//     throw error;
//   }
// });
// export const preload = () => {
//   void fetchArticles();
//   void fetchCategories();
//   void fetchHomepage();
// };

export default async function Blog() {
  preload(); // Start fetching the data eagerly using the preload function

  const articleData = fetchArticles();
  const categoryData = fetchCategories();
  const homepageData = fetchHomepage();

  const articles = await articleData;
  const categories = await categoryData;
  const homepage = await homepageData;
  return (
    <>
      <Nav categories={categories} />
      <p className=" text-5xl">{articles.attributes}</p>
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="uk-section">
            <div className="uk-container uk-container-large">
              <h1>{homepage.attributes.hero.title}</h1>
              <Articles articles={articles} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
