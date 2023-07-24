

const intialData = [{
  id: 1,
  name: "montana",
  image: "https://static.vecteezy.com/system/resources/thumbnails/002/002/253/small/beautiful-woman-wearing-sunglasses-avatar-character-icon-free-vector.jpg",
  balance: -20
}, {
  id: 2,
  name: "cary",
  image: "https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png",
  balance: 40
}, {
  id: 3,
  name: "jonas",
  image: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
  balance: 10
}
]
const App = () => {
  return (
    <div>
      <FriendsList />
    </div>
  );
}

const FriendsList = () => {
  const friends = intialData;
  return <div>
    <ul>{
      friends.map((friend) => (
        <Friends Friend={friend} key={friend.id} />
      ))
    }</ul>
  </div>
}

const Friends = ({ Friend }) => {
  return <div>
    <li className="friend-item">
      <img className="avatar-img" src={Friend.image} alt="" />
      <div className="column">
        <h3 className="no-space">{Friend.name}</h3>
        {Friend.balance < 0 && (
          <p className="red no-space">you owe {Friend.name} {Friend.balance}</p>
        )
        }
      </div>
      <button className="btn">Select</button>
    </li>

  </div>
}

const FormAddFriend = () => {
  return <div>
    <form className="form-Add-friends">
      <label>Friend Name</label>
      <input type="text" />
      <label>Image URL</label>
      <input type="text" />
    </form>
  </div>
}

export default App;
