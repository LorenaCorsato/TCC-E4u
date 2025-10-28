import React, { useState } from 'react';

export default function StarRatingInput({ rating, setRating }) {
    const [hover, setHover] = useState(0);

    return (
        <div className="star-rating-input">
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <span
                        key={starValue}
                        style={{ cursor: 'pointer', fontSize: '2.5rem', color: starValue <= (hover || rating) ? '#FFC107' : '#e4e5e9' }}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
}