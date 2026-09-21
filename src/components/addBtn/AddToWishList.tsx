'use client'

import React, { ReactNode } from 'react'
import { toast } from '../ui/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addToWishList, getLoggedUserWishList, removeWishListProduct } from '@/services/wishlistApi'
import { WishListRoot } from '@/types/wishList'

export default function AddToWishList({
    cls,
    detail,
    prodId
}: {
    cls: string
    detail: ReactNode
    prodId: string
}) {

    const queryClient = useQueryClient()

    const { data } = useQuery<WishListRoot>({
        queryKey: ['wishlist'],
        queryFn: getLoggedUserWishList,
    })

    const isInWishlist = data?.data?.some((item) => {
        const productId = item?.product?._id ?? item?._id
        return productId === prodId
    })

    const { mutate } = useMutation({
        mutationFn: async () => {
            if (isInWishlist) {
                return removeWishListProduct(prodId)
            }

            return addToWishList(prodId)
        },

        onError: () => {
            toast.add({
                type: "error",
                description: isInWishlist ? "Failed to remove from wishlist" : "Failed to add to wishlist",
            })
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['wishlist'],
            })

            toast.add({
                type: "success",
                description: isInWishlist ? "Removed from wishlist successfully" : "Added to wishlist successfully",
            })
        }
    })

    function handleToggleWishlist() {
        mutate()
    }

    const iconClassName = isInWishlist ? 'text-red-500' : 'text-gray-400'

    const renderedDetail = React.isValidElement<{ className?: string }>(detail)
        ? React.cloneElement(detail, {
            className: [detail.props.className, iconClassName].filter(Boolean).join(' '),
        })
        : <span className={iconClassName}>{detail}</span>

    return (
        <button
            onClick={handleToggleWishlist}
            type="button"
            className={`${cls} ${iconClassName}`}
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            {renderedDetail}
        </button>
    )
}
