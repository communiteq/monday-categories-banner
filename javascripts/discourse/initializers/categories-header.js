import { withPluginApi } from "discourse/lib/plugin-api";
import { default as Category } from "discourse/models/category";

export default {
  name: "categories-header",
  initialize() {
    withPluginApi("0.8.7", (api) => {

      const idList = settings.featured_categories.split("|");
      const featuredCategories = idList.map(id => Category.findById(id));

      api.registerConnectorClass("above-main-container", "categories-header", {
        setupComponent(args, component) {
          api.onPageChange((url, title) => {
            if (url === "/" || url === "/latest" || url === "/new" || url === "/unread" || url === "/top") {
              $("html").addClass("categories-header");
              // add a class to the HTML tag for easy CSS targetting
              component.set("categories", featuredCategories);
            } else {
              // If the page doesn't match the urls above
              $("html").removeClass("categories-header");
              // Remove our custom class
              component.set("categories", []);
              // set the categories to an empty array to disable rendering
            }
          });
        },
      });
    });
  },
};
