import { SyntheticEvent, useState } from "react";
import axios from "axios";
import "./Auth.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [switchForm, setswitchForm] = useState(true);
  const changForm = () => {
    setswitchForm(!switchForm);
  };
  return (
    <div className="auth">
      {!switchForm && <Register changForm={changForm} />}
      {switchForm && <Login changForm={changForm} />}
    </div>
  );
}

const Register = ({ changForm }: { changForm: () => void }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErorrMsg] = useState("");
  const [, setCookies] = useCookies(["access_token"]);
  const navigate=useNavigate();

  const handelSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const result=await axios.post("http://localhost:3001/user/register", {
        username,
        email,
        password,
      });
      setCookies("access_token", result.data.token);
      localStorage.setItem("userID", result.data.userId);
      navigate("/")
    } catch (err: any) {
      setErorrMsg(err.response.data.massage);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handelSubmit}>
        <h2>Signup</h2>
        <div className="form-group">
          <input
            type="text "
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <button type="submit" className="logInBtn">
          Signup
        </button>
      </form>
      <p>
        Already have an account?
        <button className="switchAuthForm" onClick={changForm}>
          Login
        </button>
      </p>
      {errorMsg !== "" && (
        <div className="authErrMsg">
          <i>&#9888;</i> {errorMsg}
        </div>
      )}
    </div>
  );
};

const Login = ({ changForm }: { changForm: () => void }) => {
  const [userInput, setuserInput] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErorrMsg] = useState("");
  const [, setCookies] = useCookies(["access_token"]);

  const navigate=useNavigate();

  const handelSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/user/login", {
        userInput,
        password,
      });
      setCookies("access_token", result.data.token);
      localStorage.setItem("userID", result.data.userId);
      navigate("/")
    } catch (err: any) {
      setPassword("")
      setErorrMsg(err.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handelSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="text"
            id="userInput"
            value={userInput}
            placeholder="Username or Email"
            onChange={(e) => {
              setuserInput(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <button className="logInBtn" type="submit">
          Login
        </button>
      </form>
      <p>
        Don't have an account?
        <button className="switchAuthForm" onClick={() => changForm()}>
          Signup
        </button>
      </p>
      {errorMsg !== "" && (
        <div className="authErrMsg">
          <span>
            {" "}
            <i>&#9888;</i> {errorMsg}
          </span>
        </div>
      )}
    </div>
  );
};
