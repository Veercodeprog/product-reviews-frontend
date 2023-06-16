"use client";
import { useState, useEffect } from "react";
import { updatePopularNowTextAndLink } from "@/app/utils/postDataApi";
export default function PopularNowTableRow({
  popular,
  activePopularOn,
  activePopularOff,
}: {
  popular: any;
  activePopularOn: any;
  activePopularOff: any;
}) {
  const [isActive, setIsActive] = useState(popular.is_active);
  const [editMode, setEditMode] = useState(false);
  const [displayText, setDisplayText] = useState(popular.display_text);
  const [hyperlink, setHyperlink] = useState(popular.hyperlink);
  useEffect(() => {
    setDisplayText(popular.display_text);
    setHyperlink(popular.hyperlink);
  }, [popular.display_text, popular.hyperlink]);
  useEffect(() => {
    setIsActive(popular.is_active);
  }, [popular.is_active]);
  const setActive = async (id: any) => {
    try {
      const response = await activePopularOn(id);
      console.log(response);
      setIsActive(response);
    } catch (err) {
      console.log(err);
    }
  };

  const setInactive = async (id: any) => {
    try {
      const response = await activePopularOff(id);
      console.log(response);
      setIsActive(response);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = async (event: any) => {
    event.preventDefault();
    try {
      const response = await updatePopularNowTextAndLink(
        popular.popular_now_id,
        displayText,
        hyperlink
      );
      popular.display_text = displayText;
      popular.hyperlink = hyperlink;
    } catch (err) {
      console.log(err);
    }

    setEditMode(false); // Disable edit mode after updating
  };
  return (
    <>
      <tr>
        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
          {/* Payment from{" "} */}
          <span className="font-semibold">{popular.name}</span>
        </td>
        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
          {editMode ? (
            <input
              type="text"
              value={displayText}
              onChange={(e) => setDisplayText(e.target.value)}
              className="ring-2 ring-purple-900"
            />
          ) : (
            <span>{popular.display_text}</span>
          )}{" "}
        </td>

        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
          <div className="flex items-center justify-center">
            <button
              className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isActive
                  ? "bg-blue-500 hover:bg-blue-700 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => {
                if (isActive) {
                  console.log("already active");
                } else {
                  setActive(popular.popular_now_id);
                }
              }}
            >
              On
            </button>
            <button
              className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isActive
                  ? "bg-white text-black"
                  : "bg-blue-500 hover:bg-blue-700 text-white"
              }`}
              onClick={() => {
                if (isActive) {
                  setInactive(popular.popular_now_id);
                } else {
                  console.log("already inactive");
                }
              }}
            >
              Off
            </button>
          </div>
        </td>
        <td className="p-4  whitespace-nowrap text-sm font-semibold text-gray-900 ">
          {" "}
          {editMode ? (
            <input
              type="text"
              value={hyperlink}
              onChange={(e) => setHyperlink(e.target.value)}
              className="ring-2 ring-purple-900 w-full h-full "
            />
          ) : (
            <span>{popular.hyperlink}</span>
          )}{" "}
        </td>
        <td className="p-4 mx-5 whitespace-nowrap text-sm font-semibold text-gray-900">
          {editMode ? (
            <button
              className="sm:inline-flex ml-5 text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center "
              onClick={handleUpdate}
            >
              Update
            </button>
          ) : (
            <button
              className=" sm:inline-flex ml-5 text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3"
              onClick={handleEdit}
            >
              Edit
            </button>
          )}{" "}
        </td>
      </tr>
    </>
  );
}
