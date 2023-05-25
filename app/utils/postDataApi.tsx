import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const addproduct = async (product: any) => {
try {
 const response = await axios.get(`${baseUrl}/getAllProductName`);
}catch (error){
console.error(error);
}

}