import './ChatComponent.css'
import {useSelector} from "react-redux";
import {API_URL} from "../../util/variables.js";
import {useNavigate} from "react-router-dom";

export default function ChatComponent({chat}) {
  const navigate = useNavigate();
  const usernameFromStore = useSelector(state => state.profile.username);
  const user = chat.users.find(user => user.username !== usernameFromStore);
  const lastMessage = chat.messages[0];

  async function goToChat() {
    navigate(`/chats/${user.username}`);
  }

  return (
    <div className={"chat"} onClick={() => goToChat()}>
      <img className={"avatar"} src={`${API_URL}${user.avatarUrl}`} alt={"avatar"}/>
      <div className={"chat-info"}>
        <p><strong>{user.username}</strong></p>
        <p className={"lastMessage"}>{lastMessage ? lastMessage.content : "No messages yet"}</p>
      </div>
    </div>
  )
}