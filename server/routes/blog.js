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

router.get("/:id", blogCtr.getBlogById);

router.patch(
  "/:id",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  blogCtr.updateBlog
);

module.exports = router;
