import '../Chat/Chat.css';
import {API_URL, DEFAULT_AVATAR_URL} from "../../util/variables.js";

export default function UserData({data, loading}) {
  return (
    <div className="userData">
      {data.length === 0 && !loading && <p className={"noUsersFound"}>No users found</p>}
      {data.map(user => (
        <div key={user.username} className="friendItem">
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
