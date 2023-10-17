import { useState } from "react";

type TabContentProps = {
  item: {
    summary: string;
    details: string;
  };
};

export const TabContent = ({ item }: TabContentProps) => {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  const incrementHandler = () => setLikes((prevState) => prevState + 1);

  const tripleIncrementHandler = () => {
    setLikes((prevState) => prevState + 1);
    setLikes((prevState) => prevState + 1);
    setLikes((prevState) => prevState + 1);
  };

  const toggleVisibilityHandler = () =>
    setShowDetails((prevState) => !prevState);

  const undoHandler = () => {
    setShowDetails(true);
    setLikes(0);
  };

  const undoIn2sHandler = () => {
    setTimeout(() => {
      setShowDetails(true);
      setLikes(0);
    }, 2000);
  };

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}
      <div className="tab-actions">
        <button onClick={toggleVisibilityHandler}>
          {showDetails ? "Hide" : "Show"} details
        </button>
        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={incrementHandler}>+</button>
          <button onClick={tripleIncrementHandler}>+++</button>
        </div>
      </div>
      <div className="tab-undo">
        <button onClick={undoHandler}>Undo</button>
        <button onClick={undoIn2sHandler}>Undo in 2s</button>
      </div>
    </div>
  );
};
