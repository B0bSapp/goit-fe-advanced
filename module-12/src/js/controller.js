'use strict';
export default class Controller {
  constructor(model, view) {
    this.view = view;
    this.model = model;
    this.urlAddr = document.querySelector('.url-adder');
    this.addBtn = document.querySelector('.add-btn');
    this.urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    this.addBtn.addEventListener('click', event => {
      event.preventDefault();
      const urlContent = event.target.parentNode.querySelector('.input').value;
      if (!urlContent) return;
      if (!this.urlPattern.test(urlContent)) {
        alert(`Specified URL ${urlContent} does not match pattern`);
        this.urlAddr.reset();
        return;
      }
      if (this.model.itemExists(urlContent)) {
        alert(`URL ${urlContent} already exists`);
        this.urlAddr.reset();
        return;
      }
      this.model.saveItem(urlContent).then(createdItem => {
        const newItem = this.view.handleAdd(createdItem);
        const removeBtn = newItem.querySelector('.remove-btn');
        removeBtn.addEventListener('click', this.onRemove.bind(this));
      });
      this.urlAddr.reset();
    });
    this.onInit();
  }
  onRemove(event) {
    const itemId = event.target.parentNode.dataset.id;
    this.model.removeItem(itemId).then(response => {
      this.view.handleRemove(itemId);
    });
  }
  onInit() {
    this.view.addItemsBulk(this.model.getExistingItems()).forEach(element => {
      const removeBtn = element.querySelector('.remove-btn');
      removeBtn.addEventListener('click', this.onRemove.bind(this));
    });
  }
}
