const express = require("express");
const path = require("path");
const next = require("next");
const mongoose = require("mongoose");
const routes = require("../routes");

// SERVICES
const authService = require("./services/auth");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
//const handle = app.getRequestHandler();
const handle = routes.getRequestHandler(app);
const config = require("./config");

const bodyParser = require("body-parser");

const bookRoutes = require("./routes/book");
const portfolioRuten = require("./routes/portfolio");
const blogRoutes = require("./routes/blog");

const robotsOptions = {
  root: path.join(__dirname, "../static"),
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  }
};
const secretData = [
  {
    title: "SecretData 1",
    description: "Plan how to build spaceship"
  },
  {
    title: "SecretData 2",
    description: "Plan how to build spaceship"
  }
];

mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("Database connectet"))
  .catch(err => console.error(err));

// async () =>
//   (await mongoose.connect(config.DB_URI, { useNewUrlParser: true }))();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());

  server.use("/api/v1/books", bookRoutes);
  server.use("/api/v1/portfolios", portfolioRuten);
  server.use("/api/v1/blogs", blogRoutes);

  server.get("/robots.txt", (req, res) => {
    return res.status(200).sendFile("robots.txt", robotsOptions);
  });

  server.get("/api/v1/secret", authService.checkJWT, (req, res) => {
    return res.json(secretData);
  });

  server.get(
    "/api/v1/onlysiteowner",
    authService.checkJWT,
    authService.checkRole("siteOwner"),
    (req, res) => {
      return res.json(secretData);
    }
  );

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res
        .status(401)
        .send({ title: "Unauthorized", detail: "Unauthorized Access!" });
    }
  });

  server.use(handle).listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
// .catch((ex) => {
//   console.error(ex.stack)
//   process.exit(1)
// })
