'use strict';

import './css/styles.css';
import View from './js/view';
import Model from './js/model';
import Controller from './js/controller';
const view = new View();
const model = new Model();

new Controller(model, view);
