'use strict';
import template from '../templates/urlItemTemplate.hbs';

export default class View {
  constructor() {
    this.gridItems = document.querySelector('.items-grid');
  }

  addItemsBulk(items) {
    if (items.length === 0) return [];
    const createdItems = items.reduce((acc, item) => {
      acc.unshift(this.handleAdd(item));
      return acc;
    }, []);
    this.gridItems.append(...createdItems);
    return createdItems;
  }

  handleAdd(item) {
    if (!item.urlContent) return;
    const urlWrapper = this.createItem(item);
    this.gridItems.prepend(urlWrapper);
    return urlWrapper;
  }

  createItem(item) {
    const urlWrapper = document.createElement('div');
    urlWrapper.dataset.id = item.id;
    urlWrapper.classList.add('url-wrapper');
    const span = document.createElement('span');
    span.classList.add('url-content');
    span.textContent = item.urlContent;
    urlWrapper.appendChild(span);
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove';
    urlWrapper.appendChild(removeBtn);
    return urlWrapper;
  }

  handleRemove(id) {
    if (!id) return;
    const itemToRemove = this.gridItems.querySelector(`[data-id="${id}"]`);
    this.gridItems.removeChild(itemToRemove);
  }
}
