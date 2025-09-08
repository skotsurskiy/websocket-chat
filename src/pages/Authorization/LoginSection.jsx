import {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../slices/authSlice.jsx";
import {Link, useNavigate} from "react-router-dom";
import {setToken} from "../../slices/tokenSlice.jsx";

export default function LoginSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({details: []});

  function login() {
    dispatch(loginUser({username, password}))
      .unwrap()
      .then((responseData) => {
        console.log('Login successful:', responseData);
        dispatch(setToken(responseData.token));
        navigate("/");
      })
      .catch((err) => {
        console.log('Login failed:', err);
        setError(err?.details?.length > 0 ? err : {details: ['Login failed']});
      })
  }

  return (
    <section className={"authorization login"}>
      <section className={"authContent"}>
        <label>Username</label>
        <input
          placeholder={"username"}
          maxLength={48}
          className={"input"}
          onChange={e => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          placeholder={"password"}
          maxLength={48}
          minLength={8}
          type="password"
          className={"input"}
          onChange={e => setPassword(e.target.value)}
        />

        {error?.details?.length > 0 && <p className="errorMessage">{error.details}</p>}

        <div className={"authButtons"}>
          <button
            className={"authButton"}
            disabled={!username || !password || password.length < 8}
            onClick={login}>
            Login
          </button>
          <button
            className={"redirectAuthButton"}
            onClick={() => navigate("../register")}
          >
            Doesn't have account?
          </button>
        </div>
      </section>
    </section>
  )
}