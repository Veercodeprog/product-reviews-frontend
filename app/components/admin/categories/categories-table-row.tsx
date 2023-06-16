"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { updateCategory } from "@/app/utils/postDataApi";
export const CategoriesTableRow = ({ categories }: any) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(categories.name);
  const [description, setDescription] = useState(
    categories.category_description
  );
  const [emoji, setEmoji] = useState(categories.emoji);
  const [categoryFeatured, setCategoryFeatured] = useState(
    categories.category_featured
  );
  console.log("categories", categories);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const handleChangeCategoryFeatured = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedProductIds = selectedOptions.map((option) =>
      parseInt(option.value)
    );

    // Check if the clicked option is already selected
    const clickedProductId = parseInt(e.target.value);
    const isAlreadySelected = selectedProducts.includes(clickedProductId);

    // Update the selected products based on the clicked option
    if (isAlreadySelected) {
      // If the clicked option is already selected, remove it from the selected products
      const updatedSelectedProducts = selectedProducts.filter(
        (productId) => productId !== clickedProductId
      );
      setSelectedProducts(updatedSelectedProducts);
    } else {
      // If the clicked option is not selected, add it to the selected products
      const updatedSelectedProducts = [...selectedProducts, clickedProductId];
      setSelectedProducts(updatedSelectedProducts);
    }
  };

  useEffect(() => {
    console.log("selectedProducts", selectedProducts);
  }, [selectedProducts]);

  // console.log("categories", categories);
  const handleEdit = () => {
    setEditMode(true);
  };
  useEffect(() => {
    setName(categories.name);
    setDescription(categories.category_description);
    setEmoji(categories.emoji);
    setCategoryFeatured(categories.category_featured);
  }, [
    categories.name,
    categories.category_description,
    categories.emoji,
    categories.category_featured,
  ]);

  //  useEffect(() => {
  //     setDisplayText(popular.display_text);
  //     setHyperlink(popular.hyperlink);
  //   }, [popular.display_text, popular.hyperlink]);
  const handleUpdate = async (event: any) => {
    event.preventDefault();
    try {
      const response = await updateCategory(
        categories.category_id,
        name,
        description,
        emoji,
        selectedProducts
      );
      const updatedCategory = response;
      console.log("updatedCategory", updatedCategory);

      setEditMode(false);
      categories.name = name;
      categories.category_description = description;
      categories.emoji = emoji;
      categories.category_featured = updatedCategory.category_featured;
      setCategoryFeatured(updatedCategory.category_featured);

      return response.data;
    } catch (err) {
      console.log(err);
    }

    // Disable edit mode after updating
  }; // Perform the update request using Prisma or your preferred method
  // Update the values in the table based on the updated state variables

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleChangeEmoji = (e: ChangeEvent<HTMLInputElement>) => {
    setEmoji(e.target.value);
  };

  return (
    <>
      <tr>
        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
          <span className="font-semibold">{categories.category_id}</span>
        </td>
        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
          {editMode ? (
            <input
              type="text"
              value={name}
              onChange={handleChangeName}
              className="input-field h-full  ring-2 ring-purple-900"
            />
          ) : (
            <span className="font-semibold">{categories.name}</span>
          )}
        </td>
        <td className="p-4 whitespace-nowrap w-1/2 text-sm font-semibold text-gray-900">
          {editMode ? (
            <textarea
              value={description}
              onChange={handleChangeDescription}
              className="ring-2 ring-purple-900 w-full h-full"
            />
          ) : (
            <p className="whitespace-pre-line">
              {categories.category_description}
            </p>
          )}
        </td>
        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
          {editMode ? (
            <input
              type="text"
              value={emoji}
              onChange={handleChangeEmoji}
              className="ring-2 ring-purple-900 w-full h-full "
            />
          ) : (
            categories.emoji
          )}
        </td>
        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
          {editMode ? (
            <div>
              <select
                value={selectedProducts.map(String)}
                onChange={handleChangeCategoryFeatured}
                className="ring-2 ring-purple-900 w-full h-full"
                multiple
              >
                {categories.products.map(
                  (product: { product_id: number; name: string }) => {
                    const isProductSelected = selectedProducts.includes(
                      product.product_id
                    );
                    return (
                      <option
                        key={product.product_id}
                        value={String(product.product_id)}
                        selected={isProductSelected}
                      >
                        {product.name}
                      </option>
                    );
                  }
                )}
              </select>

              <div className="mt-2">
                Selected Products:
                <input
                  type="text"
                  value={selectedProducts
                    .map((productId) => {
                      const product = categories.products.find(
                        (product: any) => product.product_id === productId
                      );
                      return product ? product.name : "";
                    })
                    .join(", ")}
                  className="input-field h-full ring-2 ring-purple-900"
                  readOnly
                />
              </div>
            </div>
          ) : (
            categories.category_featured.join(", ")
          )}
        </td>
        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
          {editMode ? (
            <button
              className="sm:inline-flex ml-5 text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center "
              onClick={handleUpdate}
            >
              Update
            </button>
          ) : (
            <button
              className=" sm:inline-flex ml-5 text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center "
              onClick={handleEdit}
            >
              Edit
            </button>
          )}{" "}
        </td>
      </tr>
    </>
  );
};
