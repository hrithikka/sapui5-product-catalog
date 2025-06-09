sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceDetail", {
    onInit: function () {
      const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: function (oEvent) {
      const oArgs = oEvent.getParameter("arguments");
      const sPath = "/" + decodeURIComponent(oArgs.invoicePath);
      this.getView().bindElement({ path: sPath });
    }
  });
});
