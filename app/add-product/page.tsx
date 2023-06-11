"use client";
import { useState } from "react";
import PersonalDetailsForm from "../components/addproductpage/personal-details-form";
import SocialProfileForm from "../components/addproductpage/social-profile-form";
import AccountSetup from "../components/addproductpage/account-setup-data";

function AddProductPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [personalFormData, setPersonalFormData] = useState({});
  const [socialProfileData, setSocialProfileData] = useState({});

  const handleClick = (e: unknown) => {
    (e as React.MouseEvent).preventDefault();
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentStep(currentStep - 1);
  };

  const handlePersonalDetailsNext = (e: any, data: any) => {
    setPersonalFormData(data);
    setCurrentStep(currentStep + 1);
  };

  const handleSocialProfilesNext = (e: any, data: any) => {
    setSocialProfileData(data);
    setCurrentStep(currentStep + 1);
  };

  // function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
  //   const file = event.target.files?.[0];
  //   if (!file) return;
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const imgBox = document.querySelector(".image-box") as HTMLElement;
  //     imgBox.style.backgroundImage = `url(${e.target?.result})`;
  //   };
  //   reader.readAsDataURL(file);
  // }
  const renderCircle = (stepNum: number, formName: string) => {
    const isActive = currentStep === stepNum;

    return (
      <div className="flex flex-col items-center">
        <div
          className={`flex items-center justify-center ${
            isActive
              ? "bg-purple-800"
              : stepNum < currentStep
              ? "bg-purple-800"
              : "bg-gray-300"
          } rounded-full border border-purple-800 w-10 h-10 mb-2`}
        >
          <span
            className={`text-sm font-bold ${
              isActive || stepNum < currentStep
                ? "text-white"
                : "text-purple-800"
            }`}
          >
            {stepNum}
          </span>
        </div>
        <span className="sm:text-xs text-xs text-center">{formName}</span>
      </div>
    );
  };
  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="page-headings text-left mb-8">Add a Product</h2>
      <div className="flex items-center w-3/4 sm:w-1/2  mb-4">
        {renderCircle(1, "Product Details")}
        <div
          className={`flex-1 h-1 ${
            currentStep >= 2 ? "bg-purple-800" : "bg-gray-300"
          } mb-4 -ml-6	 -mx-5`}
          style={{ marginTop: "-0.5rem" }}
        />

        {renderCircle(2, "Team Details")}
        <div
          className={`flex-1 h-1 ${
            currentStep >= 3 ? "bg-purple-800" : "bg-gray-300"
          } mb-4 mt-2  -mx-5`}
          style={{ marginTop: "-0.5rem" }}
        />
        {renderCircle(3, "Submit")}
      </div>
      <form
        id="msform"
        className="container mx-auto p-4  md:px-10 md:pr-10 mt-16 "
      >
        {/* fieldsets */}
        <fieldset className={`relative ${currentStep !== 1 && "hidden"}`}>
          <PersonalDetailsForm
 
            onNext={handlePersonalDetailsNext}
            onPrevious={handlePrevious}
          />
        </fieldset>

        <fieldset className={`relative ${currentStep !== 2 && "hidden"}`}>
          <SocialProfileForm
            socialProfileData={socialProfileData}
            setSocialProfileData={setSocialProfileData}
            onNext={handleSocialProfilesNext}
            onPrevious={handlePrevious}
          />
        </fieldset>
        <fieldset className={`relative ${currentStep !== 3 && "hidden"}`}>
          {/* <h2 className="fs-title">Account Setup</h2>
        <h3 className="fs-subtitle">Create your account</h3> */}

          <AccountSetup
          personalProfileFormData={personalFormData}
          socialProfileFormData={socialProfileData}
            onNext={handleClick}
            onPrevious={handlePrevious}
          />
        </fieldset>
      </form>
    </div>
  );
}

export default AddProductPage;
