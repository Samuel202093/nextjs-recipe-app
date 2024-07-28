"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { RecipeType } from "@/interface/interface";
import Item from "@/components/Item/Item";

import { url } from "@/utils/data";


export default function Home() {
  const[page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [btnDisable, setBtnDisable] = useState(false)
  const [nextBtn, setNextBtn] = useState(false)

  const handlePrevious = ()=>{
    if (page === 1) {
      setBtnDisable(true);
    }
    if (page > 1) {
      setPage(page - 1);
    }
  }

 

  const fetcher = async () => {
    const response = await fetch(`${url}/api/recipes?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  };

  const refreshPage = () => {
   window.location.reload();
  }

  const { data, error, isLoading } = useSWR(`recipes-${page}`, fetcher);


  const handleNext = ()=>{
    if(data.lastPage === true){
      setNextBtn(true)
    }

    if(data.lastPage === false){
      setNextBtn(false);
      setPage(page + 1)
    }
  }

  if (isLoading) return <p className="text-sm text-center font-semibold mt-[2rem]">...Loading</p>;

  if (error) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-center font-semibold mt-[2rem]">error fetching recipes</p>
        <span className="flex self-center bg-[rgba(0,0,0,0.8)] text-white px-2 py-1 rounded-md text-sm cursor-pointer" onClick={refreshPage}>refresh</span>
      </div>
    )
  }


    return (
      <section className="container flex flex-col gap-4 w-[100%] p-6 mt-[2rem] border-2y border-green-700y mx-auto">
        <div className="recipeWrapper flex justify-between min-h-[30vh] gap-4y border-2y border-red-600y">
          {data.data.map((recipe: RecipeType) => {
            return (
                <Item key={recipe._id} recipe={recipe}/>
            );
          })}
        </div>

        <div className="flex flex-row sm:flex-coly gap-4">
      
          <button className="bg-[rgba(0,0,0,0.8)] text-white text-sm cursor-pointer px-2 py-1 rounded-md font-semibold" onClick={handlePrevious} disabled={btnDisable}>Prev</button>
          <button className="bg-[rgba(0,0,0,0.8)] text-white text-sm cursor-pointer px-2 py-1 rounded-md font-semibold" onClick={handleNext} disabled={nextBtn}>Next</button>
          
        </div>
      </section>
    );
  
}
