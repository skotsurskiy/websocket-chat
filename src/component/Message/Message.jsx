import {API_URL} from "../../util/variables.js";
import './Message.scss'

export default function Message({content, isSender, isLastMessage, avatar}) {
  return (
    <div className={`messageSection ${isSender ? "sender" : "receiver"}`}>
      <div className="avatarWrapper">
        {isLastMessage && avatar && (
          <img className="avatar message" src={`${API_URL}${avatar}`} alt="avatar"/>
        )}
      </div>
      <p className="messageContent">{content}</p>
    </div>
  )
}