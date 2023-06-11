import SessionManager from "@/app/utils/session";
import { useEffect, useState } from "react";

import { AddProductToDb, addProductFounder } from "@/app/utils/postDataApi";

type UserType = {
  claims: {
    id: number;
    name: string;
    role: string;
    email: string;
  };
  uid: string;
  // Add other properties as needed
};
function AccountSetup({
  onNext,
  onPrevious,
  personalProfileFormData,
  socialProfileFormData,
}: {
  onNext: any;
  onPrevious: (e: React.MouseEvent<HTMLButtonElement>) => void;
  personalProfileFormData: any;
  socialProfileFormData: any;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [addProductMessage, setAddProductMessage] = useState("");
const [addFounderMessage, setAddFounderMessage] = useState("");
  const personalFormData = personalProfileFormData;
  const socialFormData = socialProfileFormData;

  const handleProductSubmit = async () => {

    if (user) {
      // console.log("user logged in alrastbjd:", user.uid);
      const { uid } = user;

   
      //  const {  ...product } = personalProfileFormData;

      try {
        const result = await AddProductToDb(personalFormData, uid);

        setAddProductMessage(result.message);
console.log("result.productId",result)
        return result.productId;
      } catch (error) {
        alert("product add failed" + error);
        // Handle the error as neededP
      }
    } else {
      // User is not logged in, display a message to prompt login
      alert("Please login to add a product.");
      // You can also redirect the user to the login page
      // or show a modal with login options
    }
  };
console.log("socialFormData",socialFormData)
  const handleFounderSubmit = async (productId:number) => {

    if (user) {
      const { uid } = user;
      try {
        const result = await addProductFounder(
          socialFormData,
          productId,
          uid
        );

        setAddFounderMessage(result.message);
      } catch (error) {
        alert("Founder not added " + error);
        // Handle the error as needed
      }
    } else {
      // User is not logged in, display a message to prompt login
      alert("Please login to add a founder.");
      // You can also redirect the user to the login page
      // or show a modal with login options
    }
  };
const handleSubmit = async (event:any) => {
event.preventDefault();
  const addedProductId = await handleProductSubmit();

  await handleFounderSubmit(addedProductId);

};

  // ...

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onNext(e);
  };

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onPrevious(e);
  };

  return (
    <>
      <SessionManager updateUser={setUser} setLoading={setLoading} />
      {addProductMessage && <p className="text-green-500 text-xl mb-10">{addProductMessage}</p>}
      {addFounderMessage && <p className="text-green-500 text-xl mb-10">{addFounderMessage}</p>}
      <div>
        <div>
          <h3 className="text-lg font-bold">Personal Details</h3>
          <ul className="mt-4">
            {Object.entries(personalFormData).map(
              ([key, value]: [key: any, value: any]) => {
                if (key === "category") {
                  const { id, name } = value;
                  return (
                    <li key={key} className="flex items-center mb-2 ">
                      <span className="font-medium mr-2 w-40 h-20">
                        Category:
                      </span>
                      <span className="w-40 h-20">{`${name} (${id})`}</span>
                    </li>
                  );
                }

                if (key === "productIconFile" || key === "screenshotFiles") {
                  return null;
                }
                return (
                  <li key={key} className="flex items-center mb-7">
                    <span className="font-medium mr-2 w-40 h-20">{key}:</span>
                    {key === "productIcon" ? (
                      <img
                        src={value as string}
                        alt={key}
                        className="w-40 h-20"
                      />
                    ) : key === "screenshots" ? (
                      Array.isArray(value) ? (
                        value.map((imageUrl, index) => (
                          <img
                            key={index}
                            src={imageUrl}
                            alt={`Screenshot ${index + 1}`}
                            className="w-40 h-20 mx-3"
                          />
                        ))
                      ) : (
                        <img
                          src={value as string}
                          alt={key}
                          className="w-40 h-20"
                        />
                      )
                    ) : (
                      <span className="w-40 h-20">{value as string}</span>
                    )}
                  </li>
                );
              }
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold">Social Profile Information</h3>
          <ul className="mt-4">
            {Object.entries(socialFormData).map(([key, value]) => (
              <li key={key} className="flex items-center mb-2 w-40 h-20">
                <span className="font-medium mr-2 w-40 h-20">{key}:</span>
                {key === "avatarImg" ? (
                  <img src={value as string} alt={key} className="w-40 h-20" />
                ) : key === "avatarImgFile" ? null : ( // Return null for avatarImgFile
                  <span className="w-40 h-20">{value as string}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* <p>Product Name: {personalFormData.productName}</p> */}
        {/* <p>Short Description: {personalFormData.shortDescription}</p> */}
      </div>

      <div></div>
      <div className="flex  flex-row sm:justify-end mt-10 mb-10">
        <button
          type="button"
          name="previous"
          className="previous w-24 sm:w-32 bg-gray-500 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mb-4 sm:mb-0 mr-8"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          type="submit"
          name="submit"
          className="next w-24  sm:w-32 bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mb-4 sm:mb-0 mr-8"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default AccountSetup;
