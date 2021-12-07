class ErrorMessage {
  constructor(error) {
    this.content = error.details[0].message;
    this.field = error.details[0].context.key;
  }

  send(response) {
    response.status(403);
    response.json({
      error: {
        field: this.field,
        message: this.content,
      },
    });
  }
}

module.exports = ErrorMessage;
