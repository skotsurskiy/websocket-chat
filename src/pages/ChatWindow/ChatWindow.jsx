import HeaderSection from "../../component/Header/HeaderSection.jsx";
import Chats from "../../component/ChatContent/Chats.jsx";
import {useDispatch, useSelector} from "react-redux";
import FindFriends from "../../component/FindFriends/FindFriends.jsx";

export default function ChatWindow() {
  const dispatch = useDispatch();
  const title = useSelector(state => state.header.title)

  return (
    <section className="chatWindow">
      <HeaderSection/>
      {title === "Chats" && <Chats/>}
      {title === "Find friends" && <FindFriends />}
    </section>
  )
}