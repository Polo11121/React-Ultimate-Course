import { useState } from "react";
import { Tab, TabContent, DifferentContent } from "components";

type TabbedProps = {
  content: {
    summary: string;
    details: string;
  }[];
};

export const Tabbed = ({ content }: TabbedProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>
      {activeTab <= 2 && content[activeTab] ? (
        <TabContent key={activeTab} item={content[activeTab]} />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
};
