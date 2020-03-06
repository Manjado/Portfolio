const Blog = require("../models/blog");
const slugify = require("slugify");
const AsyncLock = require("async-lock");
const lock = new AsyncLock();

exports.createBlog = (req, res) => {
  const lockId = req.query.lockId;
  if (!lock.isBusy(lockId)) {
    lock.acquire(
      lockId,
      function(done) {
        const blogData = req.body;
        const blog = new Blog(blogData);
        blog.userId = req.user && req.user.sub;
        blog.author = req.user && req.user.name;

        blog.save((err, createdBlog) => {
          setTimeout(() => done(), 5000);
          if (err) {
            return res.status(422).send(err);
          }
          return res.json(createdBlog);
        });
      },
      function(err, ret) {
        err && console.error(err);
      }
    );
  } else {
    return res.status(422).send({ message: "Blog is saving!!!" });
  }
};

exports.getBlogById = (req, res) => {
  const blogId = req.params.id;
  Blog.findById(blogId, (err, foundBlog) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(foundBlog);
  });
};

exports.getUserBlogs = (req, res) => {
  const userId = req.user.sub;
  console.log(userId, "ID_lll");
  Blog.find(
    {
      userId
    },
    function(err, userBlogs) {
      console.log(userBlogs, "USERTOP");
      if (err) {
        return res.status(422).send(err);
      }
      console.log(userBlogs, "USER");
      return res.json(userBlogs);
    }
  );
};

exports.updateBlog = (req, res) => {
  const blogId = req.params.id;
  const blogData = req.body;

  Blog.findById(blogId, (err, foundBlog) => {
    if (err) {
      return res.status(422).send(err);
    }

    if (blogData.status && blogData.status === "published" && !foundBlog.slug) {
      foundBlog.slug = slugify(foundBlog.title, {
        replacement: "-",
        remove: null,
        lower: true
      });
    }
    foundBlog.set(blogData);
    foundBlog.updatedAt = new Date();
    foundBlog.save((err, saveBlog) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json(saveBlog);
    });
  });
};
