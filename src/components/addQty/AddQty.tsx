'use client'

import { updateCartProductQty } from '@/services/cartApi'
import { useState } from 'react'
import { toast } from '../ui/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddQty({ prodId }: { prodId: string }) {
    const queryClient = useQueryClient();
    const [qty, setQty] = useState<number>(1);

    function updateProductQty(change: number) {
        const nextQty = Math.max(1, qty + change);
        setQty(nextQty);
        mutate({ id: prodId, qty: nextQty });
    }

    const { mutate } = useMutation({
        mutationFn: ({ id, qty }: { id: string; qty: number }) => updateCartProductQty(id, qty),
        onError: () => {
            toast.add({
                type: "Error",
                description: "Faild To Add To Cart , Make Sure That you are Signed In",
            });
        },
        onSuccess: (updatedCart) => {
            queryClient.setQueryData(["cart"], updatedCart);
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            toast.add({
                type: "success",
                description: "ََQty Updated Successfully",
            });
        }
    })

    const handleQtyInput = (value: string) => {
        const parsedValue = Number(value);

        if (Number.isNaN(parsedValue)) return;

        const nextQty = Math.max(1, parsedValue);
        setQty(nextQty);
        mutate({ id: prodId, qty: nextQty });
    }

    return (
        <>
            <h1>Quantity</h1>
            <div className="inline-flex items-center rounded-lg border border-green-200 bg-green-50 overflow-hidden mb-3 me-4">

                <button onClick={() => updateProductQty(-1)}
                    type="button"
                    className="px-5 py-3 text-green-600 hover:bg-green-100 font-extrabold text-2xl"
                >
                    -
                </button>

                <input
                    type="number"
                    min="1"
                    name='qty'
                    value={qty}
                    onChange={(e) => handleQtyInput(e.target.value)}
                    className="w-12 bg-transparent text-center outline-none border-0"
                />
                <button onClick={() => updateProductQty(1)}
                    type="button"
                    className="px-5 py-3 text-green-600 hover:bg-green-100 font-bold text-2xl"
                >
                    +
                </button>
            </div>
        </>
    )
}
