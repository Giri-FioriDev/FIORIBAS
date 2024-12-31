sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], (Controller, History) => {
    "use strict";

    return Controller.extend("oasis.project1.controller.View2", {
        onInit() {
        },
        gotoobjectviewEH: function () {

            this.getOwnerComponent().getRouter().navTo("object", {
                objectId: "1001"
            }, true);

        },
        insertdataEH: function () {

            var DataObject = {};

            DataObject.Userid = this.getView().byId("myuserid").getValue();
            DataObject.Firstname = this.getView().byId("myfname").getValue();
            DataObject.Lastname = this.getView().byId("mylname").getValue();
            DataObject.Emailid = this.getView().byId("myemailid").getValue();
            DataObject.Country = this.getView().byId("mycountry").getValue();
            DataObject.Salary = this.getView().byId("mysalary").getValue();
            DataObject.Phone = this.getView().byId("myphone").getValue();

            var odatamodel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/Z8AM_CRUD_ODATAPROJECT_SRV");

            odatamodel.create("/EMPSet", DataObject, null,

                function (oResponse) {
                    sap.m.MessageBox.success("Record Inserted Successfully");
                },
                function () {
                    sap.m.MessageBox.error("Record Not Inserted");

                });

            this.getOwnerComponent().getModel().refresh(true);

        },

        updatedataEH: function () {

            var DataObject = {};

            DataObject.Userid = this.getView().byId("myuserid").getValue();
            DataObject.Firstname = this.getView().byId("myfname").getValue();
            DataObject.Lastname = this.getView().byId("mylname").getValue();
            DataObject.Emailid = this.getView().byId("myemailid").getValue();
            DataObject.Country = this.getView().byId("mycountry").getValue();
            DataObject.Salary = this.getView().byId("mysalary").getValue();
            DataObject.Phone = this.getView().byId("myphone").getValue();

            var odatamodel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/Z8AM_CRUD_ODATAPROJECT_SRV");

            odatamodel.update("/EMPSet('" + DataObject.Userid + "')", DataObject, null,

                function (oResponse) {
                    sap.m.MessageBox.success("Record Updated Successfully");
                },
                function () {
                    sap.m.MessageBox.error("Record Not Updated");

                });

            this.getOwnerComponent().getModel().refresh(true);

        },

        deletedataEH: function () {
            var DataObject = {};

            DataObject.Userid = this.getView().byId("myuserid").getValue();

            var odatamodel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/Z8AM_CRUD_ODATAPROJECT_SRV");

            odatamodel.remove("/EMPSet('" + DataObject.Userid + "')", null,

                function (oResponse) {
                    sap.m.MessageBox.success("Record Deleted Successfully");
                },
                function () {
                    sap.m.MessageBox.error("Record Not Deleted");

                });

            this.getOwnerComponent().getModel().refresh(true);

        },
        onNavBack: function () {
            var sPreviousHash = History.getInstance().getPreviousHash(),
                oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

            if (sPreviousHash !== undefined || !oCrossAppNavigator.isInitialNavigation()) {
                history.go(-1);
            } else {
                this.getRouter().navTo("worklist", {}, true);
            }
        },
    });
});