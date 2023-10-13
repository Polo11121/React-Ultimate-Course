import { FriendItem } from "components";
import { Friend } from "types";

type FriendsListProps = {
  friends: Friend[];
  onSelectFriend: (friend: Friend) => void;
  selectedFriendId?: number;
};

export const FriendsList = ({
  friends,
  onSelectFriend,
  selectedFriendId,
}: FriendsListProps) => (
  <ul>
    {friends.map((friend) => (
      <FriendItem
        {...friend}
        isSelected={selectedFriendId === friend.id}
        onSelect={onSelectFriend}
        key={friend.id}
      />
    ))}
  </ul>
);
