const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = blogs.reduce((total, blog) => {
    return total + blog.likes;
  }, 0);
  return likes;
};

const maxLikes = (blogs) => {
  let obj = {};
  let maxlike = Number.MIN_SAFE_INTEGER;
  console.log("Min Integer :", maxlike);
  for (let i = 0; i < blogs.length; i++) {
    console.log(blogs[i].likes);
    if (blogs[i].likes > maxlike) {
      maxlike = blogs[i].likes;
      obj = blogs[i];
    }
  }
  return obj;
};

const maxBlogsAuthor = (blogs) => {
  const author = _.maxBy(blogs, "blogs");
  return author.author;
};

const maxLikesAuthor = (blogs) => {
  console.log(blogs);
  const author = _.maxBy(blogs, "likes");
  return author.author;
};

module.exports = {
  dummy,
  totalLikes,
  maxLikes,
  maxBlogsAuthor,
  maxLikesAuthor,
};
