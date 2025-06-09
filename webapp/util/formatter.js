sap.ui.define([], function () {
  "use strict";
  return {
    formatCurrency: function (value) {
      if (!value) return "";
      return parseFloat(value).toFixed(2) + " USD";
    }
  };
});
