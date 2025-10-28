import React from 'react';
import '../styles/components/StarRating.css'; 

export default function StarRating({ rating }) {
    const totalStars = 5;
    const ratingValue = parseFloat(rating) || 0; 
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = (ratingValue - fullStars) >= 0.5;
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="star-rating-container">
            {[...Array(fullStars)].map((_, i) => (
                <span key={`full-${i}`} className="star full-star">★</span>
            ))}
            {hasHalfStar && (
                <span key="half" className="star half-star">★</span>
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={`empty-${i}`} className="star empty-star">★</span>
            ))}
        </div>
    );
}