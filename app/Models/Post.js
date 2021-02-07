module.exports = class Post {
  id;
  title;
  content;
  starts;
  constructor(title, content) {
    this.title = title;
    this.content = content;
    this.starts = 0;
  }

  sendStart() {
    this.starts++;
  }
};
