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

✅ Week 2 – Navigation, OData Integration, Fragments, Formatters
Goal: Connect to live OData service, implement master-detail navigation, and show detailed dialogs using fragments.

🚀 Implemented
Routing Setup:

Defined routes (main, detail) and targets in manifest.json

Enabled routing in Component.js using this.getRouter().initialize();

Linked InvoiceList (main) and InvoiceDetail (detail) views via URL pattern

Live Data Integration:

Integrated Northwind OData v2 using "sap.ui.model.odata.v2.ODataModel"

Created proxy using ui5-middleware-simpleproxy in ui5.yaml to bypass CORS issues

Fragments for Product Detail Dialog:

Used a reusable XML fragment ProductDetails.fragment.xml

Showed product-specific info when the View button was pressed

Formatter:

Implemented a custom formatter.js inside model/ to format price in XX.XX USD

Used in XML via:

xml
Copy
Edit
<ObjectNumber number="{path: 'UnitPrice', formatter: '.formatter.formatCurrency'}" />
Binding Context:

Passed the selected row's binding context to the dialog for accurate data display

Dynamic Sorting & Filtering:

Replaced old JSON logic (ExtendedPrice) with real OData field (UnitPrice)

Updated search & sort to work with live backend data

⚠️ Issues Faced 
Blank Screen / Loader Stuck

Root Cause: Used anonymous define() in wrong context.

✅ Fix: Used ComponentContainer via sap.ui.require() inside sap.ui.getCore().attachInit()

404 Errors – Component-preload.js

Root Cause: UI5 tries to preload modules even if not manually created.

✅ Fix: Ignored safely as it doesn’t affect runtime.

OData Not Loading (CORS Issue)

Root Cause: Northwind service was blocked due to missing CORS headers.

✅ Fix: Added "ui5-middleware-simpleproxy" in ui5.yaml and mapped /northwind to the actual service.

Formatter Not Found

Root Cause: Mistyped folder name as uitl instead of util

✅ Fix: Corrected path in import and moved the file if needed

Dialog Not Showing Price/Quantity

Root Cause: Old field names from local JSON (e.g., ExtendedPrice, Quantity) didn't match OData structure (UnitPrice, QuantityPerUnit)

✅ Fix: Adjusted bindings inside ProductDetails.fragment.xml

Sort → Table Went Blank

Root Cause: Sorting on wrong property ExtendedPrice (non-existent in OData)

✅ Fix: Switched sorter to use UnitPrice

