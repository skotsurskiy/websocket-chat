import './Header.css'
import {useDispatch, useSelector} from "react-redux";
import {setHeaderTitle} from "../../slices/headerSlice.jsx";
import {API_URL} from "../../util/variables.js";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getProfile} from "../../slices/profileSlice.jsx";
import {logout} from "../../slices/authSlice.jsx";

export default function HeaderSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const title = useSelector(state => state.header.title)
  const avatar = useSelector(state => state.profile.avatarUrl)

  useEffect(() => {
    if (avatar === null) {
      dispatch(getProfile())
    }
  })

  return (
    <header>
      <h3>{title}</h3>
      <div className={"RightSideHeader"}>
        <button
          onClick={() => dispatch(setHeaderTitle(title === "Chats" ? "Find friends" : "Chats"))}>
          {title === "Chats" ? "Add friend" : "Go to chats"}
        </button>
        <button
        onClick={() => {
          dispatch(logout());
          navigate("/auth/login");
        }}>
          Logout</button>
        <Link to="/me" className={"link-reset"}>
          <img src={`${API_URL}${avatar}`} alt="avatar" className={"avatar header"} />
        </Link>
      </div>
    </header>)
}
