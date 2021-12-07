class ErrorMessage {

  constructor(content, field = null) {
    this.content = content;
    this.field = field;
  }

  send(response) {
    response.status(403);
    response.json({
      error: {
        field: this.field,
        message: this.content,
      }
    })
  }

}

module.exports = ErrorMessage;