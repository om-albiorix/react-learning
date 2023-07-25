import { useState } from "react";

const intialData = [
  {
    id: 1,
    name: "montana",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/002/002/253/small/beautiful-woman-wearing-sunglasses-avatar-character-icon-free-vector.jpg",
    balance: -20,
  },
  {
    id: 2,
    name: "cary",
    image:
      "https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png",
    balance: 40,
  },
  {
    id: 3,
    name: "jonas",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
    balance: 9,
  },
];

const Button = ({ children, onClick }) => {
  return (
    <button className="closebtn" onClick={onClick}>
      {children}
    </button>
  );
};

const App = () => {
  const [showAddFriend, setshowAddFriend] = useState(false);
  const [friends, setFriend] = useState(intialData);
  const [selectedfriend, setSelectedfriend] = useState(null);
  const HandleAddfrined = () => {
    setshowAddFriend((show) => !show);
  };
  const handleAddFriends = (friend) => {
    console.log("fiesdfs", friend);
    setFriend([...friends, friend]);
    setshowAddFriend(false);
  };

  const handleselection = (friend) => {
    // setSelectedfriend(friend);
    setSelectedfriend((cur) => (cur?.id === friend.id ? null : friend));
    setshowAddFriend(false);
  };

  const handleSplitbill = (value) => {
    setFriend((friends) =>
      friends.map((friend) =>
        friend.id === selectedfriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedfriend(null)
  };

  return (
    <div className="main-div-project">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleselection}
          selectedfriend={selectedfriend}
        />
        {showAddFriend && (
          <FormAddFriend
            onAddFriend={handleAddFriends}
            selectedfriend={selectedfriend}
          />
        )}
        <Button className="closebtn" onClick={HandleAddfrined}>
          {showAddFriend ? "close" : "Add friend"}
        </Button>
      </div>
      <div className="rightside">
        {selectedfriend && (
          <SplitFriendlist
            selectedfriend={selectedfriend}
            onSplitbill={handleSplitbill}
          />
        )}
      </div>
    </div>
  );
};

const FriendsList = ({ friends, onSelection, selectedfriend }) => {
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friends
            Friend={friend}
            key={friend.id}
            onSelection={onSelection}
            selectedfriend={selectedfriend}
          />
        ))}
      </ul>
    </div>
  );
};

const Friends = ({ Friend, onSelection, selectedfriend }) => {
  const isSelected = selectedfriend?.id === Friend.id;
  return (
    <div>
      <li className="friend-item">
        <img className="avatar-img" src={Friend.image} alt="" />
        <div className="column">
          <h3 className="no-space">{Friend.name}</h3>
          {Friend.balance < 0 && (
            <p className="red no-space">
              you owe {Friend.name} {Friend.balance}
            </p>
          )}
          {Friend.balance > 0 && (
            <p className="green no-space">
              you owe {Friend.name} {Math.abs(Friend.balance)}
            </p>
          )}
          {Friend.balance === 0 && (
            <p className="no-space">
              you owe {Friend.name} {Math.abs(Friend.balance)}
            </p>
          )}
        </div>
        <button className="btn" onClick={() => onSelection(Friend)}>
          {isSelected ? "close" : "Select"}
        </button>
      </li>
    </div>
  );
};

const FormAddFriend = ({ onAddFriend }) => {
  const [name, setName] = useState();
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) return;
    const newData = {
      name,
      image,
      balance: 0,
      id: crypto.randomUUID,
    };
    onAddFriend(newData);
    console.log(newData);
    setName("");
    setImage(
      "https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png"
    );
  };
  return (
    <div>
      <form className="form-Add-friends" onSubmit={handleSubmit}>
        <label>Friend Name</label>
        <input
          type="text"
          style={{ padding: "5px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Image URL</label>
        <input
          type="text"
          style={{ padding: "5px" }}
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button className="ADDbtn">ADD</button>
      </form>
    </div>
  );
};

export default App;
const SplitFriendlist = ({ selectedfriend, onSplitbill }) => {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setwhoIsPaying] = useState("user");
  const paidByFriend = bill ? bill - paidByUser : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitbill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  };
  console.log(bill);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-Add-friends">
          <h3>SPLIT A BILL WITH {selectedfriend.name}</h3>
          <label>Bill value</label>
          <input
            type="text"
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
          />
          <label>Your expense</label>
          <input
            type="text"
            value={paidByUser}
            onChange={(e) => setPaidByUser(Number(e.target.value))}
          />
          <label>
            <b>{selectedfriend.name}</b> expense
          </label>
          <input type="text" value={paidByFriend} />
          <label>Who is paying the bill</label>
          <select
            value={whoIsPaying}
            onChange={(e) => setwhoIsPaying(e.target.value)}
          >
            <option value="user">you</option>
            <option value="friend">{selectedfriend.name}</option>
          </select>
          <button className="ADDbtn">Split bill</button>
        </div>
      </form>
    </div>
  );
};
