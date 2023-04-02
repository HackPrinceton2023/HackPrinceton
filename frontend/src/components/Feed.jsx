import React from "react";
import FeedPost from "./Post";
import test1 from "../assets/test1.png";
import test2 from "../assets/test2.png"

const profilePics = [
  "https://i.imgur.com/06Z8WUL.jpg",
  "https://i.imgur.com/Pv5y7w5.jpg",
  "https://i.imgur.com/9vBZd2z.jpg",
  "https://i.imgur.com/eIml3wO.jpg",
];

const usernames = [
  "john_doe",
  "jane_doe",
  "jim_smith",
  "sara_brown",
  "mike_jones",
];

const captions = [
  "Lovely day for a picnic",
  "Missing this view already",
  "So grateful for this amazing trip",
  "Fun times with great friends",
];

const images = [
    test1,
    test2,
    "https://images.unsplash.com/photo-1546195256-27a896e55a4e",
    "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be",
];

const languages = [
    "Telugu",
    "Arabic",
    "French",
    "Hindi"
]

const ids = [
    "tel",
    "ara",
    "fra",
    "hin"
]

const generateRandomProfile = () => {
  const randomIndex = Math.floor(Math.random() * profilePics.length);
  return {
    profilePicUrl: profilePics[randomIndex],
    username: usernames[randomIndex],
  };
};

const generateRandomPost = () => {
  const randomIndex = Math.floor(Math.random() * captions.length);
  return {
    caption: captions[randomIndex],
    imageUrl: images[randomIndex],
    language: languages[randomIndex],
    langID: ids[randomIndex],
    ...generateRandomProfile(),
  };
};

const PostFeed = () => {
  const posts = [];
  for (let i = 0; i < 10; i++) {
    posts.push(generateRandomPost());
  }
  return (
    <div>
      {posts.map((post, index) => (
        <FeedPost
          key={index}
          profilePicUrl={post.profilePicUrl}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
          language={post.language}
          langID={post.langID}
        />
      ))}
    </div>
  );
};

export default PostFeed;
