import '../ChatComponent/ChatComponent.css';
import {API_URL} from "../../util/variables.js";
import {useDispatch} from "react-redux";
import {createChat} from "../../http/slices/ChatSlice.jsx";
import {setHeaderTitle} from "../../http/slices/headerSlice.jsx";

export default function UserData({data, loading}) {
  const dispatch = useDispatch();

  return (
    <div className="userData">
      {data.length === 0 && !loading && <p className={"noUsersFound"}>No users found</p>}
      {data.map(user => (
        <div key={user.username} className="friendItem" onClick={async () => {
          await dispatch(createChat(user.username));
          dispatch(setHeaderTitle("Chats"));
        }}>
          <img
            src={`${API_URL}${user.avatarUrl}`}
            alt={user.username}
            className="avatar"
          />
          <span className="friendName">{user.username}</span>
        </div>
      ))}
    </div>
  )
}
