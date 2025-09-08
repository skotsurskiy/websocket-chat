import avatar from "/testimage.jpg"
import './Chat.css'

export default function Chat() {
  return (
    <div className={"chat"}>
      <img className={"avatar"} src={avatar} alt={"avatar"}/>
      <div className={"chat-info"}>
        <p><strong>username</strong></p>
        <p>last message</p>
      </div>
    </div>
  )
}