import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class CategoriesHeaderItem extends Component {
  @tracked category = [];

  constructor() {
      super(...arguments);
      this.category = this.args.category;
  }
}