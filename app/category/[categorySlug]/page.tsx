'use client'
import Breadcrumb from "../../components/layout/breadcrumb";
import FeaturedProductsList from "../../components/categorypage/featured-products-list";
import ProductCards from "../../components/categorypage/product-cards";
import { fetchObjectFromCategories } from "@/app/utils/dataApi";
import { useState, useEffect } from "react";
interface Category {
  name: string;
  category_description: string;
  emoji: string;
}
export default async function CategoryDescriptionPage(props:any) {
const {categorySlug} = props.params
console.log("categorySlug:",categorySlug)

  
        const unslugifiedCategoryName = unslugify(categorySlug);
        const response: Promise<Category> = await fetchObjectFromCategories(unslugifiedCategoryName, );
        const category = await response;


  function unslugify(slug:string) {
    // Replace hyphens with spaces and capitalize the first letter of each word
    const words = slug.split('-');
    const unslugified = words
      .map((word:any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return unslugified;
  }
  return (
    <>
      <main className="container mx-auto p-4  md:px-20 mt-24 ">
        <Breadcrumb />


        <section className="text-gray-700 body-font">
          <div className="container mx-auto flex px-2 py-2 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-center text-center">
              <h2 className="page-headings ">Featured products</h2>
{category && (
              <div className="para pb-5">
                <p>
                  Ready to supercharge your {category.name } skills? Check out our top
                  picks! Experience the future of {category.name } with our carefully
                  curated selection of the most innovative apps around.
                </p>
              </div>
    )}
              {/* <div className="flex justify-center">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">Button</button>
            </div> */}
            </div>
            <FeaturedProductsList />
          </div>
        </section>
        <section>
          <div
            className="btn-group flex space-x-2 my-14"
            role="group"
            aria-label="Tools"
          >
            <button
              type="button"
              className="cat-btn px-5 sm:px-8 sm:h-11  se:ml-5 sm:ml-0  bg-white text-gray-700 border border-gray-300 rounded-full text-sm mr-2 mb-2 inline-block"
            >
              Most Liked
            </button>

            <button
              type="button"
              className="cat-btn px-5 sm:px-8 h-11  se:ml-5 sm:ml-0  bg-white text-gray-700 border border-gray-300 rounded-full text-sm mr-2 mb-2 inline-block"
            >
             Recent
            </button>
          </div>
        </section>
        <section>
         <ProductCards />
<ProductCards />
         
        </section>
      </main>
    </>
  );
}
