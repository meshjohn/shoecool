import { addItem } from "@/app/actions";
import { FeaturedProducts } from "@/app/components/storefront/FeatureProducts";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import { ShoppingBagButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { StarIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function ProductionRoute({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const data = await getData(params.id);
  const addProducttoShoppingCart = addItem.bind(null, data.id);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
        <ImageSlider images={data.images} />
        <div className="">
          <h1 className="text-3xl font-extrabold tracking-tighter text-gray-900 uppercase">
            {data.name}
          </h1>
          <p className="text-xl mt-2 text-gray-900">${data.price}</p>
          <div className="mt-3 flex items-center">
            <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-base text-gray-700 mt-6">{data.description}</p>
          <form action={addProducttoShoppingCart}>
            <ShoppingBagButton />
          </form>
        </div>
      </div>
      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
