"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { getLoggedUserWishList, removeWishListProduct } from "@/services/wishlistApi";
import type { WishlistItem, WishListRoot } from "@/types/wishList";
import type { Product } from "@/types/product";
import { addToCart, getLoggedUserCart } from "@/services/cartApi";
import { Root } from "@/types/cart";

export default function Wishlistcontent({ initialwishlist }: { initialwishlist: WishListRoot }) {
  const queryClient = useQueryClient();

  const { data: wishlist, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getLoggedUserWishList,
    initialData: initialwishlist,
  });

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: getLoggedUserCart,
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) => removeWishListProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.add({
        type: "success",
        description: "Item removed from your wishlist.",
      });
    },
    onError: () => {
      toast.add({
        type: "error",
        description: "Could not remove this item.",
      });
    },
  });

    const addMutation = useMutation({
    mutationFn: (productId: string) => addToCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.add({
        type: "success",
        description: "Item added to cart.",
      });
    },
    onError: () => {
      toast.add({
        type: "error",
        description: "Could not add to cart",
      });
    },
  });

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">Loading wishlist...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-red-500">Could not load your wishlist.</p>
      </main>
    );
  }

  const normalizeProduct = (item: WishlistItem | Product): Product | null => {
    if (!item) return null;

    if (typeof item === "object" && "product" in item && item.product) {
      return item.product;
    }

    return item as Product;
  };

  const products = (wishlist?.data ?? [])
    .map(normalizeProduct)
    .filter((product): product is Product => Boolean(product));

  const removeProduct = (productId: string) => {
    if (removeMutation.isPending) return;
    removeMutation.mutate(productId);
  };

  if (!products.length) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <ShoppingBag className="size-7" />
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">
            Your wishlist is empty
          </h1>

          <p className="mt-3 text-slate-600">
            Find something useful for your next order and it will appear here.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Your wishlist
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Saved items
            </h1>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
            {products.length} item{products.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Product</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Brand</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Price</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageCover || product.images?.[0]}
                          alt={product.title}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                        <div>
                          <Link href={`/products/${product._id}`} className="font-semibold text-slate-900 hover:text-emerald-600">
                            {product.title}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{product.brand?.name || "Brand"}</td>
                    <td className="px-4 py-4 font-semibold text-slate-900">
                      {product.priceAfterDiscount ? `$${product.priceAfterDiscount}` : `$${product.price}`}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {(product.quantity ?? 0) > 0 &&
                      !(cartData?.data?.products ?? []).some(
                        (item) => item.product?._id === product._id || item._id === product._id
                      )
                        ? "In Stock"
                        : "In Cart"}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {(cartData?.data?.products ?? []).some((item) => item.product?._id === product._id || item._id === product._id) ?  <Link
                          href={`/cart`}
                          className="inline-flex items-center rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
                        >
                          View Cart
                        </Link> :  <button
                          type="button"
                          onClick={() => addMutation.mutate(product._id)}
                          className="inline-flex items-center justify-center rounded-lg border border-green-200 bg-green-50 p-2.5  transition hover:bg-green-400"
                          aria-label={`Add ${product.title} To Cart`}
                          disabled={addMutation.isPending}
                        >
                          Add to cart
                        </button>}
                        <button
                          type="button"
                          onClick={() => removeProduct(product._id)}
                          className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 p-2.5 text-red-500 transition hover:bg-red-500 hover:text-white"
                          aria-label={`Remove ${product.title} from wishlist`}
                          disabled={removeMutation.isPending}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
