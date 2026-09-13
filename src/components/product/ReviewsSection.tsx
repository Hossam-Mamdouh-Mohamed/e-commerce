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
  const [isWriting, setIsWriting] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const currentReviewsCount = reviews.length || reviewsCount
  const currentRating = reviews.length
    ? reviews.reduce((total, item) => total + item.rating, 0) / reviews.length
    : rating
  const ratingBreakdown = [5, 4, 3, 2, 1].map((value) => ({
    label: `${value} star`,
    percentage: reviews.length ? Math.round((reviews.filter((item) => Math.round(item.rating) === value).length / reviews.length) * 100) : 0,
  }))

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (selectedRating === 0) return

    const form = new FormData(event.currentTarget)
    setIsSubmitting(true)
    setError("")
    const result = await addProductReview(productId, selectedRating, String(form.get("review") ?? ""))
    setIsSubmitting(false)

    if (!result.success) {
      setError(result.message)
      return
    }

    setReviews((current) => [result.review, ...current])
    setSelectedRating(0)
    setIsWriting(false)
  }

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

      <div className="border-t border-gray-200 pt-6">
        {isWriting ? (
          <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4 rounded-lg border border-gray-200 p-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Your rating</label>
              <div className="flex gap-1" role="radiogroup" aria-label="Choose a rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelectedRating(star)}
                    className="text-2xl text-yellow-400 transition-transform hover:scale-110"
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  >
                    {star <= selectedRating ? <FaStar /> : <FaRegStar />}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="review" className="mb-2 block text-sm font-medium text-gray-700">Your review</label>
              <textarea id="review" name="review" required rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" placeholder="Tell other customers about this product..." />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setIsWriting(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">Cancel</button>
              <button type="submit" disabled={selectedRating === 0 || isSubmitting} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50">{isSubmitting ? "Submitting..." : "Submit Review"}</button>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center">
            <FaStar className="mx-auto mb-3 text-4xl text-gray-300" />
            {reviews.length ? (
              <div className="space-y-4 text-left">
                {reviews.map((item) => (
                  <article key={item._id} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-gray-900">{item.user.name}</p>
                      <div className="flex text-yellow-400" aria-label={`${item.rating} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map((star) => <FaStar key={star} className={star <= Math.round(item.rating) ? "h-4 w-4" : "h-4 w-4 text-gray-300"} />)}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{item.review}</p>
                  </article>
                ))}
                <div className="pt-2 text-center">
                  <button type="button" onClick={() => setIsWriting(true)} className="font-medium text-green-600 hover:text-green-700">Write a Review</button>
                </div>
              </div>
            ) : <p className="text-center text-gray-500">Customer reviews will be displayed here.</p>}
            <button type="button" onClick={() => setIsWriting(true)} className="mt-4 font-medium text-green-600 hover:text-green-700">Write a Review</button>
          </div>
        )}
      </div>
    </div>
  )
}