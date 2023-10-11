type DirectionButtonProps = {
  direction: "next" | "previous";
  onClick: () => void;
  isDisabled: boolean;
};

export const DirectionButton = ({
  direction,
  onClick,
  isDisabled,
}: DirectionButtonProps) => (
  <button
    onClick={onClick}
    disabled={isDisabled}
    className={isDisabled ? "disabled" : ""}
  >
    {direction}
  </button>
);
