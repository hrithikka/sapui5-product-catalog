sap.ui.define([
  "sap/ui/core/mvc/Controller",
  
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "../util/formatter",
  "sap/ui/core/UIComponent"
], function (Controller, Filter, FilterOperator, formatter) {
  "use strict";

  return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {

    formatter: formatter,

    onInit: function () {
      console.log("📄 InvoiceList Controller Loaded");

      // 🧪 DEBUG: Check if view is rendering into FlexibleColumnLayout
      const oView = this.getView();
      oView.addEventDelegate({
        onAfterShow: function () {
          console.log("🎉 InvoiceList view is now visible");
        }
      });

      
     
    },

    onFilterInvoices: function (oEvent) {
      const sQuery = oEvent.getParameter("newValue");
      const oList = this.byId("invoiceList");
      const oBinding = oList.getBinding("items");
      const aFilter = sQuery
        ? [new Filter("ProductName", FilterOperator.Contains, sQuery)]
        : [];

      oBinding.filter(aFilter);
    },

    onSortInvoices: function () {
      const oList = this.byId("invoiceList");
      const oBinding = oList.getBinding("items");
      const oSorter = new sap.ui.model.Sorter("UnitPrice", false);
      oBinding.sort(oSorter);
    },

    onListItemPress: function (oEvent) {
      const oRouter = this.getOwnerComponent().getRouter();
      const oItem = oEvent.getSource();
      const oCtx = oItem.getBindingContext();

      oRouter.navTo("detail", {
        invoicePath: window.encodeURIComponent(oCtx.getPath().substr(1))
      });
    },
    onToggleTheme: function () {
      const body = document.body;
      const page = this.byId("invoicePage");
      const header = document.querySelector(".sapMBar");
      const isDark = body.classList.toggle("dark-mode");
      
      if (page) {
        page.$().toggleClass("dark-mode");
      }
      if (header) {
        header.classList.toggle("dark-mode");
      }

      // Apply dark-mode to buttons, inputs, list items
      setTimeout(() => {
        document.querySelectorAll(".sapMSLI, .sapMBtn, .sapMInputBase, .sapMSearchFieldInner, .sapMDialog")
          .forEach(el => el.classList.toggle("dark-mode"));
       }, 100);
      const oButton = this.byId("themeToggleButton");
      if (oButton) {
        oButton.setText(isDark ? "☀️" : "🌙");
      }
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
