import axios from "axios";
import { cache } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getAllProductsName = cache(async () => {
try {
 const response = await axios.get(`${baseUrl}/getAllProductName`);

    // console.log(response); // Example: log the category to the console
    
    return response.data;
    
}catch (error){
console.error(error);
}

})
export const getAllCategoriesName = cache(async () => {
  try {
    const response = await axios.get(`${baseUrl}/getAllCategoryName`);
    
  //  console.log(response.data); // Example: log the category to the console
    
    return response.data;// You can return the category or perform additional operations as needed
    
  } catch (error) {
    // Handle any errors here
    console.error("api error:",error);
  }
});



export const fetchObjectFromProducts = cache(async(suggestion:any)=>{
try {
    const response = await axios.get(`${baseUrl}/getSearchProduct?suggestion=${suggestion}`);
    
   console.log(response.data); // Example: log the category to the console
    
    return response.data;// You can return the category or perform additional operations as needed
    
  } catch (error) {
    // Handle any errors here
    console.error("product api error:",error);
  }
})

export const fetchObjectFromCategories = cache(async(suggestion: any)=>{
try {
    const response = await axios.get(`${baseUrl}/getSearchCategory?suggestion=${suggestion}`);
    
   console.log(response.data); // Example: log the category to the console
    
    return response.data;// You can return the category or perform additional operations as needed
    
  } catch (error) {
    // Handle any errors here
    console.error("category api error:",error);
  }
})

export const getAllPopularNowAdmin = async () => {
try {
    const response = await axios.get(`${baseUrl}/getAllPopularNowAdmin`);
    
   console.log(response.data); // Example: log the category to the console
    
    return response.data;// You can return the category or perform additional operations as needed
    
  } catch (error) {
    // Handle any errors here
    console.error("api error:",error);
  }
}