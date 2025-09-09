import './ChatContent.scss'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {findChatByUsername, sendMessage, setCurrentChat} from "../../http/slices/ChatSlice.jsx";
import {useNavigate} from "react-router-dom";
import Message from "../../component/Message/Message.jsx";

export default function ChatContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathParts = window.location.pathname.split("/");
  const username = pathParts[pathParts.length - 1];
  const messagesRef = useRef(null);
  const inputRef = useRef(null);
  const chat = useSelector(state => state.chat.currentChat);

  function goToChats() {
    dispatch(setCurrentChat(null));
    navigate("/");
  }

  function handleSend() {
    const message = inputRef.current.value;
    if (message.trim() === "") return;

    dispatch(sendMessage({
      content: message,
      chatId: chat.id
    }))

    inputRef.current.value = "";
  }

  useEffect(() => {
    console.log("In dispatch");
    if (username) {
      dispatch(findChatByUsername(username))
    }
  }, [dispatch, username])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chat?.messages]);

  return (
    <section className={"chatContentSection"}>
      <header className={"inChat"}>
        <h3>{username}</h3>
        <img src={"/back-button.png"} alt={"send"} onClick={goToChats} className={"backButton"}/>
      </header>
      <div className={"chatContent"}>
        <div className={"chatMessages"} ref={messagesRef}>
          {chat?.messages?.map((message, index) => {
            const nextMessage = chat?.messages[index + 1];

            return (
              <Message
                key={message.id ?? index}
                content={message.content}
                isSender={message.username !== username ? "sender" : ""}
                isLastMessage={nextMessage?.username !== message?.username}
                avatar={message.avatarUrl}
              />
            )
          })}
        </div>
        <div className={"sendMessageBlock"}>
          <textarea
            placeholder={"Write message"}
            className={"sendMessageInput"}
            rows={1}
            ref={inputRef}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
          />
          <img src={"/send-button.png"} alt={"send"} className={"sendButton"} onClick={handleSend}/>
        </div>
      </div>
    </section>
  )
}