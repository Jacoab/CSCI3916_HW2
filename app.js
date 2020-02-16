var server = require("http").createServer();
const express = require('express');
const app = express();

server.on("request", (request, response) => {
  var body = [];
  request.on("data", chunk => {
    body.push(chunk);
  });
  request
      .on("end", () => {
        let bodyString = body.concat().toString();
        console.log(bodyString);
        response.end(bodyString);
      })
      .on("error", () => {
        response.statusCode = 400;
        response.end();
      });
  response.on("error", err => {
    console.error(err);
  });
});
server.listen(process.env.PORT || 8008, () => {
  console.log("Server listening at 8008");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
