sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/demo/walkthrough/util/formatter"

], function (Controller, Filter, FilterOperator, formatter) {
  "use strict";

  return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
    formatter: formatter,

    onFilterInvoices: function (oEvent) {
      const sQuery = oEvent.getParameter("newValue");
      const oList = this.byId("invoiceList");
      const oBinding = oList.getBinding("items");
      const aFilter = [];

      if (sQuery) {
        aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
      }

      oBinding.filter(aFilter);
    },

    onSortInvoices: function () {
      const oList = this.byId("invoiceList");
      const oBinding = oList.getBinding("items");
      const oSorter = new sap.ui.model.Sorter("UnitPrice", false);
      oBinding.sort(oSorter);
    },

    onListItemPress: function (oEvent) {
      const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      const oItem = oEvent.getSource();
      const oCtx = oItem.getBindingContext();
      oRouter.navTo("detail", {
        invoicePath: window.encodeURIComponent(oCtx.getPath().substr(1))
      });
    },

    onOpenDialog: function (oEvent) {
      const oView = this.getView();
      const oSource = oEvent.getSource();
      const oContext = oSource.getBindingContext();

      if (!this._pDialog) {
        this._pDialog = this.loadFragment({
          name: "sap.ui.demo.walkthrough.view.ProductDetails"
        });
      }

      this._pDialog.then(function (oDialog) {
        oView.addDependent(oDialog);
        oDialog.setBindingContext(oContext);
        oDialog.open();
      });
    },

    onCloseDialog: function () {
      this.byId("productDetailsDialog").close();
    }
  });
});
