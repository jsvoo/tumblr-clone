import "../landingPageStyles.scss";
import soccer from "./images/soccer.jpg";
import author from "./images/author.jpg";
import { BsGridFill } from "react-icons/bs";
import { GoRocket } from "react-icons/go";
import { MdClose } from "react-icons/md";
import { GiPolarStar } from "react-icons/gi";
import { SiElasticstack } from "react-icons/si";
import {
  AiFillDownCircle,
  AiOutlineHeart,
  AiOutlineComment,
  AiFillHeart,
  AiFillDelete
} from "react-icons/ai";
import { TiArrowForwardOutline } from "react-icons/ti";
import { FiMoreHorizontal } from "react-icons/fi";
import { useContext, useState } from "react";
import SelectMore from "./SelectMore";
import { conManager } from "../context/TumblrContext";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [view, setView] = useState({
    gridView: false,
    columnView: false,
    more: false
  });
  const {
    posts,
    url,
    allComments,
    user,
    likes,
    filterLikes,
    newComment,
    setNewComment,
    postLike,
    postComment,
    filterItem
  } = useContext(conManager);

  return (
    <div className="landPageContainer ">
      <div className="homepage-body">
        <div className="main-page">
          <nav>
            <div className="controls ">
              <button>
                Trending <GoRocket />{" "}
              </button>
              <button>
                Staff Picks <GiPolarStar className="star" />
              </button>
              <button onClick={() => setView({ ...view, more: !view.more })}>
                More <AiFillDownCircle />{" "}
              </button>
            </div>

            <div className="view-switch">
              <button onClick={() => setView({ ...view, gridView: true })}>
                <BsGridFill
                  className={view.gridView ? "text-light switch" : "switch"}
                />
              </button>
              <button onClick={() => setView({ ...view, gridView: false })}>
                <SiElasticstack
                  className={!view.gridView ? "text-light switch" : "switch"}
                />
              </button>
            </div>
          </nav>
          {view.more ? <SelectMore /> : null}
          <div className="trending">
            <div className="trending-item">
              <div className="text-area">
                <h3>1</h3>
                <div>
                  <h4>art</h4>
                  <h5>#illustration</h5>
                </div>
              </div>
              <div className="image">
                <img
                  src={soccer}
                  alt="trending item"
                  className="trending-img"
                />
              </div>
            </div>
            <div className="trending-item2">
              <div className="text-area">
                <h3>2</h3>
                <div>
                  <h4>artistis on tumblr</h4>
                  <h5>#hot</h5>
                </div>
              </div>
              <div className="image">
                <img
                  src={soccer}
                  alt="trending item"
                  className="trending-img"
                />
              </div>
            </div>
            <div className="trending-item3">
              <div className="text-area">
                <h3>3</h3>
                <div>
                  <h4>supernatural</h4>
                  <h5>#jensen ackles #misha collins</h5>
                </div>
              </div>
              <div className="image">
                <img
                  src={soccer}
                  alt="trending item"
                  className="trending-img"
                />
              </div>
            </div>
            <div className="trending-item4">
              <div className="text-area">
                <h3>4</h3>
                <div>
                  <h4>rottmnt</h4>
                  <h5>#tmnt #teenage mutant ninja turtles</h5>
                </div>
              </div>
              <div className="image">
                <img
                  src={soccer}
                  alt="trending item"
                  className="trending-img"
                />
              </div>
            </div>
          </div>

          <div className={view.gridView ? "gridView" : "columnView"}>
            {posts.length
              ? posts.map((post, i) => {
                  return (
                    <div className="post-area" key={i}>
                      <div className="author-img">
                        <img
                          src={`${url}/uploads/${post.user_id.image}`}
                          alt="Post author"
                          className=""
                        />
                      </div>
                      <div className="post">
                        <div className="post-header">
                          <div className="author">
                            <div className="username">{post.user_id.name}</div>
                            <div className="follow">Follow</div>
                          </div>

                          <div className="options">
                            <FiMoreHorizontal />
                          </div>
                        </div>
                        <Link to={`post/${post._id}`}>
                          <div className="post-body ">
                            <h4 className="post-title ps-3">{post.title}</h4>
                            <div className="image-area">
                              {post.image.map((img, ind) => {
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

                            <div className="post-text">{post.body}</div>
                          </div>
                        </Link>

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
                                    {}

                                    {filterItem(allComments, post._id)
                                      .length ? (
                                      filterItem(allComments, post._id).map(
                                        (e) => {
                                          return (
                                            <p key={e._id}>
                                              <b>
                                                {post.user_id.name ===
                                                e.user_id.name
                                                  ? "Author"
                                                  : e.user_id.name}
                                              </b>
                                              : {e.text}{" "}
                                            </p>
                                          );
                                        }
                                      )
                                    ) : (
                                      <div>
                                        {" "}
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
                  );
                })
              : null}

            {/* <div className="post-area">
              <div className="author-img">
                <img src={author} alt="Post author" className="" />
              </div>
              <div className="post">
                <div className="post-header">
                  <div className="author">
                    <div className="username">VooOnoja</div>
                    <div className="follow">Follow</div>
                  </div>

                  <div className="options">
                    <FiMoreHorizontal />
                  </div>
                </div>
                <div className="post-body">
                  <div className="image-area">
                    <img src={postimage} alt="post-postal" />
                  </div>

                  <div className="post-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, qui consequatur ad non reprehenderit est amet
                    veritatis sunt vel nam. Lorem ipsum dolor sit, amet
                    consectetur adipisicing elit. Praesentium, sequi. Facere
                    obcaecati omnis dolorum aliquid maiores, voluptatem iure
                    modi non architecto quibusdam consequatur voluptate? Quo
                    facere provident tenetur impedit cupiditate.
                  </div>
                </div>
                <div className="post-footer">
                  <div className="notes">876 notes</div>
                  <div className="icons">
                    <button>
                      <TiArrowForwardOutline />
                    </button>
                    <button>
                      <AiOutlineRetweet />
                    </button>
                    <button>
                      <AiOutlineHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="post-area">
              <div className="author-img">
                <img src={author} alt="Post author" className="" />
              </div>
              <div className="post">
                <div className="post-header">
                  <div className="author">
                    <div className="username">VooOnoja</div>
                    <div className="follow">Follow</div>
                  </div>

                  <div className="options">
                    <FiMoreHorizontal />
                  </div>
                </div>
                <div className="post-body">
                  <div className="image-area">
                    <img src={postimage} alt="post-postal" />
                  </div>

                  <div className="post-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, qui consequatur ad non reprehenderit est amet
                    veritatis sunt vel nam. Lorem ipsum dolor sit, amet
                    consectetur adipisicing elit. Praesentium, sequi. Facere
                    obcaecati omnis dolorum aliquid maiores, voluptatem iure
                    modi non architecto quibusdam consequatur voluptate? Quo
                    facere provident tenetur impedit cupiditate.
                  </div>
                </div>
                <div className="post-footer">
                  <div className="notes">876 notes</div>
                  <div className="icons">
                    <button>
                      <TiArrowForwardOutline />
                    </button>
                    <button>
                      <AiOutlineRetweet />
                    </button>
                    <button>
                      <AiOutlineHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="post-area">
              <div className="author-img">
                <img src={author} alt="Post author" className="" />
              </div>
              <div className="post">
                <div className="post-header">
                  <div className="author">
                    <div className="username">VooOnoja</div>
                    <div className="follow">Follow</div>
                  </div>

                  <div className="options">
                    <FiMoreHorizontal />
                  </div>
                </div>
                <div className="post-body">
                  <div className="image-area">
                    <img src={postimage} alt="post-postal" />
                  </div>

                  <div className="post-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, qui consequatur ad non reprehenderit est amet
                    veritatis sunt vel nam. Lorem ipsum dolor sit, amet
                    consectetur adipisicing elit. Praesentium, sequi. Facere
                    obcaecati omnis dolorum aliquid maiores, voluptatem iure
                    modi non architecto quibusdam consequatur voluptate? Quo
                    facere provident tenetur impedit cupiditate.
                  </div>
                </div>
                <div className="post-footer">
                  <div className="notes">876 notes</div>
                  <div className="icons">
                    <button>
                      <TiArrowForwardOutline />
                    </button>
                    <button>
                      <AiOutlineRetweet />
                    </button>
                    <button>
                      <AiOutlineHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="post-area">
              <div className="author-img">
                <img src={author} alt="Post author" className="" />
              </div>
              <div className="post">
                <div className="post-header">
                  <div className="author">
                    <div className="username">VooOnoja</div>
                    <div className="follow">Follow</div>
                  </div>

                  <div className="options">
                    <FiMoreHorizontal />
                  </div>
                </div>
                <div className="post-body">
                  <div className="image-area">
                    <img src={postimage} alt="post-postal" />
                  </div>

                  <div className="post-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, qui consequatur ad non reprehenderit est amet
                    veritatis sunt vel nam. Lorem ipsum dolor sit, amet
                    consectetur adipisicing elit. Praesentium, sequi. Facere
                    obcaecati omnis dolorum aliquid maiores, voluptatem iure
                    modi non architecto quibusdam consequatur voluptate? Quo
                    facere provident tenetur impedit cupiditate.
                  </div>
                </div>
                <div className="post-footer">
                  <div className="notes">876 notes</div>
                  <div className="icons">
                    <button>
                      <TiArrowForwardOutline />
                    </button>
                    <button>
                      <AiOutlineRetweet />
                    </button>
                    <button>
                      <AiOutlineHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="post-area">
              <div className="author-img">
                <img src={author} alt="Post author" className="" />
              </div>
              <div className="post">
                <div className="post-header">
                  <div className="author">
                    <div className="username">VooOnoja</div>
                    <div className="follow">Follow</div>
                  </div>

                  <div className="options">
                    <FiMoreHorizontal />
                  </div>
                </div>
                <div className="post-body">
                  <div className="image-area">
                    <img src={postimage} alt="post-postal" />
                  </div>

                  <div className="post-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, qui consequatur ad non reprehenderit est amet
                    veritatis sunt vel nam. Lorem ipsum dolor sit, amet
                    consectetur adipisicing elit. Praesentium, sequi. Facere
                    obcaecati omnis dolorum aliquid maiores, voluptatem iure
                    modi non architecto quibusdam consequatur voluptate? Quo
                    facere provident tenetur impedit cupiditate.
                  </div>
                </div>
                <div className="post-footer">
                  <div className="notes">876 notes</div>
                  <div className="icons">
                    <button>
                      <TiArrowForwardOutline />
                    </button>
                    <button>
                      <AiOutlineRetweet />
                    </button>
                    <button>
                      <AiOutlineHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          */}
          </div>
        </div>

        <div className="side-bar">
          <div className="trending-blogs">
            <div className="heading">Trending Blogs</div>
            <div className="blog-list">
              <div className="item">
                <div className="blog-author-image">
                  <img src={author} alt="Trending blog author" />
                </div>

                <div className="blog-author-details">
                  <div className="username">Monalizza</div>
                  <div className="full-name">Liza Donnelly</div>
                </div>

                <div className="actions">
                  <div className="follow">Follow</div>

                  <div className="cancel">
                    <MdClose className="icon" />
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="blog-author-image">
                  <img src={author} alt="Trending blog author" />
                </div>

                <div className="blog-author-details">
                  <div className="username">Monalizza</div>
                  <div className="full-name">Liza Donnelly</div>
                </div>

                <div className="actions">
                  <div className="follow">Follow</div>

                  <div className="cancel">
                    <MdClose className="icon" />
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="blog-author-image">
                  <img src={author} alt="Trending blog author" />
                </div>

                <div className="blog-author-details">
                  <div className="username">Monalizza</div>
                  <div className="full-name">Liza Donnelly</div>
                </div>

                <div className="actions">
                  <div className="follow">Follow</div>

                  <div className="cancel">
                    <MdClose className="icon" />
                  </div>
                </div>
              </div>
            </div>
            <p className="show-more">Show more blogs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
