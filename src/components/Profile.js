import "../profileStyles.scss";
import { TbFileOff } from "react-icons/tb";
import { RiUserUnfollowFill, RiDraftFill } from "react-icons/ri";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiFillHeart,
  AiFillDelete,
  AiFillEdit
} from "react-icons/ai";
import { FiActivity } from "react-icons/fi";
import { TiArrowForwardOutline } from "react-icons/ti";
import { useContext, useEffect, useState } from "react";
import { conManager } from "../context/TumblrContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const {
    user,
    handleLogout,
    url,
    filterItem,
    likes,
    allComments,
    getAllComments,
    newComment,
    setNewComment,
    postComment,
    postLike,
    filterLikes,
    userPosts,
    getUserPosts,
    handleDeletePost
  } = useContext(conManager);

  useEffect(() => {
    if (!user || user === "visitor") {
      navigate("/");
    } else {
      getUserPosts();
    }
  }, []);

  // console.log(userPosts)

  // function filterPosts(posts) {
  //   const for_this_post = posts.filter(({ user_id}) => user_id._id === user._id);
  //   return for_this_post;
  // }

  const [initial] = useState({
    posts: false,
    followers: false,
    activity: false,
    draft: false,
    logout: false
  });
  const [clicked, setClicked] = useState({ ...initial, draft: true });

  function handleDeleteComment(comment) {
    axios.delete(`${url}/comment/${comment}`).then((resp) => {
      getAllComments();
    });
  }

  return (
    <div className="profile-component ">
      <div className="profile-container">
        <div className="body-section">
          <div className="header">
            <div className="profile-image">
              <img src={`${url}/uploads/${user.image}`} alt="" />
            </div>
            <div className="header-text">Dashboard</div>
          </div>

          {clicked.posts ? (
            <div className="post-container">
              {userPosts.length ? (
                userPosts.map((post) => {
                  return (
                    <div className="post-area nopost bg-light" key={post._id}>
                      <div className="post">
                        <div className="options d-flex justify-content-end pointer">
                          <div
                            className="delete"
                            onClick={() => handleDeletePost(post._id)}
                          >
                            <AiFillDelete />
                          </div>
                        </div>
                        <div className="post-body">
                          <h4 className="post-title ps-3">{post.title}</h4>
                          <div className="image-area">
                            {post.image.map((img, ind) => {
                              return (
                                <img
                                  src={`${url}/uploads/${img}`}
                                  alt="post-postal"
                                  key={ind}
                                />
                              );
                            })}
                          </div>

                          <div className="post-text">{post.body} </div>
                        </div>

                        <div className="post-footer">
                          <div
                            className="notes pointer"
                            data-bs-toggle="modal"
                            data-bs-target={`#commentsmodal${post._id}`}
                          >
                            {filterItem(allComments, post._id).length} comments
                          </div>
                          <div className="notes">
                            {filterItem(likes, post._id).length} Likes
                          </div>

                          <div className="icons">
                            <button>
                              <TiArrowForwardOutline />
                            </button>

                            {/* COMMMENT MODAL */}
                            <div
                              className="modal fade"
                              id={`commentsmodal${post._id}`}
                              tabIndex="-1"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div
                                className="modal-dialog 
                              modal-dialog-centered
                               modal-dialog-scrollable"
                              >
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
                                      className="btn-close fs-6"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    {filterItem(allComments, post._id)
                                      .length ? (
                                      filterItem(allComments, post._id).map(
                                        (e) => {
                                          return (
                                            <p key={e._id} className="comments">
                                              <b>
                                                {e.user_id._id === user._id
                                                  ? "You"
                                                  : e.user_id.name}
                                              </b>
                                              : {e.text}
                                              <br />
                                              <span
                                                className="text-danger pointer ms-2"
                                                onClick={() => {
                                                  handleDeleteComment(e._id);
                                                }}
                                              >
                                                {" "}
                                                <AiFillDelete />{" "}
                                              </span>
                                            </p>
                                          );
                                        }
                                      )
                                    ) : (
                                      <div>
                                        <i> no comments yet.</i> be the first to
                                        comment.
                                      </div>
                                    )}
                                    <div></div>
                                  </div>
                                  <div className="modal-footer">
                                    <div className="new-comment-box">
                                      <input
                                        type="text"
                                        placeholder="enter new comment"
                                        value={newComment.text}
                                        onChange={(e) =>
                                          setNewComment({
                                            ...newComment,
                                            post_id: post._id,
                                            user_id: user._id,
                                            text: e.target.value
                                          })
                                        }
                                      />
                                      <button
                                        type="button"
                                        className="btn btn-primary fs-6"
                                        onClick={() => {
                                          if (user && user !== "visitor") {
                                            postComment(newComment);
                                            setNewComment({
                                              ...newComment,
                                              text: "",
                                              user_id: "",
                                              post_id: ""
                                            });
                                          }
                                        }}
                                      >
                                        add
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <button
                              data-bs-toggle="modal"
                              data-bs-target={`#commentsmodal${post._id}`}
                            >
                              <AiOutlineComment />
                            </button>

                            <button
                              onClick={() => {
                                if (user && user !== "visitor") {
                                  postLike({
                                    post_id: post._id,
                                    likedBy: user._id
                                  });
                                }
                              }}
                              className={
                                filterLikes(post._id, user._id).length
                                  ? "text-danger"
                                  : " unlike-icon"
                              }
                            >
                              {filterLikes(post._id, user._id).length ? (
                                <AiFillHeart />
                              ) : (
                                <AiOutlineHeart />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    // </div>
                  );
                })
              ) : (
                <div className="nopost  ">
                  <div className="no-post-text">
                    <TbFileOff className="icon" />
                    <p className="alert">No posts available</p>
                    <p className="btn post-now">Make your first post now</p>
                  </div>
                </div>
              )}
            </div>
          ) : clicked.followers ? (
            <div className="nopost  ">
              <div className="no-post-text">
                <RiUserUnfollowFill className="icon" />
                <p className="alert">You have no followers yet</p>
                <p className="btn post-now">
                  Create more contents to be in the <code>limelight</code>
                </p>
              </div>
            </div>
          ) : clicked.activity ? (
            <div className="nopost  ">
              <div className="no-post-text">
                <FiActivity className="icon" />
                <p className="alert">COMING SOON!!!</p>
                <p className="btn post-now">
                  We're working on giving you a track of your activities.{" "}
                  <code>Watchout</code> for this feature
                </p>
              </div>
            </div>
          ) : clicked.draft ? (
            <div className="nopost  ">
              <div className="no-post-text">
                <RiDraftFill className="icon" />
                <p className="alert">COMING SOON!!!</p>
                <p className="btn post-now">
                  Very soon you'd be able to write drafts and publish later.{" "}
                  <code>Watchout</code> for this feature
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="sidebar">
          <h4>{user.name}</h4>
          <div>
            <p
              className={
                clicked.posts
                  ? "w-100 item pointer p-2 clicked"
                  : "w-100 item pointer p-2"
              }
              onClick={() => setClicked({ ...initial, posts: true })}
            >
              Posts
            </p>
            <p
              className={
                clicked.followers
                  ? "w-100 item pointer p-2 clicked"
                  : "w-100 item pointer p-2"
              }
              onClick={() => setClicked({ ...initial, followers: true })}
            >
              Followers
            </p>
            <p
              className={
                clicked.activity
                  ? "w-100 item pointer p-2 clicked"
                  : "w-100 item pointer p-2"
              }
              onClick={() => setClicked({ ...initial, activity: true })}
            >
              Activity
            </p>
            <p
              className={
                clicked.draft
                  ? "w-100 item pointer p-2 clicked"
                  : "w-100 item pointer p-2"
              }
              onClick={() => setClicked({ ...initial, draft: true })}
            >
              Draft
            </p>
            <p
              className={
                clicked.logout
                  ? "w-100 item pointer p-2 clicked"
                  : "w-100 item pointer p-2"
              }
              onClick={() => {
                setClicked({ ...initial, logout: true });
                handleLogout(navigate);
              }}
            >
              logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
