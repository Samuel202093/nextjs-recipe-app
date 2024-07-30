"use client";
import React, { useState } from "react";
import { FormDataType } from "@/interface/interface";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { url } from "../../utils/data";
import axios from "axios";
import { schema } from "@/utils/formValidation";

export default function Create() {
  const router = useRouter();
  const [loading, setLoading] = useState<Boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormDataType> = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("ingredients", data.ingredients);
    formData.append("instructions", data.instructions);
    if (data.image) formData.append("image", data.image[0]);

    try {
      const response = await axios.post(`${url}/api/recipes`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setLoading(false);
        alert("Recipe created successfully!");
        reset();
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
        onSubmit={handleSubmit(onSubmit)}
        className="form_wrapper flex flex-col gap-6 justify-centery items-centery border-[1px] p-6 w-[40%] border-[rgba(0,0,0,0.5)] rounded-md mx-auto mt-[1rem]"
      >
        <h1 className="text-xl font-semibold text-center">Create A Recipe</h1>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="title"
            className="w-full border-[rgba(0,0,0,0.5)] border-[1px] rounded-md px-3 h-[6vh] outline-none"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-sm text-red-600">
              {errors.title.message as string}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="ingredients"
            className="w-full border-[rgba(0,0,0,0.5)] border-[1px] rounded-md px-3 h-[6vh] outline-none"
            {...register("ingredients")}
          />
          {errors.ingredients && (
            <p className="text-sm text-red-600">
              {errors.ingredients.message as string}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input type="file" id="image" {...register("image")} />
        </div>
        <div className="flex flex-col gap-2">
          <textarea
            placeholder="please give instructions on how to prepare the recipe"
            className="w-full border-[rgba(0,0,0,0.5)] border-[1px] rounded-md px-3 h-[20vh] outline-none py-2"
            {...register("instructions")}
          />
          {errors.instructions && (
            <p className="text-sm text-red-600">
              {errors.instructions.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-row justify-center">
          <button
            className="flex self-center bg-green-900 text-white text-sm px-3 py-2 rounded-md font-semibold"
            type="submit"
          >
            {loading === true ? "loading" : "submit"}
          </button>
        </div>
      </form>
    </>
  );
}
