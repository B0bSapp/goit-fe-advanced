'use strict';
function SocialBook(users = [], posts = {}) {
  this.users = users;
  this.posts = posts;
  this.getAllUsers = () => this.users;
  this.getUserByLogin = login =>
    this.users.filter(user => user.login === login);
  this.getUserStatus = userId =>
    this.users
      .filter(user => user.id === userId)
      .map(filteredUser => (filteredUser.isActive ? 'active' : 'inactive'));
  this.addUser = user => {
    user.id = getId();
    user.isActive = false;
    this.users.push(user);
  };
  this.removeUserById = userId =>
    (this.users = this.users.filter(user => user.id !== userId));
  this.getUsersCount = () => this.users.length;
  this.getUserPosts = userId => this.posts[userId];
  this.addPost = (userId, post) => {
    post.id = getId();
    post.likes = 0;
    this.posts[userId].push(post);
  };
  this.removePost = (userId, postId) => {
    this.posts[userId] = this.posts[userId].filter(post => post.id !== postId);
  };
  this.getAllLikes = userId =>
    this.posts[userId].reduce((acc, post) => acc + post.likes, 0);
  this.addPostLike = (userId, postId) => {
    const post = this.posts[userId].find(post => post.id === postId);
    post.likes += 1;
  };
  this.getPostsCount = userId => this.posts[userId].length;
}

const initialUsers = [
  {
    id: '-s19a6hqce',
    login: 'mangozedog@mail.com',
    password: 'qwe123zv',
    isActive: true,
  },
  {
    id: '-qkpzenjxe',
    login: 'polysweet@skynet.ze',
    password: '123zxc78',
    isActive: true,
  },
  {
    id: '-e51cpd4di',
    login: 'ajax2k@change.ua',
    password: 'ert234qw',
    isActive: false,
  },
];
const initialPosts = {
  '-s19a6hqce': [
    { id: '-5sgljaskg', text: 'post #1', likes: 3 },
    { id: '-199hb6igr', text: 'post #2', likes: 5 },
    { id: '-hy0eyw5qo', text: 'post #3', likes: 13 },
  ],
  '-qkpzenjxe': [
    { id: '-5tu69g5rf', text: 'post #1', likes: 8 },
    { id: '-bje766393', text: 'post #2', likes: 15 },
  ],
  '-e51cpd4di': [
    { id: '-9y6nkmlj4', text: 'post #1', likes: 18 },
    { id: '-i03pbhy3s', text: 'post #2', likes: 45 },
  ],
};
const getId = () =>
  '-' +
  Math.random()
    .toString(36)
    .substr(2, 9);

const socialBook = new SocialBook(initialUsers, initialPosts);
socialBook.addUser({ login: 'someWeirdStuff', password: 'qwerty' });
socialBook.addPost('-e51cpd4di', { text: 'Some weird stuff' });
socialBook.addPostLike('-e51cpd4di', '-9y6nkmlj4');
console.log(socialBook.getUserPosts('-e51cpd4di'));
console.log(socialBook.getAllLikes('-e51cpd4di'));
console.log(socialBook.getPostsCount('-e51cpd4di'));
