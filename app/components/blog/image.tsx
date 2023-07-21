import { getStrapiMedia } from "@/app/utils/strapi/media";
import Image from "next/image";

const ImageNext = ({ image }: { image: any }) => {
  const { alternativeText, width, height } = image;
const url = image;  
const imageUrl = getStrapiMedia(image);
console
  return (
    
   <img
  src={imageUrl}
  alt={alternativeText || ""}
  // layout="responsive"
  className="w-full aspect-video object-cover"
  width={width || 0} // Provide a default width value if it's not available
  height={height || 0} // Provide a default height value if it's not available
/>

    
  );
};

export default ImageNext;
