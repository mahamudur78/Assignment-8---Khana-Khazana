import { getBlurData } from "@/utils/blur-generator";
import Image from "next/image";
import Link from "next/link";

export default async function RecipeCart({ recipe }) {
    const { base64 } = await getBlurData(recipe?.thumbnail);

    return (
        <div className='card'>
            <Image
                src={recipe?.thumbnail}
                width={500}
                height={267}
                className='rounded-md'
                alt='Food Name'
                placeholder='blur'
                blurDataURL={base64}
            />
            <h4 className='my-2'>
                <Link href={`/details/${recipe?.id}`}>{recipe?.name}</Link>
            </h4>
            <div className='py-2 flex justify-between text-xs text-gray-500'>
                <span>⭐️ {recipe?.rating.toFixed(1)}</span>
                <span>By: {recipe?.author}</span>
            </div>
        </div>
    );
}
