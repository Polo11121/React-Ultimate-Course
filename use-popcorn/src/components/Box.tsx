import { ReactNode, useState } from "react";

type BoxProps = {
  children: ReactNode;
};

export const Box = ({ children }: BoxProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleVisibilityHandler = () => setIsOpen((prevState) => !prevState);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={toggleVisibilityHandler}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
};
