const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const usersRouter = require("./users/users.routes");
const uploadsRouter = require("./uploads/uploads.routes");
const roomsRouter = require("./rooms/rooms.routes");
const adminRouter = require("./admin/admin.routes");
const customerRouter = require("./customers/customers.routes");
const bookingRouter = require("./booking/booking.routes");

mongoose.connect(
  "mongodb://localhost:27017/hbooking",
  { useNewUrlParser: true, useUnifiedTopology: true },
  e => {
    if (e) {
      process.exit();
    } else {
      console.log("Connect to mongodb success");

      // start app
      const app = express();
      app.use(express.static("public"));
      app.use(
        cors({
          origin: ["http://localhost:3000"],
          credentials: true
        })
      );
      app.use(bodyParser.json());
      // routers: session
      app.use(
        expressSession({
          secret: "keyboard cat",
          resave: true,
          saveUninitialized: false,
          store: new MongoStore({ mongooseConnection: mongoose.connection })
        })
      );

      // routers
      app.use("/users", usersRouter);
      app.use("/rooms", roomsRouter);
      app.use("/uploads", uploadsRouter);
      app.use("/admin", adminRouter);
      app.use("/customer", customerRouter);
      app.use("/booking", bookingRouter);

      app.listen(3001, error => {
        if (error) {
          console.log(error);
        } else {
          console.log("Server listen on port 3001 ...");
        }
      });
    }
  }
);