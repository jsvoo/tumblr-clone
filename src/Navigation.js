import "./navStyles.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaTumblr, FaSearch } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineExplore, MdBolt } from "react-icons/md";
import { BsEnvelopeFill } from "react-icons/bs";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { RiUser3Fill } from "react-icons/ri";
import { ImPencil } from "react-icons/im";
import { useContext, useState } from "react";
import SignUp from "./components/SignUp";
import { conManager } from "./context/TumblrContext";
import CreatePost from "./components/CreatePost";
import PostTypes from "./components/PostTypes";

export default function Navigation() {
  const [focused, setFocus] = useState(false);
  const navigate = useNavigate();

  const {
    signUp,
    setSignUp,
    view,
    setView,
    login,
    user,
    handleLogout
  } = useContext(conManager);

  return (
    <div className="navigation">
      {/* <CreatePost /> */}

      {view.postType ? <PostTypes /> : null}
      {view.textPost ? <CreatePost /> : null}
      {signUp ? <SignUp /> : null}
      <div>
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <Link className="navbar-brand">
              <FaTumblr className="logo" />
            </Link>
            <button
              className="navbar-toggler bg-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div
                // className="navbar-nav me-auto mb-2 mb-lg-0 search-section"
                className={
                  focused
                    ? "search-tumblr bck-white navbar-nav me-auto mb-2 mb-lg-0 search-section"
                    : "search-tumblr navbar-nav me-auto mb-2 mb-lg-0 search-section"
                }
              >
                <div className="">
                  <FaSearch className="search-icon " />
                </div>
                <input
                  type="search"
                  placeholder="Search Tumblr"
                  className={
                    focused ? "search-tumblr bck-white " : "search-tumblr"
                  }
                  onFocus={() => {
                    setFocus(true);
                  }}
                />
              </div>
              {user !== "visitor" ? (
                <div
                  className="text-light fs-6 text-center me-5 pointer"
                  onClick={() => handleLogout(navigate)}
                >
                  {user.name} <br /> logout
                </div>
              ) : null}
              {login ? (
                <div className="d-flex icons-section logged-in" role="search">
                  <div className="home">
                    <Link to="/">
                      {" "}
                      <AiFillHome className="nav-icon" />
                    </Link>
                  </div>
                  <div>
                    <MdOutlineExplore className="nav-icon text-light" />
                  </div>
                  <div>
                    <BsEnvelopeFill className="nav-icon" />
                  </div>
                  <div>
                    <TfiCommentsSmiley className="nav-icon" />
                  </div>
                  <div>
                    <MdBolt className="nav-icon" />
                  </div>

                  {/* PROFILE MODAL */}

                  <div>
                    <Link to={"/profile"}>
                      {" "}
                      <RiUser3Fill className="nav-icon" />{" "}
                    </Link>
                  </div>
                  <div
                    className="pen pointer"
                    onClick={() => setView({ ...view, postType: true })}
                  >
                    <ImPencil className="nav-icon" />
                  </div>
                </div>
              ) : (
                <div
                  className="d-flex icons-section not-logged-in"
                  role="search"
                >
                  <div className="home">
                    <button
                      className="login-btn"
                      onClick={() => {
                        setSignUp(true);
                      }}
                    >
                      Login
                    </button>
                  </div>
                  <div>
                    <button
                      className="signup-btn"
                      onClick={() => setSignUp(true)}
                    >
                      Sign up
                    </button>
                  </div>
                  {/* <div>
                    <button className="signup-btn">
                      <Link to="/admin">Admin</Link>{" "}
                    </button>
                  </div> */}
                </div>
              )}{" "}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
