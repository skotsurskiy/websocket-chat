import {useState} from "react";
import {registerUser} from "../../slices/authSlice.jsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function RegisterSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ details: [] });

  function register() {
    if (password !== confirmPassword) {
      setError({ details: ['Passwords do not match, try again'] });
      return;
    }
    setError({ details: [] });
    dispatch(registerUser({ username, password, confirmPassword }))
      .unwrap()
      .then((responseData) => {
        console.log('Registration successful:', responseData);
        navigate("/");
      })
      .catch((err) => {
        console.log('Registration failed:', err);
        setError(err.details.length > 0 ? err : { details: ['Registration failed'] });
      });
  }

  return (
    <section className={"authorization register"}>
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

        <label>Confirm password</label>
        <input
          placeholder={"confirm password"}
          maxLength={48}
          minLength={8}
          type="password"
          className={"input"}
          onChange={e => setConfirmPassword(e.target.value)}
        />

        {error?.details?.length > 0 && <p className="errorMessage">{error.details}</p>}

        <div className={"authButtons"}>
          <button
            className={"authButton"}
            disabled={!username || !password || !confirmPassword}
            onClick={register}>
            Register
          </button>
          <button
            className={"redirectAuthButton"}
            onClick={() => navigate("../login")}
          >
            Already have account
          </button>
        </div>
      </section>
    </section>
  )
}