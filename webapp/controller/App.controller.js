sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/f/library"
], function (Controller, fioriLibrary) {
  "use strict";

  return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
    onInit: function () {
      this.oRouter = this.getOwnerComponent().getRouter();
      this.oRouter.attachRouteMatched(this.onRouteMatched, this);
    },

    onRouteMatched: function (oEvent) {
      const oLayout = this.getView().byId("app");
      const sRouteName = oEvent.getParameter("name");
      console.log("🧭 Matched route:", sRouteName);
      if (!oLayout) {
        console.error("❌ Layout not found!");
        return;
      }
      // Load the view manually into beginColumnPages
      const oView = this.getView().createId("tempView");
      sap.ui.core.mvc.XMLView.create({
       id: oView,
       viewName: "sap.ui.demo.walkthrough.view.InvoiceList"
      }).then(function (oPage) {
       oLayout.removeAllBeginColumnPages(); // clear anything before
       oLayout.addBeginColumnPage(oPage); // manually add
       oLayout.setLayout("OneColumn");
  });

      if (sRouteName === "main") {
        oLayout.setLayout(fioriLibrary.LayoutType.OneColumn);
      } else if (sRouteName === "detail") {
        oLayout.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
      }
    }
  });
});
