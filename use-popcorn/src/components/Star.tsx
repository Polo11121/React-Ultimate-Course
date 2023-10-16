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
    width: "48px",
    height: "48px",
    display: "block",
    cursor: "pointer",
    color,
    size: `${size}px`,
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
