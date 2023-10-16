import { useState } from "react";
import { Star } from "components";
import PropTypes from "prop-types";

type StarRatingProps = {
  defaultRating?: number;
  maxRating?: number;
  color?: string;
  size?: number;
  messages?: string[];
  onRate?: (rating: number) => void;
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const starContainerStyle = {
  display: "flex",
};

export const StarRating = ({
  defaultRating = 0,
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  messages = [],
  onRate,
}: StarRatingProps) => {
  const [rating, setRating] = useState(defaultRating);
  const [currentRating, setCurrentRating] = useState(0);

  const textStyle = {
    lineHeight: "1",
    margin: "0	",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, index) => {
          const rateHandler = () => {
            setRating(index);
            onRate?.(index);
          };

          const startHoverHandler = () => setCurrentRating(index);
          const endHoverHandler = () => setCurrentRating(rating);

          const isFilled = index <= currentRating;

          return (
            <Star
              isFilled={isFilled}
              onStartHover={startHoverHandler}
              onEndHover={endHoverHandler}
              onClick={rateHandler}
              key={index}
              color={color}
              size={size}
            />
          );
        })}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[currentRating]
          : currentRating + 1}
      </p>
    </div>
  );
};

StarRating.propTypes = {
  defaultRating: PropTypes.number,
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.arrayOf(PropTypes.string),
  onRate: PropTypes.func,
};
