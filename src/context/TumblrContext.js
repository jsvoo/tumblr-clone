import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const conManager = createContext();
export default function TumblrContext({ children }) {
  const url = "https://tumblr-api.cyclic.app/";
  const [empty, setEmpty] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [user, setUser] = useState("visitor");
  const [users, setUsers] = useState([]);
  const [postCategories, setCategories] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getAllPosts();
    getAllComments();
    getAllusers();
    getAllCategories();
    axios
      .get(`${url}/likes`)
      .then((resp) => setLikes(resp.data))
      .catch((err) => console.log(err));
    axios
      .get(`${url}/roles`)
      .then((resp) => setRoles(resp.data))
      .catch((err) => console.log(err));

    let loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
      setLogin(true);
    }
  }, []);

  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const [signUp, setSignUp] = useState(false);
  const [view, setView] = useState({
    postType: false,
    textPost: false
  });
  // const loginBody = useState({ email: "", password: "" });
  const [login, setLogin] = useState(false);
  const [newComment, setNewComment] = useState({
    post_id: "",
    user_id: "",
    text: ""
  });
  const exportData = {
    empty,
    setEmpty,
    signUp,
    setSignUp,
    view,
    setView,
    url,
    users,
    roles,
    posts,
    setPosts,
    getAllPosts,
    userPosts,
    setUserPosts,
    getUserPosts,
    login,
    setLogin,
    allComments,
    setAllComments,
    // comments,
    // setComments,
    // getComments,
    getAllComments,
    user,
    setUser,
    getAllusers,
    handleLogout,
    likes,
    setLikes,
    postLike,
    filterLikes,
    newComment,
    setNewComment,
    postComment,
    postCategories,
    getAllCategories,
    filterItem,
    handleDeletePost,
    handleDeleteUser
    // handleDeleteComment
    // validateLogin
  };

  function postComment(newComment) {
    axios
      .post(`${url}/comment/create`, newComment)
      .then((resp) => {
        setNewComment({ ...newComment, text: "" });
        axios
          .get(`${url}/comments`)
          .then((res) => setAllComments(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
  function filterLikes(postId, userId) {
    const liked_by_user = likes.filter(
      ({ post_id, likedBy }) => post_id._id === postId && likedBy._id === userId
    );
    return liked_by_user;
  }
  function postLike(body) {
    axios
      .post(`${url}/like`, body)
      .then((resp) => {
        axios
          .get(`${url}/likes`)
          .then((resp) => setLikes(resp.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
  function filterItem(item, postId) {
    const for_this_post = item.filter(({ post_id }) => postId === post_id._id);
    return for_this_post;
  }
  function handleLogout(navigate) {
    localStorage.removeItem("user");
    setLogin(false);
    setUser("visitor");
    navigate("/", { replace: true });
  }
  function getAllusers() {
    const reversed = [];
    axios.get(`${url}/users`).then((resp) => {
      let data = resp.data;
      for (let i = data.length - 1; i >= 0; i--) {
        reversed.push(data[i]);
      }
      setUsers(reversed);
    });
  }
  function getAllPosts() {
    const reversed = [];
    axios.get(`${url}/posts`).then((resp) => {
      let data = resp.data;
      for (let i = data.length - 1; i >= 0; i--) {
        reversed.push(data[i]);
      }
      setPosts(reversed);
    });
  }

  function getUserPosts() {
    const reversed = [];
    if (user && user !== "visitor") {
      axios
        .get(`${url}/user/${user._id}/posts`)
        .then((resp) => {
          if (resp.data.length) {
            for (let i = resp.data.length - 1; i >= 0; i--) {
              reversed.push(resp.data[i]);
            }
          }
          setUserPosts(reversed);
        })
        .catch((err) => console.log(err));
    }
  }

  function getAllComments() {
    axios
      .get(`${url}/comments`)
      .then((response) => setAllComments(response.data))
      .catch((err) => console.log(err));
  }

  function getAllCategories() {
    axios
      .get(`${url}/posts/categories`)
      .then((resp) => setCategories(resp.data))
      .catch((err) => console.log(err));
  }

  function handleDeletePost(id) {
    axios
      .delete(`${url}/post/${id}`)
      .then((resp) => {
        console.log(resp.data);
        getUserPosts();
        getAllPosts();
      })
      .catch((err) => console.log(err));
  }
  function handleDeleteUser(id) {
    axios
      .delete(`${url}/user/${id}`)
      .then((resp) => {
        console.log(resp.data);
        getAllusers();
      })
      .catch((err) => console.log(err));
  }

  // function handleDeleteComment(comment) {
  //   axios.delete(`${url}/comment/${comment}`).then((resp) => {
  //     console.log(resp);
  //     getComments();
  //   });
  // }
  return (
    <conManager.Provider value={exportData}>{children}</conManager.Provider>
  );
}
