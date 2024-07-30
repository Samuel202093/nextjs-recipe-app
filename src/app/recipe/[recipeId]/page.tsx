"use client";
import useSWR from "swr";
import { useParams } from "next/navigation";
import recipeImg from "../../../../public/images/pizza-img.jpg";
import { url } from "@/utils/data";

export default function RecipeDetails() {
  const params = useParams();
  const fetcher = async () => {
    const response = await fetch(`${url}/api/recipes/${params.recipeId}`);
    const data = await response.json();
    return data;
  };
  const { isLoading, data, error } = useSWR("recipe", fetcher);

  const refreshPage = () => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <p className="text-sm text-center font-semibold mt-[2rem]">...Loading</p>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-center font-semibold mt-[2rem]">
          error try again
        </p>
        <span
          className="flex self-center bg-[rgba(0,0,0,0.8)] text-white px-2 py-1 rounded-md text-sm cursor-pointer"
          onClick={refreshPage}
        >
          refresh
        </span>
      </div>
    );
  }

  if (data) {
    const { title, ingredients, instructions, imageUrl } = data.recipe;

    return (
      <div className="recipeContainer flex flex-col gap-2 w-[30%] min-h-[15vh] border-2 rounded-md p-4 mx-auto mt-[2rem]">
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
          <p className="text-sm text-[rgba(0,0,0,0.7)]">{instructions}</p>
        </div>
      </div>
    );
  }
}
