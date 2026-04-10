/**
 * Fallback college images from Unsplash
 * Used when the image field is empty in the dataset
 */
export const fallbackCollegeImages = [
  "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&auto=format&fit=crop&q=60",
];

/**
 * Get a fallback image URL based on college ID
 * Cycles through the available fallback images
 */
export function getFallbackImageUrl(collegeId: string): string {
  try {
    // Try to parse the ID as a number to get a consistent rotation
    const idNum = parseInt(collegeId.replace(/\D/g, "")) || 0;
    return fallbackCollegeImages[idNum % fallbackCollegeImages.length];
  } catch {
    return fallbackCollegeImages[0];
  }
}

/**
 * Placeholder image for when all else fails
 */
export const placeholderImage = "/placeholder.svg";
