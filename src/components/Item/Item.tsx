"use client";
import React from "react";
import { FcViewDetails } from "react-icons/fc";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import recipeImg from "../../../public/images/pizza-img.jpg";
import { RecipeProps } from "@/interface/interface";
import Link from "next/link";
import { url } from "../../utils/data";
import axios from "axios";

const Item: React.FC<RecipeProps> = ({ recipe }) => {
  const { _id, title, imageUrl, ingredients, instructions } = recipe;



  const handleDelete = () => {
    const userConfirm = window.confirm("Are you sure you want to delete");
    if (userConfirm) {
     const response =  axios
        .delete(`${url}/api/recipes/${_id}`)
        response.then((res) => {
          if (res.status === 204) {
            alert("Recipe deleted successfully");
            window.location.reload();
          }
        })
        .catch((error) =>
          alert("Failed to delete recipe due to network error")
        );
    } else {
      alert(`cancel deleting recipe`);
    }
  };

  return (
    <>
      <div
        className="recipeContainer flex flex-col gap-2 w-[30%]  min-h-[15vh] border-2 rounded-md p-4"
        key={recipe._id}
      >
        <div className="border-[1px]y border-blacky w-[60%] mx-auto min-h-[20vh] rounded-md">
          {imageUrl != null ? (
            <img
              src={imageUrl}
              alt="recipe-img"
              className="w-full object-contain border-2y border-red-600y h-fit rounded-md"
            />
          ) : (
            <img
              src={recipeImg.src}
              alt="recipe-img"
              className="w-full object-contain border-2y border-red-600y h-fit rounded-md"
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-[rgba(0,0,0,0.7)] font-semibold text-center">
            {title}
          </h1>
          <span className="text-sm text-[rgba(0,0,0,0.7)] font-semibold">
            {ingredients}
          </span>
          <p className="text-sm text-[rgba(0,0,0,0.7)]">{instructions.slice(0,100)}</p>
          <span className="flex flex-row gap-4">
            <Link href={`/recipe/${_id}`}>
              <FcViewDetails className="flex self-endy font-semibold text-2xl cursor-pointer" />
            </Link>
            <Link href={`/edit/${_id}`}>
              <FaRegEdit className="flex self-endy font-semibold text-xl cursor-pointer text-blue-800" />
            </Link>

            <MdDeleteForever
              className="text-xl text-red-600 font-semibold cursor-pointer"
              onClick={() => handleDelete()}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default Item;
