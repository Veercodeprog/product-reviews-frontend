
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
// Example API function for fetching categories
export async function fetchCategories() {
  const response = await fetch(`${baseUrl}/admin/category`);
  const data = await response.json();
  return data;
}

// // Example API function for adding a product
// export async function addProduct(productData) {
//   const response = await fetch(`${API_BASE_URL}/admin/products`, {
//     method: 'POST',
//     body: JSON.stringify(productData),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const data = await response.json();
//   return data;
// }

// Add more API functions as per your admin UI requirements
