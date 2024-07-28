"use client";
import React from "react";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import { EditFormType, RecipeType } from "@/interface/interface";
import { url } from "../../../utils/data";

export default function EditRecipe() {
  const params = useParams();
  const router = useRouter();

  const fetcher = async () => {
    const response = await fetch(`${url}/api/recipes/${params.recipeId}`);
    const data = await response.json();
    return data;
  };

  const { isLoading, data, error } = useSWR("recipe", fetcher);
  const [loading, setLoading] = useState(false);
  const [editFormErrors, setEditFormErrors] = useState<Partial<EditFormType>>(
    {}
  );

  const [formRecipeData, setFormRecipeData] = useState({
    title: data?.title,
    ingredients: data?.ingredients,
    instructions: data?.instructions,
    image: data?.recipe.imageUrl,
  });

  useEffect(() => {
    if (data) {
      setFormRecipeData(data.recipe);
    }
  }, [data]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormRecipeData({ ...formRecipeData, [e.target.name]: e.target.value });
  };

  const handleFormImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormRecipeData({
        ...formRecipeData,
        image: e.target.files[0],
      });
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const validateForm = (): Partial<EditFormType> => {
    const newErrors: Partial<EditFormType> = {};

    if (!formRecipeData.title) newErrors.title = "Title is required";
    if (!formRecipeData.ingredients)
      newErrors.ingredients = "Ingredients is required";
    if (!formRecipeData.instructions)
      newErrors.instructions = "Instructions is required";

    return newErrors;
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setEditFormErrors(validationErrors);
      return;
    }

    const recipeData = new FormData();
    recipeData.append("title", formRecipeData.title);
    recipeData.append("ingredients", formRecipeData.ingredients);
    recipeData.append("instructions", formRecipeData.instructions);
    if (formRecipeData.image) recipeData.append("image", formRecipeData.image);

    try {
      const res = await axios({
        method: "PUT",
        url: `${url}/api/recipes/${params.recipeId}`,
        data: recipeData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        setLoading(false);
        alert("Recipe was updated successfully");
        setFormRecipeData({
          title: "",
          ingredients: "",
          instructions: "",
          image: null,
        });
        router.push("/");
      } else {
        setLoading(false);
        alert("Error submitting recipe");
      }
    } catch (error) {
      setLoading(false);
      alert(error);
    }
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
    return (
      <>
        <form
          action=""
          onSubmit={handleUpdate}
          className="form_wrapper flex flex-col gap-6 justify-centery items-centery border-[1px] p-6 md:w-[40%] sm:w-[100%]  border-[rgba(0,0,0,0.5)] rounded-md mx-auto mt-[1rem]"
        >
          <h1 className="text-xl font-semibold text-center">Edit Recipe</h1>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="title"
              name="title"
              className="w-full border-[rgba(0,0,0,0.5)] border-[1px] rounded-md px-3 h-[6vh] outline-none"
              value={formRecipeData.title}
              onChange={handleChange}
            />
            {editFormErrors.title && (
              <p className="text-sm text-red-600">{editFormErrors.title}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="ingredients"
              name="ingredients"
              className="w-full border-[rgba(0,0,0,0.5)] border-[1px] rounded-md px-3 h-[6vh] outline-none"
              value={formRecipeData.ingredients}
              onChange={handleChange}
            />
            {editFormErrors.ingredients && (
              <p className="text-sm text-red-600">
                {editFormErrors.ingredients}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleFormImage}
            />
            {formRecipeData.image && <img src={data?.recipe.imageUrl} />}
          </div>
          <div className="flex flex-col gap-2">
            <textarea
              placeholder="please give instructions on how to prepare the recipe"
              className="w-full border-[rgba(0,0,0,0.5)] border-[1px] rounded-md px-3 h-[20vh] outline-none py-2"
              value={formRecipeData.instructions}
              onChange={handleChange}
              name="instructions"
            />
            {editFormErrors.instructions && (
              <p className="text-sm text-red-600">
                {editFormErrors.instructions}
              </p>
            )}
          </div>

          <div className="flex flex-row justify-center">
            <button className="flex self-center bg-green-900 text-white text-sm px-3 py-2 rounded-md font-semibold">
              {loading === true ? "loading..." : "update"}
            </button>
          </div>
        </form>
      </>
    );
  }
}
