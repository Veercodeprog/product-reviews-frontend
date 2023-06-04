import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const AddProductToDb = async (product: any, uid:any) => {

  try {
    const {
      productName,
      shortDescription,
      productIcon,
      webUrl,
      overview,
      features,
      screenshots,
      videoUrl,
      category,
      tags
		} = product;
    const iconFile = await fetch(productIcon);
    const iconBlob = await iconFile.blob();
    const iconFileObj = new File([iconBlob], 'icon.png');

    // Convert the screenshots blob URLs to files
    const screenshotFiles = await Promise.all(
      screenshots.map(async (screenshotUrl:any ) => {
        const screenshotFile = await fetch(screenshotUrl);
        const screenshotBlob = await screenshotFile.blob();
        return new File([screenshotBlob], 'screenshot.png');
      })
    );

console.log('productName:', productName);
    console.log('shortDescription:', shortDescription);
 console.log('productIcon:', iconFileObj);
console.log('webUrl:', webUrl);
console.log('overview:', overview);
console.log('features:', features);
console.log('screenshots:', screenshotFiles);
    console.log('videoUrl:', videoUrl);
    console.log('category:', category);
    console.log('tags:', tags);
	console.log('uid:', uid);
   const formData = new FormData();
 formData.append('name', productName);
    formData.append('short_description', shortDescription);
formData.append('icon', iconFileObj, 'icon.png');
 // Assuming productIcon is a File object

    // Append other fields to the formData as needed
    formData.append('webUrl', webUrl);
    formData.append('overview', overview);
    formData.append('features', features);
screenshotFiles.forEach((file, index) => {
  formData.append('screenshots_images', file, `screenshot_${index}.png`);
});
formData.append('video_url', videoUrl);
formData.append('user_id', uid);
formData.append('category_id', category.id);
formData.append('tags', tags);

     const response = await axios.post(`${baseUrl}/addProduct`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      },
    });


    return response.data;
  } catch (error:any) {
  console.error(error.message);
console.error(error.response);
    throw new Error("Failed to add product to the database");
  }
};

export const productReviews = async () => {

}