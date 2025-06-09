sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
  "use strict";

  return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
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
      const oSorter = new sap.ui.model.Sorter("ExtendedPrice", false);
      oBinding.sort(oSorter);
    }
  });
});
