SAPUI5 Product Catalog App

This is a 3-week learning project designed to explore core SAPUI5 development skills. It was built from scratch using UI5 CLI and follows the MVC architecture.

✅ Week 1 – UI Fundamentals

Built from scratch using UI5 CLI

Created a basic SAPUI5 app using local Invoices.json

Implemented:

XML Views & Controllers

JSONModel

Button

SearchField for filtering

Table with sorting functionality

Used responsive layout and followed best practices for app structure

🚀 Why We Manually Bootstrapped the App

Instead of using the default walkthrough style where the component is auto-loaded using HTML attributes like this:

<div data-sap-ui-component data-name="sap.ui.demo.walkthrough" ...></div>

We used the following approach in our index.html:

<script>
  sap.ui.getCore().attachInit(function () {
    sap.ui.require([
      "sap/ui/core/ComponentContainer"
    ], function (ComponentContainer) {
      new ComponentContainer({
        name: "sap.ui.demo.walkthrough",
        async: true
      }).placeAt("content");
    });
  });
</script>

🧠 Why?

UI5 does **not auto-run **`` unless it's explicitly bootstrapped.

SAPUI5 apps need to be triggered after the core is ready — hence attachInit().

Using sap.ui.require() ensures modules like ComponentContainer are loaded correctly by UI5’s own module loader.

This method gives manual control, avoids anonymous define() errors, and helps with testing and extensions later.

Both styles are valid. We used this method to better align with real-world SAPUI5 apps.

📁 Folder Structure

sapui5-product-catalog/
└── webapp/
    ├── index.html
    ├── index.js
    ├── Component.js
    ├── manifest.json
    ├── Invoices.json
    ├── view/
    │   ├── App.view.xml
    │   └── InvoiceList.view.xml
    └── controller/
        ├── App.controller.js
        └── InvoiceList.controller.js

Next: Week 2 – Routing, OData Integration & Dialogs