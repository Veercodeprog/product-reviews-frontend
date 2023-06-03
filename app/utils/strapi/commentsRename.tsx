// import { fetchAPI } from "./strapiApi";
// import { cache } from "react";

// import axios from "axios";
// export const postComment = async (collectionName, contentTypeName, entityId, commentData) => {
//   try {
// const baseURLLocal = 'http://localhost:1337';
//     const baseURL = 'https://strapi-backend-v6ln.onrender.com';
// const url = `${baseURLLocal}/api/comments/api::${collectionName}.${contentTypeName}:${entityId}`;
// // api/comments/<contentType>:<contentId>
// // // /api/comments/:relation
// //  const url = `${baseURLLocal}/api/comments/article:1`;
//     const response = await fetch(url, {
//       method: 'POST',
//       body: JSON.stringify(commentData),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       const comment = await response.json();
//       return comment;
//     } else {
//       console.error('Error posting comment:', response.statusText);
//       throw new Error('Failed to post comment');
//     }
//   } catch (error) {
//     console.error('Error posting comment:', error);
//     throw error;
//   }
// };
