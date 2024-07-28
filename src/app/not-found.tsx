import Link from "next/link"
export default function NotFound(){
    return(
        <div className="flex flex-col justify-center items-center gap-3 mx-auto border-2y w-[40%] mt-[2rem]">
            <h2 className="text-xl font-semibold">Page Not Found</h2>
            <p className="font-semibold">Could not find requested resource</p>
        </div>
    )
}