import { getStrapiMedia } from "@/app/utils/media";
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
  // className="w-1/2 h-1/2"
  width={width}
  height={height}


/>

    
  );
};

export default ImageNext;
