"use client"

import { FormEvent, useState } from "react"
import { FaRegStar, FaStar } from "react-icons/fa"
import { addProductReview, Review } from "@/services/reviewsApi"

type ReviewsSectionProps = {
  productId: string
  rating: number
  reviewsCount: number
  reviews: Review[]
}

export default function ReviewsSection({ productId, rating, reviewsCount, reviews: initialReviews }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState(initialReviews)

  const currentReviewsCount = reviews.length || reviewsCount
  const currentRating = reviews.length ? reviews.reduce((total, item) => total + item.rating, 0) / reviews.length : rating
  
  const ratingBreakdown = [5, 4, 3, 2, 1].map((value) => ({
    label: `${value} star`,
    percentage: reviews.length ? Math.round((reviews.filter((item) => Math.round(item.rating) === value).length / reviews.length) * 100) : 0,
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
        <div className="text-center">
          <div className="mb-2 text-5xl font-bold text-gray-900">
            {currentReviewsCount > 0 ? currentRating.toFixed(1) : "0.0"}
          </div>
          <div className="flex justify-center text-yellow-400" aria-label={`${currentRating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar key={star} className={star <= Math.round(currentRating) ? "h-5 w-5" : "h-5 w-5 text-gray-300"} />
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-500">Based on {currentReviewsCount} reviews</p>
        </div>

        <div className="w-full flex-1">
            {ratingBreakdown.map(({ label, percentage }) => (
            <div key={label} className="mb-2 flex items-center gap-3">
              <span className="w-10 text-sm text-gray-600">{label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-yellow-400 transition-all duration-300" style={{ width: `${percentage}%` }} />
              </div>
              <span className="w-10 text-right text-sm text-gray-500">{percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}