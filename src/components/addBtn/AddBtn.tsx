'use client'

import { addToCart } from '@/services/cartApi'
import React, { ReactNode } from 'react'
import { toast } from '../ui/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddBtn({ cls, detail, prodId }: { cls: string, detail: ReactNode, prodId: string }) {

    const queryClient = useQueryClient();

        function handleAddToCart() {
            mutate(prodId);
    }

    const { mutate } = useMutation({
        mutationFn:addToCart,
        onError:()=>{
              toast.add({
                type: "Error",
                description: "Faild To Add To Cart , Make Sure That you are Signed In",
            });
        },
           onSuccess:(updatedCart)=>{
               queryClient.setQueryData(["cart"], updatedCart);
               queryClient.invalidateQueries({ queryKey: ["cart"] });
             toast.add({
                type: "success",
                description: "Added To Cart Successfully",
            });
        }
    })
    return (
        <button onClick={handleAddToCart} type="button" className={cls} aria-label="Add to cart">
            {detail}
        </button>
    )
}
