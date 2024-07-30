"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FormType } from "@/interface/interface";
import { useRouter } from "next/navigation";
import { url } from "../../utils/data";
import axios from "axios";

export default function Create() {
  const router = useRouter();
  const [errors, setErrors] = useState<Partial<FormType>>({});
  const [loading, setLoading] = useState<Boolean>(false);
  const [formData, setFormData] = useState<FormType>({
    title: "",
    ingredients: "",
    instructions: "",
    image: null as File | null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const validateForm = (): Partial<FormType> => {
    const newErrors: Partial<FormType> = {};

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.ingredients)
      newErrors.ingredients = "Ingredients is required";
    if (!formData.instructions)
      newErrors.instructions = "Instructions is required";
    setLoading(false);

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const recipeData = new FormData();
    recipeData.append("title", formData.title);
    recipeData.append("ingredients", formData.ingredients);
    recipeData.append("instructions", formData.instructions);
    if (formData.image) {
      recipeData.append("image", formData.image);
    }

    try {
      const response = await axios.post(`${url}/api/recipes`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        setLoading(false);
        alert("recipe submitted successfully");
        setFormData({
          title: "",
          ingredients: "",
          instructions: "",
          image: null,
        });
        router.push("/");
      }
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit}
        className="form_wrapper flex flex-col gap-6 justify-centery items-centery border-[1px] p-6 w-[40%] border-[rgba(0,0,0,0.5)] rounded-md mx-auto mt-[1rem]"
      >
        <h1 className="text-xl font-semibold text-center">Create A Recipe</h1>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="title"
            name="title"
            className="w-full border-[rgba(0,0,0,0.5)] border-[1px] rounded-md px-3 h-[6vh] outline-none"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="ingredients"
            name="ingredients"
            className="w-full border-[rgba(0,0,0,0.5)] border-[1px] rounded-md px-3 h-[6vh] outline-none"
            value={formData.ingredients}
            onChange={handleChange}
          />
          {errors.ingredients && (
            <p className="text-sm text-red-600">{errors.ingredients}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFormImage}
          />
        </div>
        <div className="flex flex-col gap-2">
          <textarea
            placeholder="please give instructions on how to prepare the recipe"
            className="w-full border-[rgba(0,0,0,0.5)] border-[1px] rounded-md px-3 h-[20vh] outline-none py-2"
            value={formData.instructions}
            onChange={handleChange}
            name="instructions"
          />
          {errors.instructions && (
            <p className="text-sm text-red-600">{errors.instructions}</p>
          )}
        </div>

        <div className="flex flex-row justify-center">
          <button className="flex self-center bg-green-900 text-white text-sm px-3 py-2 rounded-md font-semibold">
            {loading === true ? "loading" : "submit"}
          </button>
        </div>
      </form>
    </>
  );
}
