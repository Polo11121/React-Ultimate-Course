import { useState } from "react";
import { AddFriendForm, Button, FriendsList, SplitBillForm } from "components";
import { Friend } from "types";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [friends, setFriends] = useState<Friend[]>(initialFriends);

  const addFriendHandler = (friend: Friend) => {
    setFriends((prevState) => [...prevState, friend]);

    setIsFormOpen(false);
  };

  const toggleFormVisibilityHandler = () =>
    setIsFormOpen((prevState) => !prevState);

  const selectFriendHandler = (friend: Friend) => {
    setSelectedFriend((prevState) =>
      prevState?.id === friend.id ? null : friend
    );

    setIsFormOpen(false);
  };

  const splitBillHandler = (value: number) => {
    setFriends((prevState) =>
      prevState.map((friend) =>
        friend.id === selectedFriend?.id
          ? {
              ...friend,
              balance: friend.balance + value,
            }
          : friend
      )
    );

    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          selectedFriendId={selectedFriend?.id}
          onSelectFriend={selectFriendHandler}
          friends={friends}
        />
        {isFormOpen && <AddFriendForm onAddFriend={addFriendHandler} />}
        <Button onClick={toggleFormVisibilityHandler}>
          {isFormOpen ? "Close" : " Add a Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <SplitBillForm
          name={selectedFriend.name}
          onSplitBill={splitBillHandler}
        />
      )}
    </div>
  );
};
