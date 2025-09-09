import './Chats.css'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAllChats} from "../../http/slices/ChatSlice.jsx";
import ChatComponent from "../ChatComponent/ChatComponent.jsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";

export default function Chats() {
  const dispatch = useDispatch();
  const {chats, loading} = useSelector(state => state.chat)

  useEffect(() => {
    dispatch(findAllChats())
      .unwrap()
  }, [dispatch])

  return (
    <div className="chats">
      {loading && <LoadingSpinner />}
      {chats?.map(chat => <ChatComponent chat={chat} key={chat.id}/>)}
    </div>
  )
}