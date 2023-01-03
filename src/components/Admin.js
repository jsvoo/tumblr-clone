import "./adminStyle.scss";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaLock,
  FaTrash,
  FaEdit,
  FaExpandArrowsAlt,
  FaImage
} from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { CgNametag } from "react-icons/cg";
import { MdTitle } from "react-icons/md";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { conManager } from "../context/TumblrContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const {
    url,
    posts,
    getAllPosts,
    postCategories,
    getAllCategories,
    users,
    roles,
    getAllusers,
    user,
    setUser,
    handleDeletePost,
    handleDeleteUser,
    empty,
    setEmpty
  } = useContext(conManager);
  useEffect(() => {
    // let loggedUser = localStorage.getItem("user");
    // if (loggedUser) {
    //   setUser(JSON.parse(loggedUser));
    // }
    if (user !== "visitor") {
      if (user.role_id.role !== "admin") {
        navigate("/", { replace: true });
      }
    }
  }, [user]);

  const [initial] = useState({
    dashboard: false,
    managePost: false,
    manageUser: false,
    createPost: false,
    createUser: false,
    createPostcategory: false
  });
  const [navButton, setNavButton] = useState({
    ...initial,
    dashboard: true
  });
  const [editDetails, setEditDetails] = useState({ phone: "", role_id: "" });
  const [updated, setUpdated] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    date: new Date(),
    body: "",
    user_id: user._id,
    post_category_id: "",
    image: [],
    likes: 0
  });
  const [newCategory, setNewCategory] = useState("");
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    image: "",
    current_verification: "",
    role_id: ""
  });
  const [success, setSuccess] = useState({
    createPost: false,
    createUser: false,
    existing: false
  });
  const config = { headers: { "content-type": "multipart/form-data" } };
  function postPost() {
    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("excerpt", newPost.excerpt);
    formData.append("date", newPost.date);
    formData.append("body", newPost.body);
    formData.append("user_id", newPost.user_id);
    formData.append("post_category_id", newPost.post_category_id);
    formData.append("likes", newPost.likes);

    if (newPost.image.length) {
      Array.from(newPost.image).forEach((img) => {
        formData.append("image", img);
      });
    }
    if (
      newPost.title &&
      newPost.body &&
      newPost.post_category_id &&
      newPost.user_id
    ) {
      axios
        .post(`${url}/post/create`, formData, config)
        .then((resp) => {
          console.log(resp);
          axios
            .get(`${url}/posts`)
            .then((resp) => {
              console.log(resp.data);
              getAllPosts();
              setSuccess({ ...success, createUser: true });
            })
            .catch((err) => console.log(err));
          setNewPost({
            ...newPost,
            title: "",
            body: "",
            post_category_id: "",
            excerpt: ""
          });
          setEmpty(false);
        })
        .catch((err) => console.log(err));
    } else {
      setEmpty(true);
    }
  }
  function createUser() {
    const formData = new FormData();
    formData.append("email", userDetails.email);
    formData.append("name", userDetails.name);
    formData.append("phone", userDetails.phone);
    formData.append("password", userDetails.password);
    formData.append("image", userDetails.image);
    formData.append("verified_at", "");
    formData.append("current_verification", userDetails.current_verification);
    formData.append("exp_time", "");
    formData.append("role_id", userDetails.role_id);
    if (
      userDetails.email &&
      userDetails.name &&
      userDetails.phone &&
      userDetails.password &&
      userDetails.role_id
    ) {
      axios
        .post(`${url}/user/create`, formData, config)
        .then((resp) => {
          console.log(resp);
          console.log(resp.data);
          getAllusers();
          if (resp.data.name) {
            setUserDetails({
              ...userDetails,
              name: "",
              phone: "",
              email: "",
              password: ""
            });
            setSuccess({ ...success, createUser: true, existing: false });
            setEmpty(false);
          } else {
            setSuccess({ ...success, existing: true, createUser: false });
          }
        })
        .catch((err) => console.log(err));
    } else {
      setEmpty(true);
    }
  }
  function updateUser() {
    axios
      .put(`${url}/user`, editDetails)
      .then((resp) => {
        console.log(resp.data);
        getAllusers();
        setUpdated(true);
      })
      .catch((err) => console.log(err));
  }
  function createCategory() {
    axios
      .post(`${url}/create-post-category`, { post_category: newCategory })
      .then((resp) => {
        console.log(resp.data);
        getAllCategories();
        setNewCategory("");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="admin-container">
      <div className="adminPage ">
        <div className="sidebar">
          <div className="profile-container">
            <div className="profile">
              <img src={`${url}/uploads/${user.image}`} className="" alt="" />
            </div>
          </div>
          <center>{user.name}</center>
          <div className="nav-button-div">
            <button
              onClick={() => setNavButton({ ...initial, dashboard: true })}
            >
              Dashboard
            </button>
          </div>

          <div className="nav-button-div">
            <button
              onClick={() => setNavButton({ ...initial, managePost: true })}
            >
              Manage posts
            </button>
          </div>

          <div className="nav-button-div">
            <button
              onClick={() => setNavButton({ ...initial, manageUser: true })}
            >
              Manage users
            </button>
          </div>

          <div className="nav-button-div">
            <button
              onClick={() => setNavButton({ ...initial, createPost: true })}
            >
              Create Posts
            </button>
          </div>

          <div className="nav-button-div">
            <button
              onClick={() => setNavButton({ ...initial, createUser: true })}
            >
              Create Users
            </button>
          </div>

          <div className="nav-button-div">
            <button
              onClick={() =>
                setNavButton({ ...initial, createPostcategory: true })
              }
            >
              Create post categories
            </button>
          </div>
        </div>

        <div className="admin-body">
          {navButton.dashboard && (
            <div className="dashboard-content">
              <div className="flex dashboard-row1">
                <div className="post-count count">
                  <center>
                    <p className="fs-1 base-color">{posts.length}</p>
                    <p>Total posts</p>
                  </center>
                </div>

                <div className="users-count count">
                  <center>
                    <p className="fs-1 base-color">{users.length}</p>
                    <p>Total users</p>
                  </center>
                </div>
              </div>

              <div className="post-rank  ">
                <p className=" fs-4"> Top ranking posts</p>

                <div className="flex post-row">
                  <div className="post">
                    <div>
                      {" "}
                      <b>Post Title :</b> 10 Things to Consider Before Choosing
                      a Career in Tech
                    </div>
                    <div>
                      {" "}
                      <b>Post Author :</b> Deen
                    </div>
                    <div>
                      {" "}
                      <b>Liked By :</b>
                      <span className="text-primary"> 76k+</span>
                    </div>
                  </div>

                  <div className="post">
                    <div>
                      {" "}
                      <b>Post Title :</b> Why is Google not spelt "Gugu"?
                    </div>
                    <div>
                      {" "}
                      <b>Post Author :</b> Anonymous
                    </div>
                    <div>
                      {" "}
                      <b>Liked By :</b>
                      <span className="text-primary"> 51k+</span>
                    </div>
                  </div>
                  <div className="post">
                    <div>
                      {" "}
                      <b>Post Title :</b> Why God de help mumu?
                    </div>
                    <div>
                      {" "}
                      <b>Post Author :</b> Emeka Emmanuel
                    </div>
                    <div>
                      {" "}
                      <b>Liked By :</b>
                      <span className="text-primary"> 42k+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {navButton.createUser && (
            <div className="create-user-section">
              <form>
                <center>
                  <h1>Create User</h1>
                </center>

                <div className="input-area">
                  <div>
                    <label>
                      <CgNametag className="icon" /> Name
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="input"
                    value={userDetails.name}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, name: e.target.value })
                    }
                  />
                  {empty && userDetails.name === "" ? (
                    <p className="text-danger fs-6">Name field is required</p>
                  ) : null}
                </div>
                <div className="input-area">
                  <div>
                    <label>
                      <FaEnvelope className="icon" /> Email Address
                    </label>
                  </div>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="input"
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, email: e.target.value })
                    }
                  />
                  {empty && userDetails.email === "" ? (
                    <p className="text-danger fs-6">Email field is required</p>
                  ) : null}
                </div>
                <div className="input-area">
                  <div>
                    <label>
                      <FaPhoneAlt className="icon" /> Phone
                    </label>
                  </div>
                  <input
                    type="number"
                    placeholder="Enter phone number"
                    className="input"
                    value={userDetails.phone}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, phone: e.target.value })
                    }
                  />
                  {empty && userDetails.phone === "" ? (
                    <p className="text-danger fs-6">Phone field is required</p>
                  ) : null}
                </div>
                <div className="input-area">
                  <div>
                    <label>
                      <FaLock className="icon" /> Password
                    </label>
                  </div>
                  <input
                    type="password"
                    placeholder="Create strong password"
                    className="input"
                    value={userDetails.password}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value
                      })
                    }
                  />
                  {empty && userDetails.password === "" ? (
                    <p className="text-danger fs-6">
                      Password field is required
                    </p>
                  ) : null}
                </div>
                <div className="input-area">
                  <div>
                    <label>
                      <FaImage className="icon" /> Image
                    </label>
                  </div>
                  <input
                    type="file"
                    className="input"
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        image: e.target.files[0]
                      })
                    }
                  />
                </div>
                <div className="input-area">
                  <div>
                    <label>
                      <FaImage className="icon" /> Assign Role
                    </label>
                  </div>
                  <select
                    name=""
                    id=""
                    className="input"
                    value={userDetails.role_id}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        role_id: e.target.value
                      })
                    }
                  >
                    <option value="">Select role to assign</option>
                    {roles.length
                      ? roles.map((role) => {
                          return (
                            <option value={role._id} key={role._id}>
                              {role.role}
                            </option>
                          );
                        })
                      : null}
                  </select>
                  {empty && userDetails.role_id === "" ? (
                    <p className="text-danger fs-6">Role field is required</p>
                  ) : null}
                </div>
                {success.createUser && (
                  <p className="text-success">User created successfully</p>
                )}
                {success.existing && (
                  <p className="text-danger">User with email already exists</p>
                )}
                <button
                  type="button"
                  className="create-btn"
                  onClick={() => createUser()}
                >
                  Create User
                </button>
              </form>
            </div>
          )}

          {navButton.createPost && (
            <div className=" create Post create-user-section">
              <form>
                <center>
                  <h1>Create Post</h1>
                </center>

                <div className="input-area">
                  <div>
                    <label>
                      <MdTitle className="icon" /> Post title
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input"
                    value={newPost.title}
                    onChange={(e) =>
                      setNewPost({
                        ...newPost,
                        title: e.target.value,
                        user_id: user._id
                      })
                    }
                  />
                  {empty && newPost.title === "" ? (
                    <p className="text-danger fs-6">Title field is required</p>
                  ) : null}
                </div>

                <div className="input-area">
                  <div>
                    <label>
                      <MdTitle className="icon" /> Post excerpt
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input"
                    value={newPost.excerpt}
                    onChange={(e) =>
                      setNewPost({ ...newPost, excerpt: e.target.value })
                    }
                  />
                </div>
                <div className="input-area">
                  <div>
                    <label>
                      <MdTitle className="icon" /> Post category
                    </label>
                  </div>
                  <select
                    name=""
                    id=""
                    className="input"
                    value={newPost.post_category_id}
                    onChange={(e) =>
                      setNewPost({
                        ...newPost,
                        post_category_id: e.target.value
                      })
                    }
                  >
                    <option value="">Select post category</option>
                    {postCategories.length
                      ? postCategories.map((e) => {
                          return (
                            <option value={e._id} key={e._id}>
                              {" "}
                              {e.post_category}{" "}
                            </option>
                          );
                        })
                      : null}
                  </select>
                  {empty && newPost.post_category_id === "" ? (
                    <p className="text-danger fs-6">
                      Post category is required
                    </p>
                  ) : null}
                </div>

                <div className="input-area">
                  <div>
                    <label htmlFor="body">
                      <BsFileEarmarkTextFill className="icon" /> Post Body
                    </label>
                  </div>

                  <textarea
                    id="body"
                    className="input"
                    rows={10}
                    value={newPost.body}
                    onChange={(e) =>
                      setNewPost({ ...newPost, body: e.target.value })
                    }
                  />
                  {empty && newPost.body === "" ? (
                    <p className="text-danger fs-6">Post body is required</p>
                  ) : null}
                </div>

                <div className="input-area">
                  <div>
                    <label>
                      <MdTitle className="icon" /> Add images
                    </label>
                  </div>
                  <input
                    type="file"
                    multiple
                    placeholder=""
                    className="input"
                    onChange={(e) =>
                      setNewPost({ ...newPost, image: e.target.files })
                    }
                  />
                </div>
                {success.createPost && (
                  <p className="text-success"> Post created successfully</p>
                )}
                <button
                  type="button"
                  className="create-btn"
                  onClick={() => postPost()}
                >
                  Create Post
                </button>
              </form>
            </div>
          )}

          {navButton.createPostcategory && (
            <div className=" create Post create-user-section">
              <form>
                <center>
                  <h1>Create Post Categories</h1>
                </center>

                <div className="input-area">
                  <div>
                    <label>
                      <MdTitle className="icon" /> New category
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="create-btn"
                  onClick={() => createCategory()}
                >
                  Add Category
                </button>
              </form>
              <h5 className="mt-4">Existing Categories</h5>
              {postCategories.length ? (
                postCategories.map((e) => {
                  return (
                    <ul key={e._id}>
                      <li>{e.post_category}</li>
                    </ul>
                  );
                })
              ) : (
                <p>No categories yet</p>
              )}
            </div>
          )}

          {navButton.manageUser && (
            <div className="users-row">
              {users.length ? (
                users.map((e) => {
                  return (
                    <div
                      className={
                        e.role_id.role === "admin" ? "user admin-box " : "user"
                      }
                      key={e._id}
                    >
                      {e.role_id.role === "admin" && (
                        <div className="d-flex justify-content-end">
                          <MdOutlineAdminPanelSettings className="admin-badge m-2" />
                        </div>
                      )}

                      <div>
                        <b>Name:</b> {e.name}
                      </div>
                      <div>
                        <b>Email:</b> {e.email}
                      </div>
                      <div>
                        <b>Phone:</b> {e.phone}
                      </div>
                      <div>
                        <b>Role:</b> {e.role_id.role}
                      </div>

                      {/* <!-- Edit User Modal --> */}
                      <div
                        className="modal fade"
                        id={`editUser${e._id}`}
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Edit {e.name}'s Details
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <form className="editUserForm">
                                <div>
                                  <input type="text" disabled value={e.name} />
                                </div>
                                <div>
                                  <input type="text" disabled value={e.email} />
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    value={editDetails.phone}
                                    onChange={(a) =>
                                      setEditDetails({
                                        ...editDetails,
                                        phone: a.target.value
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  {/* <label htmlFor="role">Role */}
                                  Change Role
                                  <select
                                    id="role"
                                    name="role_id"
                                    onChange={(a) =>
                                      setEditDetails({
                                        ...editDetails,
                                        role_id: a.target.value
                                      })
                                    }
                                  >
                                    <option value={e.role_id._id}>
                                      {e.role_id.role}
                                    </option>
                                    {/* <option value="63920c1faf2b7b09d3681154">
                                      admin
                                    </option> */}
                                    {roles.length
                                      ? roles.map((role) => {
                                          if (role._id !== e.role_id._id) {
                                            return (
                                              <option
                                                value={role._id}
                                                key={role._id}
                                              >
                                                {role.role}
                                              </option>
                                            );
                                          }
                                        })
                                      : null}
                                  </select>
                                  {/* </label> */}
                                </div>
                              </form>
                              {updated && (
                                <p className="text-success">User updated</p>
                              )}
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                  updateUser();
                                }}
                              >
                                Update Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="buttons">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target={`#editUser${e._id}`}
                          onClick={() => {
                            setEditDetails({
                              ...editDetails,
                              phone: e.phone,
                              role_id: e.role_id._id,
                              id: e._id
                            });
                          }}
                        >
                          <FaEdit className="icon" />
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteUser(e._id);
                          }}
                        >
                          <FaTrash className="icon" />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No registered users yet.</p>
              )}

              {/* <div className="user">
                <div>
                  <b>Name:</b> John Doe
                </div>
                <div>
                  <b>Email:</b> John@doe.com
                </div>
                <div>
                  <b>Phone:</b> 080123456789
                </div>

                <div className="buttons">
                  <button>
                    <FaEdit className="icon" />
                  </button>
                  <button>
                    <FaTrash className="icon" />
                  </button>
                </div>
              </div>

              <div className="user">
                <div>
                  <b>Name:</b> John Doe
                </div>
                <div>
                  <b>Email:</b> John@doe.com
                </div>
                <div>
                  <b>Phone:</b> 080123456789
                </div>

                <div className="buttons">
                  <button>
                    <FaEdit className="icon" />
                  </button>
                  <button>
                    <FaTrash className="icon" />
                  </button>
                </div>
              </div>

              <div className="user">
                <div>
                  <b>Name:</b> John Doe
                </div>
                <div>
                  <b>Email:</b> John@doe.com
                </div>
                <div>
                  <b>Phone:</b> 080123456789
                </div>

                <div className="buttons">
                  <button>
                    <FaEdit className="icon" />
                  </button>
                  <button>
                    <FaTrash className="icon" />
                  </button>
                </div>
              </div>

              <div className="user">
                <div>
                  <b>Name:</b> John Doe
                </div>
                <div>
                  <b>Email:</b> John@doe.com
                </div>
                <div>
                  <b>Phone:</b> 080123456789
                </div>

                <div className="buttons">
                  <button>
                    <FaEdit className="icon" />
                  </button>
                  <button>
                    <FaTrash className="icon" />
                  </button>
                </div>
              </div>

              <div className="user">
                <div>
                  <b>Name:</b> John Doe
                </div>
                <div>
                  <b>Email:</b> John@doe.com
                </div>
                <div>
                  <b>Phone:</b> 080123456789
                </div>

                <div className="buttons">
                  <button>
                    <FaEdit className="icon" />
                  </button>
                  <button>
                    <FaTrash className="icon" />
                  </button>
                </div>
              </div>
              <div className="user">
                <div>
                  <b>Name:</b> Johnathan Amedu Isah
                </div>
                <div>
                  <b>Email:</b> jonathan.amedu.i@gmail.com
                </div>
                <div>
                  <b>Phone:</b> 080123456789
                </div>

                <div className="buttons">
                  <button>
                    <FaEdit className="icon" />
                  </button>
                  <button>
                    <FaTrash className="icon" />
                  </button>
                </div>
              </div>
             */}
            </div>
          )}

          {navButton.managePost && (
            <div className="users-row">
              {posts.length ? (
                posts.map((post) => {
                  return (
                    <div className="user" key={post._id}>
                      <div className="user-text-area">
                        <div>
                          <b>Title: </b> {post.title} <br />
                          <b>Author: </b> {post.user_id.name}
                        </div>
                      </div>

                      {/* <!-- Full-Post Modal --> */}
                      <div
                        className="modal fade"
                        id={`fullpost${post._id}`}
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                {post.title}
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="image-area">
                                {post.image.map((img, ind) => {
                                  return (
                                    <div key={ind}>
                                      <img
                                        src={`${url}/uploads/${img}`}
                                        alt="post-postal"
                                        className="img-fluid"
                                        key={ind}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                              {post.body}
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              {/* <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={()=>{ 
                                    handleDeletePost(post._id)
                                  }}
                                >
                                  Delete post
                                </button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="buttons">
                        <button
                          onClick={() => {
                            handleDeletePost(post._id);
                          }}
                        >
                          <FaTrash className="icon" />
                        </button>

                        <button
                          data-bs-toggle="modal"
                          data-bs-target={`#fullpost${post._id}`}
                        >
                          {/* <Link to={`post/${post._id}`}> */}
                          <FaExpandArrowsAlt className="icon" />
                          {/* </Link> */}
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No posts yet</p>
              )}

              {/* <div className="user">
                <div className="user-text-area">
                  <div>
                    <b>Title: </b> Introduction to Advanced Lipid Metabolism
                  </div>
                  <div className="post-body-format">
                    <b>Body:</b> <br />
                    He was abandoned on the highway and hit by a car when I
                    tried for 45 minutes to save him. In a miserable state I
                    rushed him to the vet and paid for everything. I decided
                    that this animal came to stay in my life. After 3 years he
                    is now fine but with a different look. I tell him every day
                    that this is not who he is!!!He is the bravest dog I know.He
                    wants to live and is so happy to play with me and my other
                    dogs!!!Disabled animals deserve chances at life and family
                    just like the disabled person. My child is the most
                    beautiful and unique in the world!!" ❤
                  </div>
                </div>

                <div className="buttons">
                  <button>
                    <FaEdit className="icon" />
                  </button>
                  <button>
                    <FaTrash className="icon" />
                  </button>
                </div>
              </div>

              <div className="user">
                <div className="user-text-area">
                  <div>
                    <b>Title: </b> Introduction to Advanced Lipid Metabolism
                  </div>
                  <div className="post-body-format">
                    <b>Body:</b> <br />
                    He was abandoned on the highway and hit by a car when I
                    tried for 45 minutes to save him. In a miserable state I
                    rushed him to the vet and paid for everything. I decided
                    that this animal came to stay in my life. After 3 years he
                    is now fine but with a different look. I tell him every day
                    that this is not who he is!!!He is the bravest dog I know.He
                    wants to live and is so happy to play with me and my other
                    dogs!!!Disabled animals deserve chances at life and family
                    just like the disabled person. My child is the most
                    beautiful and unique in the world!!" ❤
                  </div>
                </div>

                <div className="buttons">
                  <button>
                    <FaEdit className="icon" />
                  </button>
                  <button>
                    <FaTrash className="icon" />
                  </button>
                </div>
              </div>

              <div className="user">
                <div className="user-text-area">
                  <div>
                    <b>Title: </b> Introduction to Advanced Lipid Metabolism
                  </div>
                  <div className="post-body-format">
                    <b>Body:</b> <br />
                    He was abandoned on the highway and hit by a car when I
                    tried for 45 minutes to save him. In a miserable state I
                    rushed him to the vet and paid for everything. I decided
                    that this animal came to stay in my life. After 3 years he
                    is now fine but with a different look. I tell him every day
                    that this is not who he is!!!He is the bravest dog I know.He
                    wants to live and is so happy to play with me and my other
                    dogs!!!Disabled animals deserve chances at life and family
                    just like the disabled person. My child is the most
                    beautiful and unique in the world!!" ❤
                  </div>
                </div>

                <div className="buttons">
                  <button>
                    <FaEdit className="icon" />
                  </button>
                  <button>
                    <FaTrash className="icon" />
                  </button>
                </div>
              </div>

              <div className="user">
                <div className="user-text-area">
                  <div>
                    <b>Title: </b> Introduction to Advanced Lipid Metabolism
                  </div>
                  <div className="post-body-format">
                    <b>Body:</b> <br />
                    He was abandoned on the highway and hit by a car when I
                    tried for 45 minutes to save him. In a miserable state I
                    rushed him to the vet and paid for everything. I decided
                    that this animal came to stay in my life. After 3 years he
                    is now fine but with a different look. I tell him every day
                    that this is not who he is!!!He is the bravest dog I know.He
                    wants to live and is so happy to play with me and my other
                    dogs!!!Disabled animals deserve chances at life and family
                    just like the disabled person. My child is the most
                    beautiful and unique in the world!!" ❤
                  </div>
                </div>

                <div className="buttons">
                  <button>
                    <FaEdit className="icon" />
                  </button>
                  <button>
                    <FaTrash className="icon" />
                  </button>
                </div>
              </div>

              <div className="user">
                <div className="user-text-area">
                  <div>
                    <b>Title: </b> Introduction to Advanced Lipid Metabolism
                  </div>
                  <div className="post-body-format">
                    <b>Body:</b> <br />
                    He was abandoned on the highway and hit by a car when I
                    tried for 45 minutes to save him. In a miserable state I
                    rushed him to the vet and paid for everything. I decided
                    that this animal came to stay in my life. After 3 years he
                    is now fine but with a different look. I tell him every day
                    that this is not who he is!!!He is the bravest dog I know.He
                    wants to live and is so happy to play with me and my other
                    dogs!!!Disabled animals deserve chances at life and family
                    just like the disabled person. My child is the most
                    beautiful and unique in the world!!" ❤
                  </div>
                </div>

                <div className="buttons">
                  <button>
                    <FaEdit className="icon" />
                  </button>
                  <button>
                    <FaTrash className="icon" />
                  </button>
                </div>
              </div>
          
           */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
