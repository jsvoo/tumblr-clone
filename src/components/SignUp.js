import "../signupStyles.scss";
import { FcGoogle } from "react-icons/fc";
import { GrClose, GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { BsApple, BsEnvelopeFill } from "react-icons/bs";
import { useContext, useState } from "react";
import { FaSleigh } from "react-icons/fa";
import { conManager } from "../context/TumblrContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  // const [empty, setEmpty] = useState({ email:false, password:false, signup: false, login: false });
  const [loginResponse, setLoginResponse] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [clicked, setClicked] = useState({
    noClick: true,
    byEmail: false,
    newUser: false,
    returningUser: false,
    loginBtn: false,
    newUserDetails: false
  });
  const {
    SignUp,
    setSignUp,
    url,
    setLogin,
    setUser,
    empty,
    setEmpty
  } = useContext(conManager);
  const [loginBody, setLoginBody] = useState({ email: "", password: "" });
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    image: "",
    current_verification: ""
  });
  const [verifyCode, setVerifyCode] = useState({
    ask: false,
    supplied_code: 0
  });
  const navigate = useNavigate();
  const formData = new FormData();
  formData.append("email", userDetails.email);
  formData.append("name", userDetails.name);
  formData.append("phone", userDetails.phone);
  formData.append("password", userDetails.password);
  formData.append("image", userDetails.image);
  formData.append("verified_at", new Date());
  formData.append("current_verification", userDetails.current_verification);
  formData.append("exp_time", "");
  formData.append("role_id", "63920c2baf2b7b09d3681156");

  const config = {
    headers: { "content-type": "multipart/form-data" }
  };

  async function validateLoginEmail() {
    await axios
      .post(`${url}/user/email`, loginBody)
      .then((resp) => {
        if (resp.data === true) {
          setClicked({
            ...clicked,
            returningUser: true,
            byEmail: false,
            noClick: false
          });
        } else {
          setClicked({
            ...clicked,
            newUser: true,
            byEmail: false,
            noClick: false
          });
        }
      })
      .catch((err) => console.log(err));
  }
  async function validateLogin(body) {
    await axios
      .post(`${url}/user/login`, body)
      .then((res) => {
        setLoginResponse(res.data);
        if (res.data.name) {
          setLogin(true);
          setSignUp(false);
          localStorage.setItem("user", JSON.stringify(res.data));
          setUser(res.data);
          if (res.data.role_id.role === "admin") {
            navigate("admin");
          }
        }
      })
      .catch((err) => console.log(err));
  }
  async function validateSignupEmail() {
    await axios
      .post(`${url}/user/signup/validemail`, {
        email: userDetails.email,
        name: userDetails.name
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data.verification_code) {
          setUserDetails({
            ...userDetails,
            current_verification: resp.data.verification_code
          });
          setVerifyCode({ ...verifyCode, ask: true });
          setClicked({ ...clicked, newUserDetails: false });
        }
      })
      .catch((err) => console.log(err));
  }
  async function signUp() {
    await axios
      .post(`${url}/user/create`, formData, config)
      .then((resp) => {
        if (resp.data.name) {
          validateLogin({
            email: resp.data.email,
            password: resp.data.password
          });
        }
        console.log(resp);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div
      className="signup-container"
      onClick={() => {
        setSignUp(false);
      }}
    >
      <div
        className="signup-body "
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div
          className="d-flex justify-content-end "
          onClick={() => setSignUp(false)}
        >
          <GrClose className="pointer" />
        </div>
        {clicked.byEmail ? (
          <div
            className="back"
            onClick={() =>
              setClicked({ ...clicked, byEmail: false, noClick: true })
            }
          >
            <GrFormPreviousLink className="back-arrow " />
          </div>
        ) : clicked.newUser ? (
          <div
            className="back"
            onClick={() =>
              setClicked({ ...clicked, newUser: false, byEmail: true })
            }
          >
            <GrFormPreviousLink className="back-arrow " />
          </div>
        ) : null}
        <div className="heading back">tumblr</div>

        {clicked.byEmail ? (
          <center className="collect-email">
            <p className="text-light">Enter your email to login or register</p>
            <div className="input">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setLoginBody({ ...loginBody, email: e.target.value });
                  setUserDetails({ ...userDetails, email: e.target.value });
                }}
              />
            </div>
            {empty === true && loginBody.email === "" ? (
              <p className="text-danger bg-light w-25 error-text">
                {" "}
                Email field is required
              </p>
            ) : null}
            <button
              onClick={() => {
                if (loginBody.email) {
                  validateLoginEmail();
                  setEmpty((prev) => (prev = false));
                } else {
                  setEmpty(true);
                }
                // handleFieldValidation()
              }}
            >
              Next <GrFormNextLink />
            </button>
          </center>
        ) : clicked.noClick ? (
          <>
            <p className="text-center text-light">
              Welcome yo your corner of the internet. You'll never be bored
              again
            </p>

            <center className="buttons-section">
              <h5>Sign up or log in:</h5>
              <p className="terms-p">
                By continuing, you agree to our{" "}
                <span className="terms-privacy-link">Terms of Service</span> and
                read our
                <span className="terms-privacy-link">Privacy Policy.</span>
              </p>
              <div className="button">
                <button disabled>
                  {" "}
                  <FcGoogle /> Continue with Google
                </button>
              </div>
              <div className="button">
                <button disabled>
                  {" "}
                  <BsApple />
                  Continue with Apple
                </button>
              </div>
              <div className="button">
                <button
                  onClick={() => {
                    setClicked({ ...clicked, byEmail: true });
                  }}
                >
                  {" "}
                  <BsEnvelopeFill /> Continue with email
                </button>
              </div>
            </center>
          </>
        ) : null}

        {clicked.newUser ? (
          <center className="collect-password collect-email">
            <p className="text-light">
              Welcome to your corner of the internet. <br /> Glad you're here
            </p>
            <div className="input">
              <input
                type="password"
                placeholder="Set a password"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
              />
            </div>
            {empty && userDetails.password === "" ? (
              <p className="text-danger">Password field is required </p>
            ) : null}
            <div className="input">
              <input
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                placeholder="Repeat password"
              />
            </div>
            {empty && repeatPassword === "" ? (
              <p className="text-danger">Repeat password field is required </p>
            ) : null}

            {repeatPassword && userDetails.password !== repeatPassword ? (
              <p className="text-danger">Passwords do not match</p>
            ) : null}
            <button
              onClick={() => {
                if (
                  userDetails.password &&
                  repeatPassword &&
                  userDetails.password === repeatPassword
                ) {
                  setClicked({
                    ...clicked,
                    newUserDetails: true,
                    newUser: false
                  });
                  setEmpty((prev) => (prev = false));
                } else {
                  setEmpty(true);
                }
              }}
            >
              Next <GrFormNextLink />
            </button>
          </center>
        ) : clicked.returningUser ? (
          <center className="collect-password-login collect-email">
            <p className="text-light">
              Welcome to your corner of the internet.
            </p>
            <div className="input">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setLoginBody({ ...loginBody, password: e.target.value })
                }
              />
            </div>
            {empty && loginBody.password === "" ? (
              <p className="text-danger">Password field is required </p>
            ) : null}
            <p className="text-decoration-underline text-light">
              Forgot your password?
            </p>
            <p className="text-danger">{loginResponse}</p>
            <button
              onClick={() => {
                if (loginBody.password) {
                  validateLogin(loginBody);
                } else {
                  setEmpty(true);
                }
              }}
            >
              Login <GrFormNextLink />
            </button>
          </center>
        ) : null}

        {clicked.newUserDetails ? (
          <center className="collect-password collect-email">
            <p className="text-light">
              Welcome to your corner of the internet. <br /> Glad you're here
            </p>
            <div className="input">
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
              />
              {empty && userDetails.name === "" ? (
                <p className="text-danger">Name field is required </p>
              ) : null}
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Enter your phone number"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, phone: e.target.value })
                }
              />
              {empty && userDetails.phone === "" ? (
                <p className="text-danger">Phone number field is required </p>
              ) : null}
            </div>
            <div className="input">
              <label className="text-light">Upload your photo</label> <br />
              <input
                type="file"
                placeholder="Upload image"
                multiple
                onChange={(e) => {
                  setUserDetails({ ...userDetails, image: e.target.files[0] });
                }}
              />
            </div>
            {empty && userDetails.image === "" ? (
              <p className="text-danger">Image field is required </p>
            ) : null}
            <button
              onClick={() => {
                if (
                  userDetails.name &&
                  userDetails.phone &&
                  userDetails.image
                ) {
                  validateSignupEmail();
                  setEmpty(false);
                } else {
                  setEmpty(true);
                }
              }}
            >
              Register <GrFormNextLink />
            </button>
          </center>
        ) : null}

        {verifyCode.ask ? (
          <center className="collect-password collect-email">
            <p className="text-light">
              Well-done! You're almost there.
              <br /> Please enter the verification code sent to your email:{" "}
              {userDetails.email}
            </p>
            <div className="input">
              <input
                type="text"
                placeholder="Verification code from email"
                onChange={(e) =>
                  setVerifyCode({
                    ...verifyCode,
                    supplied_code: e.target.value
                  })
                }
              />
            </div>

            <button
              onClick={() => {
                if (
                  Number(verifyCode.supplied_code) ===
                  userDetails.current_verification
                ) {
                  signUp();
                }
              }}
            >
              Verify Email <GrFormNextLink />
            </button>
          </center>
        ) : null}
      </div>
    </div>
  );
}
