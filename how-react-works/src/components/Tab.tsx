type TabProps = {
  num: number;
  activeTab: number;
  onClick: (num: number) => void;
};

export const Tab = ({ num, activeTab, onClick }: TabProps) => {
  const switchTabHandler = () => onClick(num);

  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={switchTabHandler}
    >
      Tab {num + 1}
    </button>
  );
};
