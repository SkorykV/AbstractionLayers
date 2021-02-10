function sendResponse(res, statusCode, content) {
  res.writeHead(statusCode);
  res.end(content);
}

module.exports = sendResponse;
