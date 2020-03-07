const express = require("express");
const router = express.Router();

const blogCtr = require("../controllers/blog");
// SERVICES
const authService = require("../services/auth");

router.post(
  "",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  blogCtr.createBlog
);

router.get("", blogCtr.getBlogs);

router.get(
  "/me",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  blogCtr.getUserBlogs
);

router.get("/:id", blogCtr.getBlogById);

router.get("/s/:slug", blogCtr.getBlogBySlug);

router.patch(
  "/:id",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  blogCtr.updateBlog
);

router.delete(
  "/:id",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  blogCtr.deleteBlog
);

module.exports = router;
