'use strict';

const posts = [
  {
    img: 'https://placeimg.com/400/150/arch',
    title: 'Post title 1',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    stats: {
      likes: 6,
      dislikes: 2,
      fav: 3,
    },
  },
  {
    img: 'https://placeimg.com/400/150/nature',
    title: 'Post title 2',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    stats: {
      likes: 124,
      dislikes: 8,
      fav: 36,
    },
  },
  {
    img: 'https://placeimg.com/400/150/arch',
    title: 'Post title 3',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    stats: {
      likes: 800,
      dislikes: 36,
      fav: 147,
    },
  },
];
const body = document.querySelector('body');
const postsGrid = document.createElement('div');
body.appendChild(postsGrid);
const createdPosts = posts.reduce((acc, currentPost) => {
  acc.push(createPostCard(currentPost));
  return acc;
}, []);
const postsSeparator = document.createElement('p');
postsSeparator.textContent = 'Posts separator';
postsGrid.append(...createdPosts);
postsGrid.appendChild(postsSeparator);
const markup = createPostCards(posts);
postsGrid.insertAdjacentHTML('beforeend', markup);

function createPostCard({ postImage, postTitle, postText }) {
  return `<div class="post">
  <img class="post__image" src=${postImage} alt="post image">
  <h2 class="post__title">${postTitle}</h2>
  <p class="post__text">${postText}</p>

  <ul class="actions post__actions">
    <li class="actions__item">
      <button class="actions__btn ">
        <span class="actions__icon actions__icon--like"></span>
        <span class="actions__count">0</span>
      </button>
    </li>
    <li class="actions__item">
      <button class="actions__btn">
        <span class="actions__icon actions__icon--dislike"></span>
        <span class="actions__count">0</span>
      </button>
    </li>
    <li class="actions__item">
      <button class="actions__btn">
        <span class="actions__icon actions__icon--fav"></span>
        <span class="actions__count">0</span>
      </button>
    </li>
  </ul>
  </div>`;
}
function createPostCard(incomingPost) {
  const post = document.createElement('div');
  post.className = 'post';
  const image = document.createElement('img');
  image.className = 'post__image';
  image.setAttribute('alt', 'post image');
  image.setAttribute('src', incomingPost.img);
  post.appendChild(image);
  const title = document.createElement('h2');
  title.className = 'post__title';
  title.textContent = incomingPost.title;
  post.appendChild(title);
  const postText = document.createElement('p');
  postText.className = 'post__text';
  postText.textContent = incomingPost.text;
  post.appendChild(postText);
  const postActions = document.createElement('ul');
  postActions.className = 'actions post__actions';
  const actionButtons = [];
  actionButtons.push(
    createActionButton('actions__icon--like', incomingPost.stats.likes),
  );
  actionButtons.push(
    createActionButton('actions__icon--dislike', incomingPost.stats.dislikes),
  );
  actionButtons.push(
    createActionButton('actions__icon--fav', incomingPost.stats.fav),
  );
  postActions.append(...actionButtons);
  post.appendChild(postActions);
  return post;
}
function createActionButton(addintionalClassName, actionCount) {
  const actionsLi = document.createElement('li');
  actionsLi.className = 'actions__item';
  const actionsButton = document.createElement('button');
  actionsButton.className = 'actions__btn';
  const actionsIcon = document.createElement('span');
  actionsIcon.classList.add('actions__icon');
  actionsIcon.classList.add(addintionalClassName);
  actionsButton.appendChild(actionsIcon);
  const actionsCount = document.createElement('span');
  actionsCount.className = 'actions__count';
  actionsCount.textContent = actionCount;
  actionsButton.appendChild(actionsCount);
  actionsLi.appendChild(actionsButton);
  return actionsLi;
}
function createPostCards(posts) {
  return posts.reduce((acc, currentPost) => {
    const convertedPost = createPostCard(currentPost);
    acc += convertedPost.outerHTML;
    return acc;
  }, '');
}
