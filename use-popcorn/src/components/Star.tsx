import { ReactComponent as FullStart } from "assets/full-star.svg";
import { ReactComponent as EmptyStart } from "assets/empty-star.svg";

type StarProps = {
  isFilled: boolean;
  size: number;
  color: string;
  onStartHover: () => void;
  onEndHover: () => void;
  onClick: () => void;
};

export const Star = ({
  onClick,
  onStartHover,
  onEndHover,
  isFilled,
  color,
  size,
}: StarProps) => {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
    color,
  };

  return (
    <span
      onClick={onClick}
      onMouseEnter={onStartHover}
      onMouseLeave={onEndHover}
      style={starStyle}
      role="button"
    >
      {isFilled ? <FullStart /> : <EmptyStart />}
    </span>
  );
};
