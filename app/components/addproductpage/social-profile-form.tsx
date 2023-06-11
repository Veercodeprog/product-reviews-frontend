import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { error } from "console";
import { useFormik } from "formik";
import { FormikErrors, FormikTouched } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import { useState } from "react";

function SocialProfileForm({
  onNext,
  onPrevious,
  socialProfileData,
  setSocialProfileData,
}: {
  onNext: any;
  onPrevious: (e: React.MouseEvent<HTMLButtonElement>) => void;
  socialProfileData: any;
  setSocialProfileData: any;
}) {

  const handleAvatarImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first selected file

    if (file) {
      const fileExtension: string | undefined = file?.name
        ? file.name.split(".").pop()?.toLowerCase()
        : undefined;

      const allowedExtensions = ["png", "jpg", "jpeg"];

      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        const fileURL = URL.createObjectURL(file);
        formik.setFieldValue("avatarImg", fileURL);
        formik.setFieldValue("avatarImgFile", file); // Set the file value
        formik.setFieldError("avatarImg", ""); // Clear any previous error
   // Set the file name
      } else {
        formik.setFieldValue("avatarImg", ""); // Clear the field value
        formik.setFieldError("avatarImg", "Only PNG and JPG files are allowed"); // Set the error message
        formik.setFieldValue("avatarImgFile", null); // Set the file value

      }
    }
  };

  const validationSchema = Yup.object().shape({
    fname: Yup.string().required("First Name is required"),
    lname: Yup.string().required("Last Name is required"),
    role: Yup.string().required("Role is required"),
    bio: Yup.string().required("Bio is required"),
    workEmail: Yup.string()
      .email("Invalid email")
      .required("Work Email is required"),
    msg: Yup.string().required("Message is required"),
    linkedinUrl: Yup.string()
      .url("Invalid LinkedIn URL")
      .required("LinkedIn URL is required"),
    twitterUrl: Yup.string()
      .url("Invalid Twitter URL")
      .required("Twitter URL is required"),
    avatarImg: Yup.mixed()
      .test(
        "fileFormat",
        "Only PNG and JPG files are allowed",
        function (value) {
          if (
            typeof value === "object" &&
            value &&
            Object.keys(value).length > 0
          ) {
            const allowedExtensions = ["png", "jpg", "jpeg"];
            const fileExtension = (value as File).name
              ?.split(".")
              .pop()
              ?.toLowerCase();
            return (
              (fileExtension && allowedExtensions.includes(fileExtension)) ||
              this.createError({
                message: "Only PNG and JPG files are allowed",
              })
            );
          }
          return true; // If no file is selected, consider it as valid
        }
      )
      .required("Avatar Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      avatarImg: "",
    // Add avatarImgFile property with initial value null

      fname: "",
      lname: "",
      role: "",
      bio: "",
      workEmail: "",
      msg: "",
      linkedinUrl: "",
      twitterUrl: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

      setSocialProfileData(values);
      onNext(values);
    },
  });
  console.log("formik", formik);
  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        setSocialProfileData(formik.values);
        onNext(e, formik.values);
      } else {
        const firstErrorField = Object.keys(errors)[0];
        const errorField = document.getElementById(firstErrorField);
        if (errorField) {
          errorField.focus();
        }
      }
    });
  };

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onPrevious(e);
  };

  const handleChangeImage = () => {
    const avatarImg = document.getElementById("avatar-img");
    if (avatarImg) {
      avatarImg.click();
    }
  };

  const getErrorClassName = (fieldName: string) => {
    const errors = formik.errors as FormikErrors<typeof formik.values>;
    const touched = formik.touched as FormikTouched<typeof formik.values>;

    return errors[fieldName as keyof typeof errors] &&
      touched[fieldName as keyof typeof touched]
      ? "border-red-500"
      : "border-gray-300";
  };

  const getErrorMessage = (fieldName: string) => {
    const errors = formik.errors as FormikErrors<typeof formik.values>;
    const touched = formik.touched as FormikTouched<typeof formik.values>;
    if (fieldName === "avatarImg") {
      return (
        formik.errors.avatarImg &&
        formik.touched.avatarImg && (
          <p className="text-red-500">{formik.errors.avatarImg}</p>
        )
      );
    }

    return (
      errors[fieldName as keyof typeof errors] &&
      touched[fieldName as keyof typeof touched] && (
        <p className="text-red-500">
          {errors[fieldName as keyof typeof errors]}
        </p>
      )
    );
  };

  return (
    <>
      <div className="flex flex-row items-center mb-4">
        <label htmlFor="avatar-img" className="w-1/3 sm:w-1/6 mr-4 font-bold">
          {/* <FontAwesomeIcon icon={faImage} /> Avatar Image: */}
        </label>

        <div className="relative items-end w-1/4 h-20 sm:w-40 sm:h-40 rounded-full overflow-hidden">
          <div
            className="image-box w-full h-full bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${formik.values.avatarImg})`,
            }}
          />

          <label
            htmlFor="avatar-img"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-800"
          >
            <FontAwesomeIcon
              icon={faCloudUploadAlt}
              className="text-gray-300"
            />
            <input
              type="file"
              id="avatar-img"
              name="avatar-img"
              className={`hidden ${getErrorClassName("avatarImg")}`}
              onChange={handleAvatarImageChange}
              onBlur={formik.handleBlur} // Add onBlur event handler
            />
          </label>
        </div>
        {getErrorMessage("avatarImg") && (
          <p className="text-red-500">{getErrorMessage("avatarImg")}</p>
        )}
        <div className="ml-4">
          <button
            type="button"
            className={`justify-end next w-24 sm:w-32 bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mb-4 sm:mb-0 mr-8 ${getErrorClassName(
              "avatarImg"
            )}`}
            onClick={handleChangeImage}
            onBlur={formik.handleBlur} // Add onBlur event handler
          >
            Change
          </button>
        </div>
      </div>

      <div className="flex flex-row mb-4">
        <label htmlFor="fname" className="w-1/3 md:w-1/6 mb-2 font-bold">
          Name:
        </label>
        <input
          type="text"
          name="fname"
          id="fname"
          placeholder="First Name"
          className={`block w-1/5 mr-10 items-start px-4 py-2 border rounded-md ${getErrorClassName(
            "fname"
          )}`}
          value={formik.values.fname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Add onBlur event handler
        />
        {getErrorMessage("fname") && (
          <p className="text-red-500">{getErrorMessage("fname")}</p>
        )}
        <input
          type="text"
          name="lname"
          id="lname"
          placeholder="Last Name"
          className={`block w-1/5 items-end px-4 py-2 border border-gray-300 rounded-md ${getErrorClassName(
            "lname"
          )}`}
          value={formik.values.lname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Add onBlur event handler
        />
        {getErrorMessage("lname")}
      </div>

      <div className="flex flex-row mb-4">
        <label htmlFor="role" className="w-1/3 md:w-1/6 mb-2 font-bold">
          Role:
        </label>
        <input
          type="text"
          name="role"
          id="role"
          placeholder="Role"
          className={`block w-2/5 px-4 py-2 border border-gray-300 rounded-md ${getErrorClassName(
            "role"
          )}`}
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Add onBlur event handler
        />
        {getErrorMessage("role")}
      </div>

      <div className="flex flex-row mb-4">
        <label htmlFor="bio" className="w-1/3 md:w-1/6 mb-2 font-bold">
          Bio:
        </label>
        <textarea
          name="bio"
          id="bio"
          placeholder="Bio"
          className={`block w-2/5 px-4 py-2 border border-gray-300 rounded-md ${getErrorClassName(
            "bio"
          )}`}
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Add onBlur event handler
        ></textarea>
        {getErrorMessage("bio")}
      </div>

      <div className="flex flex-row mb-4">
        <label htmlFor="workEmail" className="w-1/3 md:w-1/6 mb-2 font-bold">
          Work Email:
        </label>
        <input
          type="email"
          name="workEmail"
          id="workEmail"
          placeholder="Work Email"
          className={`block w-2/5 px-4 py-2 border border-gray-300 rounded-md ${getErrorClassName(
            "workEmail"
          )}`}
          value={formik.values.workEmail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Add onBlur event handler
        />
        {getErrorMessage("workEmail")}
      </div>

      <div className="flex flex-row mb-4">
        <label htmlFor="msg" className="w-1/3 md:w-1/6 mb-2 font-bold">
          Message:
        </label>
        <textarea
          name="msg"
          id="msg"
          placeholder="Message"
          className={`block w-2/5 px-4 py-2 border border-gray-300 rounded-md ${getErrorClassName(
            "msg"
          )}`}
          value={formik.values.msg}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Add onBlur event handler
        ></textarea>
        {getErrorMessage("msg")}
      </div>

      <div className="flex flex-row mb-4">
        <label htmlFor="linkedinUrl" className="w-1/3 md:w-1/6 mb-2 font-bold">
          LinkedIn URL:
        </label>
        <input
          type="text"
          name="linkedinUrl"
          id="linkedinUrl"
          placeholder="LinkedIn URL"
          className={`block w-2/5 px-4 py-2 border border-gray-300 rounded-md ${getErrorClassName(
            "linkedinUrl"
          )}`}
          value={formik.values.linkedinUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Add onBlur event handler
        />
        {getErrorMessage("linkedinUrl")}
      </div>

      <div className="flex flex-row mb-4">
        <label htmlFor="twitterUrl" className="w-1/3 md:w-1/6 mb-2 font-bold">
          Twitter URL:
        </label>
        <input
          type="text"
          name="twitterUrl"
          id="twitterUrl"
          placeholder="Twitter URL"
          className={`block w-2/5 px-4 py-2 border border-gray-300 rounded-md ${getErrorClassName(
            "twitterUrl"
          )}`}
          value={formik.values.twitterUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Add onBlur event handler
        />
        {getErrorMessage("twitterUrl")}
      </div>

      <div className="flex flex-row sm:justify-end mt-10 mb-10">
        <button
          type="button"
          className="previous w-24 sm:w-32 bg-gray-500 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mb-4 sm:mb-0 mr-8"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          type="button"
          className="next w-24 sm:w-32 bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mb-4 sm:mb-0 mr-8"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default SocialProfileForm;
