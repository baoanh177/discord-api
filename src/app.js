var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

var indexRouter = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// const MAX_REQUESTS = 3; // Số lượng yêu cầu tối đa
// const WINDOW_MS = 1000; // Khoảng thời gian (ms)
// const ipTracker = {}; // Đối tượng để lưu trữ số lượng yêu cầu từ mỗi IP

// app.use((req, res, next) => {
//   const clientIp = req.ip; // Lấy địa chỉ IP của client

//   // Kiểm tra xem IP đã gửi bao nhiêu yêu cầu trong khoảng thời gian WINDOW_MS
//   if (!ipTracker[clientIp]) {
//     ipTracker[clientIp] = [];
//   }

//   // Lọc ra các yêu cầu đã quá hạn
//   ipTracker[clientIp] = ipTracker[clientIp].filter(timestamp => Date.now() - timestamp < WINDOW_MS);

//   // Nếu số lượng yêu cầu vượt quá MAX_REQUESTS, block IP
//   if (ipTracker[clientIp].length >= MAX_REQUESTS) {
//     return res.status(429).send('Quá nhiều yêu cầu từ IP này trong một khoảng thời gian ngắn, vui lòng thử lại sau.');
//   }

//   // Lưu thời điểm của yêu cầu hiện tại
//   ipTracker[clientIp].push(Date.now());

//   next();
// });
app.get(
  "/",
  cors({ origin: [process.env.CLIENT_BASE_URL, process.env.ADMIN_BASE_URL] }),
  (req, res) => {
    res.json({
      status: 200,
      message: "Welcome to Discord API",
    });
  }
);
app.use(
  "/api",
  cors({ origin: [process.env.CLIENT_BASE_URL, process.env.ADMIN_BASE_URL] }),
  indexRouter
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
