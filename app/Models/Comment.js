module.exports = class Comment {
  id;
  content;
  likes;
  constructor(content) {
    this.content = content;
    this.likes = 0;
  }

  sendLike() {
    if(this.likes == 0) this.likes = 1;
    else this.likes++;
  }
};
