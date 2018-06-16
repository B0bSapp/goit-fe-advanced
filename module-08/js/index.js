'use strict';

const galleryItems = [
  {
    preview: 'img/preview-1.png',
    fullview: 'img/fullview-1.png',
    alt: 'alt text 1',
  },
  {
    preview: 'img/preview-2.png',
    fullview: 'img/fullview-2.png',
    alt: 'alt text 2',
  },
  {
    preview: 'img/preview-3.png',
    fullview: 'img/fullview-3.png',
    alt: 'alt text 3',
  },
];

// const preview = document.querySelector('.preview');
// const previewItems = document.querySelectorAll('.preview__item');
// const fullView = document.querySelector('.fullview__img');
// preview.addEventListener('click', onClick);
// function onClick(event) {
//   previewItems.forEach(previewItem => {
//     previewItem.classList.remove('preview__item--selected');
//   });
//   event.target.parentNode.classList.add('preview__item--selected');
//   fullView.setAttribute('src', event.target.dataset.fullview);
// }

class Gallery {
  constructor(galleryItems = [], parentNode = {}, defaultActiveItem = 0) {
    const fullView = document.createElement('div');
    const fullViewImage = document.createElement('img');
    fullViewImage.setAttribute('src', galleryItems[defaultActiveItem].fullview);
    fullViewImage.setAttribute('alt', galleryItems[defaultActiveItem].alt);
    fullViewImage.classList.add('fullview__img');
    fullView.appendChild(fullViewImage);
    parentNode.appendChild(fullView);
    const preview = document.createElement('ul');
    preview.classList.add('preview');
    const previewItems = galleryItems.reduce((acc, galleryItem, idx) => {
      const li = document.createElement('li');
      li.classList.add('preview__item');
      if (idx === defaultActiveItem) {
        li.classList.add('preview__item--selected');
      }
      const liImg = document.createElement('img');
      liImg.setAttribute('src', galleryItem.preview);
      liImg.setAttribute('alt', galleryItem.alt);
      liImg.setAttribute('data-fullview', galleryItem.fullview);
      li.appendChild(liImg);
      acc.push(li);
      return acc;
    }, []);
    preview.append(...previewItems);
    preview.addEventListener('click', onClick);
    function onClick(event) {
      previewItems.forEach(previewItem => {
        previewItem.classList.remove('preview__item--selected');
      });
      event.target.parentNode.classList.add('preview__item--selected');
      console.log(event.target);
      fullViewImage.setAttribute('src', event.target.dataset.fullview);
    }
    parentNode.appendChild(preview);
  }
}

new Gallery(galleryItems, document.querySelector('.image-gallery'), 2);
