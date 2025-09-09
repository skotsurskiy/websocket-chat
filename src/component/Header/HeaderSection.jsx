import './Header.css'
import {useDispatch, useSelector} from "react-redux";
import {setHeaderTitle} from "../../http/slices/headerSlice.jsx";
import {API_URL} from "../../util/variables.js";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProfile} from "../../http/slices/profileSlice.jsx";
import {logout} from "../../http/slices/authSlice.jsx";
import Cookies from "js-cookie";

export default function HeaderSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const title = useSelector(state => state.header.title)
  const avatar = useSelector(state => state.profile.avatarUrl)

  useEffect(() => {
    if (avatar === null && Cookies.get('token')) {
      dispatch(getProfile())
    }
  }, [dispatch, avatar])

  return (
    <header className={menuOpen ? 'open' : ''}>
      <div className={"menu"}>
        <h3>{title}</h3>

        <button className="menuToggle" onClick={() => setMenuOpen(prev => !prev)}>
          ☰
        </button>
      </div>

      <div className={`RightSideHeader ${menuOpen ? 'open' : ''}`}>
        <div className={"headerButtons"}>
          <button
            onClick={() =>
              dispatch(
                setHeaderTitle(title === "Chats" ? "Find friends" : "Chats")
              )
            }
          >
            {title === "Chats" ? "Add friend" : "Go to chats"}
          </button>
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/auth/login");
            }}
          >
            Logout
          </button>
        </div>
        <Link to="/me" className={"link-reset"}>
          <img src={`${API_URL}${avatar}`} alt="avatar" className={"avatar header"}/>
        </Link>
      </div>
    </header>)
}
