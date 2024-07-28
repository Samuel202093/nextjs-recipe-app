"use client";
import React from "react";
import { FcViewDetails } from "react-icons/fc";
import { FaRegEdit } from "react-icons/fa";
import recipeImg from "../../../public/images/pizza-img.jpg";
import { RecipeProps } from "@/interface/interface";
import Link from "next/link";

const Item: React.FC<RecipeProps> = ({ recipe }) => {
  const { _id, title, imageUrl, ingredients, instructions } = recipe;

  return (
    <>
      <div
        className="recipeContainer flex flex-col gap-2 w-[30%]  min-h-[15vh] border-2 rounded-md p-4"
        key={recipe._id}
      >
        <div className="border-[1px]y border-blacky w-[60%] mx-auto min-h-[20vh] rounded-md">
          {imageUrl ? (
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
          <p className="text-sm text-[rgba(0,0,0,0.7)]">{instructions}</p>
          <span className="flex flex-row gap-4">
            <Link href={`/recipe/${_id}`}>
              <FcViewDetails className="flex self-endy font-semibold text-2xl cursor-pointer" />
            </Link>
            <Link href={`/edit/${_id}`}>
              <FaRegEdit className="flex self-endy font-semibold text-xl cursor-pointer text-blue-800" />
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Item;
