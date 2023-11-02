import { useEffect, useState } from "react";

export const DarkModeButton = () => {
  const [isFakeDark, setIsFakeDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("fake-dark-mode");
  }, [isFakeDark]);

  const changeDarkModeHandler = () =>
    setIsFakeDark((isFakeDark) => !isFakeDark);

  return (
    <button onClick={changeDarkModeHandler} className="btn-fake-dark-mode">
      {isFakeDark ? "☀️" : "🌙"}
    </button>
  );
};
