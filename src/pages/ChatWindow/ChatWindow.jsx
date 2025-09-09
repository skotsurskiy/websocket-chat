import HeaderSection from "../../component/Header/HeaderSection.jsx";
import Chats from "../../component/Chats/Chats.jsx";
import {useSelector} from "react-redux";
import FindFriends from "../../component/FindFriends/FindFriends.jsx";

export default function ChatWindow() {
  const title = useSelector(state => state.header.title)

  return (
    <section className="chatWindow">
      <HeaderSection/>
      {title === "Chats" && <Chats/>}
      {title === "Find friends" && <FindFriends />}
    </section>
  )
}