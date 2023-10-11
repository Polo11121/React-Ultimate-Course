type HideButtonProps = {
  onClick: () => void;
};

export const HideButton = ({ onClick }: HideButtonProps) => (
  <button className="close" onClick={onClick}>
    &times;
  </button>
);
