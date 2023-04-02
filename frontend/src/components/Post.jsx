import React from "react";
import PropTypes from "prop-types";
import styles from './styles/Post.module.css'
import { redirect, Link } from "react-router-dom";

const FeedPost = ({ username, caption, imageUrl, profilePicUrl, language, langID }) => {
  return (
    <div className={styles.feedPostContainer}>
      <div className={styles.feedPostHeader}>
        <img src={profilePicUrl} alt="profile pic" className={styles.profilePic} />
        <p className={styles.username}>{username}</p>
      </div>
      <div className={styles.feedPostImageContainer}>
        <img src={imageUrl} alt="post" className={styles.feedPostImage} />
      </div>
      <div className={styles.feedPostCaption}>
        <p>{caption}</p>
        <button><Link to={`/regularPage?prop1=${langID}&prop2=${language}&prop3=${imageUrl}`} style={{ color: '#FFFFFF' }}>Practice with this image</Link></button>
      </div>
    </div>
  );
};

FeedPost.propTypes = {
  username: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  profilePicUrl: PropTypes.string.isRequired,
  language: PropTypes.string.isRequred,
  langID: PropTypes.string.isRequired,
};

export default FeedPost;
