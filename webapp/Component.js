sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/Device",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/resource/ResourceModel",
  "sap/ui/thirdparty/jquery"
], function (UIComponent, Device, JSONModel, ResourceModel) {
  "use strict";

  return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
    metadata: {
      manifest: "json"
    },

    init: function () {
      // Attach style.css properly
      sap.ui.getCore().attachInit(function () {
        const oLink = document.createElement("link");
        oLink.rel = "stylesheet";
        oLink.href = "css/style.css";
        document.head.appendChild(oLink);
      });

      // Base component initialization
      UIComponent.prototype.init.apply(this, arguments);

      // Router
      this.getRouter().initialize();
    }
  });
});
