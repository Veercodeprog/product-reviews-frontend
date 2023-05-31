"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { getAllCategoriesName } from "@/app/utils/dataApi";
import { getAllProductsName } from "@/app/utils/dataApi";
import { faBinoculars, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  fetchObjectFromCategories,
  fetchObjectFromProducts,
} from "@/app/utils/dataApi";
import Autosuggest from "react-autosuggest";
import { useRouter } from "next/navigation";
import slugify from "slugify";

export default function SearchInput() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    // Fetch all products and categories from the server
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProductsName();
      const products = response;
      setProducts(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getAllCategoriesName();
      const categories = response;
      console.log("categories name:", response);
    const categoryNames = response.map((category:any )=> category.name);
    console.log("category names:", categoryNames);
      setCategories(categoryNames);
    } catch (error) {
      console.error(error);
    }
  };

  const getSuggestions = (inputValue: any) => {
    const inputValueLower = inputValue.toLowerCase();
    const productSuggestions = products.filter((product: any) =>
      product.toLowerCase().includes(inputValueLower)
    );
    const categorySuggestions = categories.filter((category: any) =>
      category.toLowerCase().includes(inputValueLower)
    );

    // Combine and return the suggestions
    return [...productSuggestions, ...categorySuggestions];
  };

  const getSuggestionValue = (suggestion: any) => suggestion;
  const renderSuggestion = (suggestion: any) => <div>{suggestion}</div>;

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    const newSuggestions = getSuggestions(value);
    setSuggestions(newSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = async (
    event: React.FormEvent<any>,
    { suggestion }: { suggestion: string }
  ) => {
    try {
      let response;
      if (products.includes(suggestion)) {
        // Selected suggestion is from products array
        // const response = await fetchObjectFromProducts(suggestion);
        const productSlug = suggestion
          ? slugify(suggestion, { lower: true })
          : "";

        router.push(`/products/${productSlug}`);
      } else if (categories.includes(suggestion)) {
        // Selected suggestion is from categories array
        const categorySlug = suggestion
          ? slugify(suggestion, { lower: true })
          : "";

        router.push(`/category/${categorySlug}`);
      } else {
        // Invalid suggestion or not found in either array
        throw new Error("Invalid suggestion");
      }
      // console.log('Fetched object:', response);
      // Handle the fetched object from the server here
      // setSelectedData(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (
    event: React.FormEvent<any>,
    { newValue }: { newValue: string }
  ) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Search",
    value,
    onChange,
    className:
      "w-full pl-12 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent",

  };

  return (
    <div className="search-input">
      

      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected} // Add the onSuggestionSelected event handler
        inputProps={inputProps}
        highlightFirstSuggestion={true}
      />
      <div className="absolute top-3 left-3">
        <FontAwesomeIcon icon={faSearch} size="lg" />
      </div>
    </div>
  );
}
// export async function getStaticProps() {
//   let products = [];
//   let categories = [];

//   try {
//     const productsResponse = await getAllProductsName();
//     products = productsResponse;

//     const categoriesResponse = await getAllCategoriesName();
//     categories = categoriesResponse;
//   } catch(e){
// console.log(e)
// }

// }
