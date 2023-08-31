import Component from '@glimmer/component';
import { default as Category } from "discourse/models/category";
import { inject as service } from "@ember/service";
import { withPluginApi } from "discourse/lib/plugin-api"
import { tracked } from '@glimmer/tracking';
import { ajax } from "discourse/lib/ajax";
import { action } from '@ember/object'
import loadScript from "discourse/lib/load-script";
import { bind } from "discourse-common/utils/decorators"

export default class CategoriesHeader extends Component {
    @service router;
    @tracked categories = [];

    constructor() {
        super(...arguments);

        const idList = settings.featured_categories.split("|");
        const featuredCategories = idList.map(id => Category.findById(id));
        this.categories = featuredCategories;
    }

    get mustShow() {
        return (this.router.currentRoute.name === 'discovery.top') || false;
    }

    updateSlides(index) {
        const slidesWrapper = document.querySelector('.categories-banner-wrapper');
        const slideWidth = slidesWrapper.offsetWidth;
        slidesWrapper.scrollLeft = index * (slideWidth + 10);
    }

    updateIndicators(index) {
        this.index = index;
        const indicators = document.querySelectorAll('.categories-header .bullet-x-indicators .bullet-x');
        indicators.forEach((indicator, idx) => {
            if (idx === index) {
                indicator.style.backgroundColor = '#6161ff';
                indicator.style.borderColor = '#6161ff';
            } else {
                indicator.style.backgroundColor = 'transparent';
                indicator.style.borderColor = '#676879';
            }
        });
    }

    @action
    selectSlide(event) {
        const target = event.target;
        const index = parseInt(target.dataset.index, 10);
        this.updateSlides(index);
        this.updateIndicators(index);
    }

    @action
    onComponentMount() {
        const element = document.querySelector('.categories-banner-wrapper');
        const slideWidth = element.offsetWidth;
        element.addEventListener('scroll', (event) => {
            var idx = Math.max(Math.round(event.target.scrollLeft / slideWidth), 0);
            if (idx != this.index) {
                this.updateIndicators(idx);
            }
        });

        
    }
}
