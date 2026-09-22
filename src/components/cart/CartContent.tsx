
"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import {clearCart,getLoggedUserCart,removeCartProduct,updateCartProductQty,} from "@/services/cartApi";

import { Root } from "@/types/cart";
import { toast } from "@/components/ui/toast";
import { FaTrash } from "react-icons/fa";

export default function CartContent({ initialCart, }: { initialCart: Root; }) {

  const queryClient = useQueryClient();
  const { data: cart, isLoading, isError, } = useQuery({
    queryKey: ["cart"],
    queryFn: getLoggedUserCart,
    initialData: initialCart,
  });

  const updateMutation = useMutation({
    mutationFn: ({ productId, quantity, }: { productId: string; quantity: number; }) => updateCartProductQty(productId, quantity),
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(["cart"], updatedCart);
    },

    onError: () => {
      toast.add({
        type: "error",
        description: "Could not update this item.",
      });
    },
  });

  const clearMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.add({
        type: "sucess",
        description: "cart cleard successfully",
      });
    },
    onError: () => {
      toast.add({
        type: "error",
        description: "Could not clear cart",
      });
    }
  });


  const removeMutation = useMutation({
    mutationFn: (productId: string) =>
      removeCartProduct(productId),

    onSuccess: (updatedCart) => {
      queryClient.setQueryData(["cart"], updatedCart);

      toast.add({
        type: "success",
        description: "Item removed from your cart.",
      });
    },

    onError: () => {
      toast.add({
        type: "error",
        description: "Could not remove this item.",
      });
    },
  });

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">Loading cart...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-red-500">
          Could not load your cart.
        </p>
      </main>
    );
  }

  const products = cart?.data?.products ?? [];

  function updateQuantity(
    productId: string,
    quantity: number
  ) {
    if (quantity < 1 || updateMutation.isPending) {
      return;
    }

    updateMutation.mutate({
      productId,
      quantity,
    });
  }

  function removeProduct(productId: string) {
    if (removeMutation.isPending) {
      return;
    }

    removeMutation.mutate(productId);
  }

  if (!products.length) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <ShoppingBag className="size-7" />
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">
            Your cart is empty
          </h1>

          <p className="mt-3 text-slate-600">
            Find something useful for your next order and it
            will appear here.
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
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Shopping cart
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Review your order
            </h1>
          </div>

          <button
            onClick={() => clearMutation.mutate()}
            disabled={clearMutation.isPending}
            className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 font-medium text-red-600 transition-all duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaTrash className="text-sm" />

            {clearMutation.isPending ? "Clearing..." : "Clear Cart"}
          </button>

        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* Cart Items */}

          <section
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            aria-label="Cart items"
          >
            <div className="divide-y divide-slate-100">

              {products.map((item) => {

                const isUpdating =
                  updateMutation.isPending &&
                  updateMutation.variables?.productId ===
                  item.product._id;

                const isRemoving =
                  removeMutation.isPending &&
                  removeMutation.variables ===
                  item.product._id;

                const isPending =
                  isUpdating || isRemoving;

                return (
                  <article
                    key={item._id}
                    className={`flex gap-4 p-4 sm:gap-6 sm:p-6 ${isPending ? "opacity-60" : ""
                      }`}
                  >

                    {/* Product Image */}

                    <Link
                      href={`/products/${item.product._id}`}
                      className="flex size-24 shrink-0 items-center justify-center rounded-lg bg-slate-50 sm:size-32"
                    >
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="size-full object-contain mix-blend-multiply"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">

                      {/* Product Info */}

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                            {item.product.brand.name}
                          </p>

                          <Link
                            href={`/products/${item.product._id}`}
                            className="mt-1 block line-clamp-2 font-semibold text-slate-900 hover:text-emerald-600"
                          >
                            {item.product.title}
                          </Link>

                        </div>

                        {/* Remove */}

                        <button
                          type="button"
                          onClick={() =>
                            removeProduct(
                              item.product._id
                            )
                          }
                          disabled={isPending}
                          className="shrink-0 p-1 text-slate-400 transition hover:text-red-600 disabled:cursor-not-allowed"
                          aria-label={`Remove ${item.product.title}`}
                        >
                          <Trash2 className="size-4" />
                        </button>

                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center rounded-lg border border-slate-200">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.count - 1
                              )
                            }
                            disabled={
                              item.count <= 1 ||
                              isPending
                            }
                            className="p-2 text-slate-500 transition hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-4" />
                          </button>
                          <span
                            className="min-w-8 text-center text-sm font-semibold text-slate-900"
                            aria-label="Quantity"
                          >
                            {item.count}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.count + 1
                              )
                            }
                            disabled={isPending}
                            className="p-2 text-slate-500 transition hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-4" />
                          </button>

                        </div>

                        {/* Price */}

                        <p className="font-bold text-slate-950">
                          {(item.price * item.count).toFixed(2)} EGP
                        </p>

                      </div>
                    </div>
                  </article>
                );
              })}

            </div>
          </section>

          {/* Order Summary */}

          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold text-slate-950">
              Order summary
            </h2>

            <div className="mt-6 space-y-3 border-b border-slate-100 pb-6 text-sm">

              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>

                <span>
                  {cart.data.totalCartPrice.toFixed(2)} EGP
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>

                <span className="font-medium text-emerald-600">
                  Free
                </span>
              </div>

            </div>

            <div className="flex justify-between pt-6 text-lg font-bold text-slate-950">
              <span>Total</span>

              <span>
                {cart.data.totalCartPrice.toFixed(2)} EGP
              </span>
            </div>

            <Link  href={`/checkout/${initialCart.cartId}`}
              className="mt-6 flex justify-center w-full rounded-lg bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Proceed to checkout
            </Link>

            <Link
              href="/products"
              className="mt-4 block text-center text-sm font-semibold text-slate-600 hover:text-emerald-600"
            >
              Continue shopping
            </Link>

          </aside>
        </div>
      </div>
    </main>
  );
}

