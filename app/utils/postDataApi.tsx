import axios from "axios";
import { signOutUser } from "./auth";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const uploadImagesToCloudinary = async (files: any) => {
  const uploadedImageUrls = [];

  for (const file of files) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "product_rev");
      formData.append("folder", "product-reviews-app");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnd0u1l0f/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;
      uploadedImageUrls.push(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  return uploadedImageUrls;
};

export const AddProductToDb = async (product: any, uid: any) => {
  try {
    const {
      productName,
      shortDescription,
      productIconFile,
      webUrl,
      overview,
      features,
      screenshotFiles,
      videoUrl,
      category,
      tags,
    } = product;

    const productIcon = await uploadImagesToCloudinary([productIconFile]);
    const screenshots = await uploadImagesToCloudinary(screenshotFiles);
    console.log("productIcon", productIcon);
    console.log("screenshots", screenshots);
    const requestData = {
      name: productName,
      short_description: shortDescription,
      icon: productIcon,
      webUrl: webUrl,
      overview: overview,
      features: features,
      screenshots_images: screenshots,
      video_url: videoUrl,
      user_id: uid,
      category_id: category.id,
      tags: tags,
    };

    const response = await axios.post(`${baseUrl}/addProduct`, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(error.message);
    console.error(error.response);
    throw new Error("Failed to add product to the database");
  }
};

export const addProductFounder = async (
  socialDetails: any,
  productId: any,
  uid: any
) => {
  console.log("socialDetails", socialDetails);
  try {
    const {
      avatarImgFile,
      bio,
      fname,
      lname,
      linkedinUrl,
      msg,
      role,
      twitterUrl,
      workEmail,
    } = socialDetails;

    const name = fname + " " + lname;
    const socialLinks = linkedinUrl + " ," + twitterUrl;
    const avatarUrl = await uploadImagesToCloudinary([avatarImgFile]);

    const requestData = {
      team_memeber_id: uid,
      product_id: productId,
      profile_pic: avatarUrl,
      name: name,
      role: role,
      bio: bio,
      message: msg,
      work_email: workEmail,
      social_links: socialLinks,
    };

    const response = await axios.post(
      `${baseUrl}/addProductFounder`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("add Founder response", response.data);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    console.error(error.response);
    throw new Error("Failed to add Founder of the Product");
  }
};

export const addProductReviews = async (reviewData: any) => {
  try {
    const response = await axios.post(
      `${baseUrl}/addReview`,
      { review: reviewData },
      { withCredentials: true }
    );
    return response.data.review;
  } catch (error: any) {
    console.error("Error posting Review:", error);
    if (error.response && error.response.status === 401) {
      // Call handleLogout to perform the logout actions
      await signOutUser();
      console.log("mid", error.response.data.error);
      return error.response.data.error;
    }
  }
};

export const getAllReviewByProduct = async (productId: any) => {
  try {
    const response = await axios.get(
      `${baseUrl}/getAllReviewByProduct?product_id=${productId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error getting comments:", error);
  }

  return null;
};

export const addProductLikes = async (userId: string, productId: number) => {
  try {
    const response = await axios.post(`${baseUrl}/addProductLikes`, {
      userId,
      productId,
    });

    return response.data;
  } catch (error) {
    console.error("Error Liking product:", error);
  }

  return null;
};

export const removeProductLikes = async (userId: string, productId: number) => {
  try {
    const response = await axios.post(`${baseUrl}/removeProductLikes`, {
      userId,
      productId,
    });

    return response.data;
  } catch (error) {
    console.error("Error remove liking :", error);
  }

  return null;
};

export const getAllLikesByProduct = async (productId: number) => {
  try {
    const response = await axios.get(
      `${baseUrl}/productLikes?product_id=${productId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error getting number likes:", error);
  }

  return null;
};
export const setPopularNowActive = async (id: number) => {
  try {
    const response = await axios.post(`${baseUrl}/setPopularNowActive`, {
      id,
    });

    return response.data;
  } catch (error) {
    console.error("Error setting popular now:", error);
  }

  return null;
};

export const setPopularNowInactive = async (id: number) => {
  try {
    const response = await axios.post(`${baseUrl}/setPopularNowInactive`, {
      id,
    });

    return response.data;
  } catch (error) {
    console.error("Error setting popular now:", error);
  }
  return null;
};

export const updatePopularNowTextAndLink = async (
  id: number,
  text: string,
  link: string
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/updatePopularNowTextAndLink`,
      {
        id,
        text,
        link,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error setting popular now:", error);
  }
  return null;
};

export const getAllCategoriesData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getAllCategoriesData`);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error getting categories:", error);
  }

  return null;
};

export const updateCategory = async (
  id: number,
  name: string,
  description: string,
  emoji: string,
  category_featured: any
) => {
  try {
    const response = await axios.post(`${baseUrl}/updateCategory`, {
      id,
      name,
      description,
      emoji,
      category_featured,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
  }
  return null;
};

export const getAllReviews = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getAllReviews`);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error getting reviews:", error);
    return null;
  }
};


export const deleteReviewById = async (id: number) => {
  try {
    const response = await axios.post(`${baseUrl}/deleteReviewById`, {
      id,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
  }
  return null;
}

export const featuredAppsHomepageAdmin  = async () => {;
 try {
    const response = await axios.get(`${baseUrl}/featuredAppsHomepageAdmin`);
    console.log("response", response);
    return response.data;
     } catch (error) {
    console.error("Error getting featured apps:", error);
    return null;
    }
}

export const isOnHomepagetrue  = async (id: number) => {
  console.log("id", id);
  try {
    const response = await axios.post(`${baseUrl}/productIsOnHomepageTrue`, {
      id,
    });

    return response.data;
  } catch (error) {
    console.error("Error setting popular now:", error);
  }
  return null;
};

export const isOnHomepagefalse  = async (id: number) => {
    try {
        const response = await axios.post(`${baseUrl}/productIsOnHomepageFalse`, {
        id,
        });
    
        return response.data;
    } catch (error) {
        console.error("Error setting popular now:", error);
    }
    return null;
    }

    export const deleteProductById = async (id: number) => {
        try {
            const response = await axios.post(`${baseUrl}/deleteProductById`, {
            id,
            });
        
            return response.data;
        } catch (error) {
            console.error("Error deleting product:", error);
        }   
        return null;
        }
