sap.ui.define([
  "sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
  "use strict";

  new ComponentContainer({
    name: "sap.ui.demo.walkthrough",
    async: true,
    settings: {
      id: "walkthrough"
    }
  }).placeAt("content");
});
