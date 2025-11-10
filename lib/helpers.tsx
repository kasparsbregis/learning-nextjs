import React from "react";

/**
 * Renders star rating display based on a numeric rating (0-5)
 * @param rating - The rating value (e.g., 4.5, 3.7, 2.0)
 * @returns Array of React elements representing stars (full, half, or empty)
 */
export const renderStars = (rating: number): React.ReactElement[] => {
  const stars: React.ReactElement[] = [];

  // Step 1: Calculate how many FULL stars we need
  // Math.floor(4.5) = 4, Math.floor(3.2) = 3, Math.floor(2.0) = 2
  const fullStars = Math.floor(rating);

  // Step 2: Check if we need a HALF star
  // 4.5 % 1 = 0.5 (which is >= 0.5) → has half star
  // 4.2 % 1 = 0.2 (which is < 0.5) → no half star
  // 4.0 % 1 = 0.0 (which is < 0.5) → no half star
  const hasHalfStar = rating % 1 >= 0.5;

  // Step 3: Loop through 5 star positions (0, 1, 2, 3, 4)
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      // Position i is less than fullStars → This is a FULL star
      // Example: fullStars = 3, i = 0, 1, 2 → all full stars
      stars.push(
        <span key={i} className="full-star text-sm">
          ★
        </span>
      );
    } else if (i === fullStars && hasHalfStar) {
      // Position i equals fullStars AND we have a half star → HALF star
      // Example: rating = 3.5, fullStars = 3, i = 3 → half star at position 3
      stars.push(
        <span key={i} className="half-star text-sm">
          ★
        </span>
      );
    } else {
      // Everything else → EMPTY star
      // Example: rating = 3.5, fullStars = 3, i = 4 → empty star at position 4
      stars.push(
        <span key={i} className="empty-star text-sm">
          ★
        </span>
      );
    }
  }

  // Step 4: Return the array of star elements
  return stars;
};
