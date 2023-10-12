import { useState } from "react";
import { Form, Logo, PackingList, Stats } from "components";

type Item = {
  id: number;
  description: string;
  packed: boolean;
  quantity: number;
};

export const App = () => {
  const [items, setItems] = useState<Item[]>([]);

  const addItemHandler = (item: Item) =>
    setItems((prevItems) => [...prevItems, item]);

  const removeItemHandler = (id: number) =>
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));

  const togglePackedStatusHandler = (id: number) =>
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );

  const clearListHandler = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to clear the list?"
    );

    if (isConfirmed) {
      setItems([]);
    }
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addItemHandler} />
      <PackingList
        onTogglePackedStatus={togglePackedStatusHandler}
        onRemoveItem={removeItemHandler}
        items={items}
        onClearList={clearListHandler}
      />
      <Stats items={items} />
    </div>
  );
};
