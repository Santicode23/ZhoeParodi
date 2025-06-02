"use client"
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
    const router = useRouter()
    return (
        <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-black border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
        > <ArrowLeftIcon className="w-4 h-4" />volver</button>
    )
}