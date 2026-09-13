'use server'

import { cookies } from 'next/headers'

const apiUrl = 'https://ecommerce.routemisr.com/api/v1'

export type Review = {
  _id: string
  review: string
  rating: number
  user: { _id: string; name: string }
  createdAt: string
}

type ReviewsResponse = { data: Review[] }

export async function getProductReviews(productId: string): Promise<Review[]> {
  const response = await fetch(`${apiUrl}/products/${productId}/reviews`, {
    cache: 'no-store',
  })

  if (!response.ok) return []

  const payload = await response.json() as ReviewsResponse
  return payload.data ?? []
}

export async function addProductReview(productId: string, rating: number, review: string) {
  const token = (await cookies()).get('userToken')?.value

  if (!token) {
    return { success: false as const, message: 'Please sign in before writing a review.' }
  }

  const response = await fetch(`${apiUrl}/products/${productId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    body: JSON.stringify({ rating, review }),
  })
  const payload = await response.json().catch(() => null) as { data?: Review; message?: string }

  if (!response.ok || !payload.data) {
    return { success: false as const, message: payload.message ?? 'Unable to submit your review.' }
  }

  return { success: true as const, review: payload.data }
}