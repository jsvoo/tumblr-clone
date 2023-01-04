import {
  AiOutlineHeart,
  AiFillEdit,
  AiFillDelete,
  AiOutlineComment,
  AiFillHeart
} from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { TiArrowForwardOutline } from "react-icons/ti";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { conManager } from "../context/TumblrContext";

export default function FullPost() {
  const [thisPost, setThisPost] = useState("");
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const {
    url,
    user,
    newComment,
    setNewComment,
    postComment,
    likes,
    postLike,
    filterLikes,
    filterItem
  } = useContext(conManager);
  const [editComment, setEditComments] = useState({ ...newComment, id: "" });

  useEffect(() => {
    axios
      .get(`${url}/post/${id}`)
      .then((resp) => {
        setThisPost(resp.data);
      })
      .catch((err) => console.log(err));

    getComments();
  });

  function getComments() {
    axios
      .get(`${url}/comments/${id}`)
      .then((resp) => {
        setComments(resp.data);
      })
      .catch((err) => console.log(err));
  }
  function handleDeleteComment(comment) {
    axios.delete(`${url}/comment/${comment}`).then((resp) => {
      getComments();
    });
  }
  function handleUpdateCommensEdit() {
    axios.put(`${url}/comment`, editComment).then((resp) => {
      console.log(resp.data);
    });
  }

  return (
    <div className="fullPost-page">
      <center>
        <h1 className="mt-4 mb-4 text-light">{thisPost.title}</h1>
      </center>
      {thisPost ? (
        <div className="post-area">
          <div className="author-img">
            <img
              src={`${url}/uploads/${thisPost.user_id.image}`}
              alt="Post author"
              className=""
            />
          </div>
          <div className="post">
            <div className="post-header">
              <div className="author">
                <div className="username">{thisPost.user_id.name}</div>
                <div className="follow">Follow</div>
              </div>

              <div className="options">
                <FiMoreHorizontal />
              </div>
            </div>
            <div className="post-body">
              <div className="image-area">
                {thisPost.image.map((img, ind) => {
                  return (
                    <div key={ind}>
                      <img
                        src={`${url}/uploads/${img}`}
                        alt="post-postal"
                        key={ind}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="post-text">{thisPost.body}</div>
            </div>
            <div className="post-footer">
              <div className="notes">{comments.length} comments</div>
              <div className="notes">{filterItem(likes, id).length} Likes</div>
              <div className="icons">
                <button>
                  <TiArrowForwardOutline />
                </button>
                <button>
                  <AiOutlineComment />
                </button>
                <button
                  className={
                    filterLikes(thisPost._id, user._id).length
                      ? "text-danger"
                      : " unlike-icon"
                  }
                  onClick={() => {
                    if (user && user !== "visitor") {
                      postLike({
                        post_id: thisPost._id,
                        likedBy: user._id
                      });
                    }
                  }}
                >
                  {filterLikes(thisPost._id, user._id).length ? (
                    <AiFillHeart />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No data for selected post</p>
      )}

      <div className="comments-box text-light ">
        <h3> Comments</h3>

        {comments.length ? (
          <>
            <div className="add-comment-section">
              <input
                placeholder="enter commment"
                className="input "
                value={newComment.text}
                onChange={(e) =>
                  setNewComment({
                    ...newComment,
                    user_id: user._id,
                    post_id: thisPost._id,
                    text: e.target.value
                  })
                }
              />{" "}
              <button
                className="btn bg-light text-dark"
                onClick={() => {
                  if (user && user !== "visitor") {
                    postComment(newComment);
                    getComments();
                  }
                }}
              >
                {" "}
                Add{" "}
              </button>
            </div>

            {comments.map((comment) => {
              return (
                <div className="comments  mt-4 text-dange" key={comment._id}>
                  {/* <!-- Edit Comment Modal --> */}
                  <div
                    className="modal fade"
                    id="exampleModal"
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
                            Edit Comment
                          </h1>
                          <button
                            type="button"
                            className="btn-close "
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div>
                            <input
                              placeholder="enter commment"
                              className="input w-100 "
                              value={editComment.text}
                              onChange={(e) => {
                                setEditComments({
                                  ...newComment,
                                  text: e.target.value,
                                  user_id: comment.user_id._id,
                                  post_id: comment.post_id,
                                  id: editComment.id
                                });
                              }}
                            />{" "}
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            className="btn bg-dark text-light"
                            onClick={() => {
                              if (user && user !== "visitor") {
                                handleUpdateCommensEdit();
                                getComments();
                                setEditComments({ ...newComment, text: "" });
                              }
                            }}
                          >
                            {" "}
                            Update Comment{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    {" "}
                    <b>{comment.user_id.name}</b>: <span>{comment.text} </span>
                  </div>
                  <div className="ms-5 d-flex justify-content-start gap-5 w-25">
                    {" "}
                    <span className="pointer text-primary">reply</span>{" "}
                    {comment.user_id._id === user._id ? (
                      <>
                        <span className="pointer ">
                          <AiFillEdit
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => {
                              setEditComments({
                                ...newComment,
                                text: comment.text,
                                id: comment._id
                              });
                            }}
                          />
                        </span>{" "}
                        <span className="pointer text-danger">
                          <AiFillDelete
                            onClick={() => {
                              handleDeleteComment(comment._id);
                            }}
                          />
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div>
            <p>Be the first to comment</p>
            <div>
              <input
                placeholder="enter commment"
                className="input "
                value={newComment.text}
                onChange={(e) =>
                  setNewComment({
                    ...newComment,
                    user_id: user._id,
                    post_id: thisPost._id,
                    text: e.target.value
                  })
                }
              />{" "}
              <button
                className="btn bg-light text-dark"
                onClick={() => {
                  if (user && user !== "visitor") {
                    postComment(newComment);
                    getComments();
                  }
                }}
              >
                {" "}
                Add{" "}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
