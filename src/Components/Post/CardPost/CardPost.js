import React from "react";
import { GoArrowUp } from "react-icons/go";
import { GoArrowDown } from "react-icons/go";
import axios from "axios";
import "../CardPost/CardPost.css";
import { withRouter, Link } from "react-router-dom";
import { getUser } from "../../../redux/reducer";
import { connect } from "react-redux";

function CardPost(props) {
  const {
    post_id,
    post_title,
    post_content,
    post_url,
    post_author_id,
    post_type_id,
    post_time,
    subforum_id,
    subforum_name,
    subforum_img,
    comment_count,
    author_username,
    vote_tracker,
    upvote,
    downvote,
  } = props.post;

  const upVote = (post_id) => {
    props.setButtonsDisabled(true);
    console.log(`upvoting`);
    axios
      .post(`/api/subforums/${subforum_id}/posts/${post_id}/upvote`)
      .then((res) => {
        props.getPosts();
      })
      .catch((err) => console.log(err));
  };

  const downVote = (post_id) => {
    props.setButtonsDisabled(true);
    console.log(`downvoting`);
    axios
      .post(`/api/subforums/${subforum_id}/posts/${post_id}/downvote`)
      .then((res) => {
        props.getPosts();
      });
  };

  const deleteVote = (post_id) => {
    props.setButtonsDisabled(true);
    console.log(`deleting vote`);
    axios
      .delete(`/api/subforums/${subforum_id}/posts/${post_id}/remove-vote`)
      .then((res) => {
        props.getPosts();
      });
  };

  console.log(props.isLoggedIn);
  return (
    <div className="card-post-container">
      <div className="card-vote-count-vertical">
        <div className="card-vote-count-container">
          <div className="card-vote-count-body">
            <div>
              {upvote === true ? (
                <GoArrowUp
                  alt="upvote"
                  style={{ maxWidth: 50 }}
                  className="vote-arrow voted"
                  onClick={() =>
                    props.buttonsDisabled ? null : deleteVote(post_id)
                  }
                />
              ) : (
                <GoArrowUp
                  alt="upvote"
                  className="vote-arrow"
                  onClick={() =>
                    props.buttonsDisabled ? null : upVote(post_id)
                  }
                />
              )}
            </div>
            <div className="voteCount">{vote_tracker}</div>
            <div>
              {downvote === true ? (
                <GoArrowDown
                  alt="upvote"
                  style={{ maxWidth: 50 }}
                  className="vote-arrow voted"
                  onClick={() =>
                    props.buttonsDisabled ? null : deleteVote(post_id)
                  }
                />
              ) : (
                <GoArrowDown
                  alt="downvote"
                  className="vote-arrow"
                  onClick={() =>
                    props.buttonsDisabled ? null : downVote(post_id)
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="card-content-container">
        <div className="card-content-header">
          <Link
            to={`/subforums/${subforum_id}`}
            className="card-post-subforum-img"
          >
            {subforum_img === null ? (
              <img
                style={{ height: 20, width: 20 }}
                src={require("./echo_chamber_icon_2.png")}
              />
            ) : (
              <img
                style={{ borderRadius: "50%", height: 20, width: 20 }}
                src={subforum_img}
              />
            )}
          </Link>
          <div className="card-post-subforum-name-container">
            {props.location.pathname === "/" ? (
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: 13,
                  paddingLeft: 3,
                  fontWeight: 600,
                  marginBottom: 5,
                }}
                to={`/subforums/${subforum_id}`}
              >
                c/{subforum_name}
              </Link>
            ) : null}
          </div>
          <span className="header-seperation-dot">•</span>
          <div className="header-post-author-container">
            <h5 className="card-post-by-user">
              posted by u/
              {props.isLoggedIn ? (
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/users/${post_author_id}`}
                >
                  {author_username}
                </Link>
              ) : (
                author_username
              )}{" "}
              on {post_time}
            </h5>
          </div>
        </div>
        <Link
          to={`/subforums/${subforum_id}/posts/${post_id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="card-content-body">
            <div className="card-post-title">{post_title}</div>
            <div className="card-post-content">
              {post_type_id === 1 || post_type_id === null ? (
                <span>{post_content}</span>
              ) : null}
              {post_type_id === 2 ? (
                <img
                  style={{ height: "100%", width: "100%" }}
                  src={
                    "https://echo-app-files.s3.us-west-2.amazonaws.com/1595432512948sds5305u5a873cb323330517994575.jpg"
                  }
                />
              ) : null}
            </div>
          </div>
          <div className="card-content-footer">
            <div className="card-content-footer-h5">
              <h5>
                {comment_count === 1
                  ? `${comment_count} comment`
                  : `${comment_count} comments`}
              </h5>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => state;

export default withRouter(connect(mapStateToProps, { getUser })(CardPost));
