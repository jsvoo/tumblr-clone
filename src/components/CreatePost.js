import { useContext, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { conManager } from "../context/TumblrContext";
import { BsImages } from "react-icons/bs";
import axios from "axios";
export default function CreatePost() {
  const {
    view,
    setView,
    user,
    url,
    postCategories,
    getAllPosts,
    empty,
    setEmpty
  } = useContext(conManager);
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
  const formData = new FormData();
  formData.append("title", newPost.title);
  formData.append("excerpt", newPost.excerpt);
  formData.append("date", newPost.date);
  formData.append("body", newPost.body);
  formData.append("user_id", newPost.user_id);
  formData.append("post_category_id", newPost.post_category_id);
  formData.append("likes", newPost.likes);

  const config = { headers: { "content-type": "multipart/form-data" } };

  function postPost() {
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
          getAllPosts();

          setNewPost({ ...newPost, title: "", body: "", post_category_id: "" });
          setView({ ...view, textPost: false });
        })
        .catch((err) => console.log(err));
    } else {
      setEmpty(true);
    }
  }

  return (
    <div className="create-post-background">
      <div className="create-post-container ">
        <div className="post-author-image">
          <img src={`${url}/uploads/${user.image}`} alt="post author" />
        </div>

        <div className="content-area">
          <div className="heading ">
            <div>{user.name}</div>
            <div>
              <FiSettings />
            </div>
          </div>

          <div className="title">
            <input
              type="text"
              placeholder="Title"
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
            {empty && newPost.title === "" ? (
              <p className="text-danger fs-6">Title field is required</p>
            ) : null}
          </div>
          <div className="category">
            <select
              onChange={(e) =>
                setNewPost({ ...newPost, post_category_id: e.target.value })
              }
            >
              <option value="">Select post category</option>
              {postCategories
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
                Post category field is required
              </p>
            ) : null}
          </div>

          <div className="post-body">
            <textarea
              name=""
              id=""
              cols="20"
              rows="5"
              placeholder="Go ahead, put anything"
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            ></textarea>
            {empty && newPost.body === "" ? (
              <p className="text-danger fs-6">Post body is required</p>
            ) : null}
          </div>

          <div className="post-images">
            <label htmlFor="select-image">
              {" "}
              Add images
              <h1>
                <BsImages className="image-icon" />
              </h1>
              <input
                id="select-image"
                type="file"
                multiple
                onChange={(e) =>
                  setNewPost({ ...newPost, image: e.target.files })
                }
              />
            </label>
          </div>

          <div className="tags">
            <input type="text" placeholder="#add tags" />
          </div>
          <div className="footer">
            <button onClick={() => setView({ ...view, textPost: false })}>
              Close
            </button>
            <div className="select">
              <select name="" id="" disabled className="audience">
                <option value="">Everyone</option>
                <option value="">Mature</option>
              </select>
              <button
                name=""
                id=""
                className="schedule"
                onClick={() => {
                  postPost();
                  // setNewPost('')
                }}
              >
                Post now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
