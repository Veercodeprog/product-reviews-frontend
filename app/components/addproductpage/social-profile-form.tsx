import { faImage, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
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
      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="avatar-img" className="sm:col-span-1 font-bold">
          {/* <FontAwesomeIcon icon={faImage} /> Avatar Image: */}
        </label>

<div className="sm:col-span-3">
        <div className="mx-auto w-40 text-center relative mb-4">
          <div
            className="w-40 h-40 rounded-full bg-cover bg-gray-400 relative"
            style={{
              backgroundImage: `url(${formik.values.avatarImg})`,
            }}
          />

          <label
            htmlFor="avatar-img"
            className="w-40 h-40 group hover:bg-gray-200 opacity-80 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500 top-0"
          >
            <FontAwesomeIcon
              icon={faCloudUploadAlt}
              className="hidden group-hover:block text-2xl"
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
          <div className="absolute bottom-0 right-0">
          <button
            type="button"
            className={`justify-end next w-10 rounded-full h-10 bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 flex justify-center  ${getErrorClassName(
              "avatarImg"
            )}`}
            onClick={handleChangeImage}
            onBlur={formik.handleBlur} // Add onBlur event handler
          >
            <FontAwesomeIcon
              icon={faImage}
              className="w-12 self-center"
            />
          </button>
        </div>
        </div>
        {getErrorMessage("avatarImg") && (
          <p className="text-red-500">{getErrorMessage("avatarImg")}</p>
        )}
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="fname" className="sm:col-span-1 font-bold">
          Name:
        </label>

        <div className="sm:col-span-3 grid grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="First Name"
              className={`block w-full px-4 py-2 border rounded-md ${getErrorClassName(
                "fname"
              )}`}
              value={formik.values.fname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Add onBlur event handler
            />
            {getErrorMessage("fname") && (
              <p className="text-red-500 my-1 text-sm">
                {getErrorMessage("fname")}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="lname"
              id="lname"
              placeholder="Last Name"
              className={`block w-full px-4 py-2 border border-gray-300 rounded-md ${getErrorClassName(
                "lname"
              )}`}
              value={formik.values.lname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Add onBlur event handler
            />
            {getErrorMessage("lname") && (
              <p className="text-red-500 my-1 text-sm">
                {getErrorMessage("lname")}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="role" className="sm:col-span-1 font-bold">
          Role:
        </label>

        <div className="sm:col-span-3 ">
          <input
            type="text"
            name="role"
            id="role"
            placeholder="Role"
            className={`block w-full px-4 py-2 border border-gray-300 rounded-md ${getErrorClassName(
              "role"
            )}`}
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // Add onBlur event handler
          />
          {getErrorMessage("role") && (
            <p className="text-red-500 my-1 text-sm">
              {getErrorMessage("role")}
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="bio" className="sm:col-span-1 font-bold">
          Bio:
        </label>

        <div className="sm:col-span-3 ">
          <textarea
            name="bio"
            id="bio"
            placeholder="Bio"
            className={`block w-full px-4 py-2 border border-gray-300 rounded-md ${getErrorClassName(
              "bio"
            )}`}
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // Add onBlur event handler
          ></textarea>
          {getErrorMessage("bio") && (
            <p className="text-red-500 my-1 text-sm">
              {getErrorMessage("bio")}
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="workEmail" className="sm:col-span-1 font-bold">
          Work Email:
        </label>

        <div className="sm:col-span-3 ">
          <input
            type="email"
            name="workEmail"
            id="workEmail"
            placeholder="Work Email"
            className={`block w-full px-4 py-2 border border-gray-300 rounded-md ${getErrorClassName(
              "workEmail"
            )}`}
            value={formik.values.workEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // Add onBlur event handler
          />
          {getErrorMessage("workEmail") && (
            <p className="text-red-500 my-1 text-sm">
              {getErrorMessage("workEmail")}
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="msg" className="sm:col-span-1 font-bold">
          Message:
        </label>

        <div className="sm:col-span-3 ">
          <textarea
            name="msg"
            id="msg"
            placeholder="Message"
            className={`block w-full px-4 py-2 border border-gray-300 rounded-md ${getErrorClassName(
              "msg"
            )}`}
            value={formik.values.msg}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // Add onBlur event handler
          ></textarea>
          {getErrorMessage("msg") && (
            <p className="text-red-500 my-1 text-sm">
              {getErrorMessage("msg")}
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="linkedinUrl" className="sm:col-span-1 font-bold">
          LinkedIn URL:
        </label>

        <div className="sm:col-span-3 ">
          <input
            type="text"
            name="linkedinUrl"
            id="linkedinUrl"
            placeholder="LinkedIn URL"
            className={`block w-full px-4 py-2 border border-gray-300 rounded-md ${getErrorClassName(
              "linkedinUrl"
            )}`}
            value={formik.values.linkedinUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // Add onBlur event handler
          />
          {getErrorMessage("linkedinUrl") && (
            <p className="text-red-500 my-1 text-sm">
              {getErrorMessage("linkedinUrl")}
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <label htmlFor="twitterUrl" className="sm:col-span-1 font-bold">
          Twitter URL:
        </label>

        <div className="sm:col-span-3 ">
          <input
            type="text"
            name="twitterUrl"
            id="twitterUrl"
            placeholder="Twitter URL"
            className={`block w-full px-4 py-2 border border-gray-300 rounded-md ${getErrorClassName(
              "twitterUrl"
            )}`}
            value={formik.values.twitterUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // Add onBlur event handler
          />
          {getErrorMessage("twitterUrl") && (
            <p className="text-red-500 my-1 text-sm">
              {getErrorMessage("twitterUrl")}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4 flex-row flex-wrap sm:justify-end mt-10 mb-10 pb-10">
        <button
          type="button"
          className="previous w-24 sm:w-32 bg-gray-500 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mb-4 sm:mb-0 "
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          type="button"
          className="next w-24 sm:w-32 bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mb-4 sm:mb-0 "
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default SocialProfileForm;
