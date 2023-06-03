import axios from 'axios';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import { signOutUser } from './auth';

export const postCommentFirestore = async (commentData:any) => {
  try {
    const response = await axios.post(`${baseUrl}/addComment`, { comment: commentData}, { withCredentials: true });

    return response.data.message;
  } catch (error:any) {
    console.error('Error posting comment:', error);
 if (error.response && error.response.status === 401) {
      // Call handleLogout to perform the logout actions
      await signOutUser();
console.log("mid",error.response.data.error);
return error.response.data.error;
    }
  }
  
  return null;
};

export const getAllArticleComments = async (articleId: any) => {
  try {
      const response = await axios.get(`${baseUrl}/getCommentsByArticle?blogId=${articleId}`);

    return response.data;
  } catch (error) {
    console.error('Error getting comments:', error);
  }

  return null;
};
