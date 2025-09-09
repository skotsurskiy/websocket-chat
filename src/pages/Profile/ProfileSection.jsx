import {useDispatch, useSelector} from "react-redux";
import {API_URL} from "../../util/variables.js";
import {useNavigate} from "react-router-dom";
import './ProfileSection.scss'
import {useEffect, useRef, useState} from "react";
import {getProfile} from "../../http/slices/profileSlice.jsx";
import {updateProfile} from "../../http/slices/profileSlice.jsx";

export default function ProfileSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatar = useSelector(state => state.profile.avatarUrl)
  const usernameFromStore = useSelector(state => state.profile.username)
  const [newAvatar, setNewAvatar] = useState(null);
  const [username, setUsername] = useState(usernameFromStore);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (avatar !== null) {return}

    dispatch(getProfile())
      .unwrap()
      .then(profile => {
        setUsername(profile.username);
        setNewAvatar(null);
      });
  }, [dispatch, avatar])

  function handleAvatarClick() {
    fileInputRef.current.click();
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      setNewAvatar(e.target.files[0]);
    }
  }

  async function handleSave() {
    try {
      await dispatch(updateProfile({
        username: username === usernameFromStore ? null : username,
        file: newAvatar
      })).unwrap();

      await dispatch(getProfile()).unwrap();

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className={"profileSection"}>
      <img
        src={newAvatar ? URL.createObjectURL(newAvatar) : `${API_URL}${avatar}`}
        alt={"avatar"}
        className={"avatar profile"}
        onClick={handleAvatarClick}
      />

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <input
        type={"text"}
        className={"profileUsername"}
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <button onClick={handleSave}>Save</button>

      <button onClick={() => navigate("/")}>Go to chats</button>
    </section>
  )
}