sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "oasis/project1/model/formatter",
    "sap/m/MessageBox"
], function (Controller, formatter) {
    "use strict";

    return Controller.extend("oasis.project1.controller.View1", {
        formatter: formatter,
        onInit() {

            // var htmlobject = new sap.ui.core.HTML({
            //     content: '<Video height="500px"  width="600px" controls>' +
            //         '<source src="/videofile.mp4"   type="video/mp4" />' +
            //         '</Video>'
            // });

            // var icontabfilter = this.getView().byId("myicontabfilter");

            // icontabfilter.addContent(htmlobject);

            var odatamodelo = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMY9PMODATAPROJECT_SRV/");

            this.getOwnerComponent().setModel(odatamodelo, "ODATA2");
        },


        submitdataEH: function () {
            var userid = this.getView().byId("userid").getValue();
            var fname = this.getView().byId("fname").getValue();
            var lname = this.getView().byId("lname").getValue();
            var emailid = this.getView().byId("emailid").getValue();
            var country = this.getView().byId("country").getValue();
            var salary = this.getView().byId("salary").getValue();
            var mobileno = this.getView().byId("mobileno").getValue();
            var password = this.getView().byId("password").getValue();
            var cbstatus = this.getView().byId("checkbox").getSelected();
            var switchstatus = this.getView().byId("switch").getState();
            var rating = this.getView().byId("rating").getValue();
            var slider = this.getView().byId("slider").getValue();
            var progress = this.getView().byId("progress").getPercentValue();
            var datepicker = this.getView().byId("datepicker").getValue();
            var timepicker = this.getView().byId("timepicker").getValue();
            var textarea = this.getView().byId("textarea").getValue();
            var dropdown = this.getView().byId("dropdown").getSelectedItem().getText();
            var combobox = this.getView().byId("combobox").getSelectedItem().getText();
            var radiobt = this.getView().byId("radiobtgroup").getSelectedButton().getText();
            var multicomboxboxitems = this.getView().byId("multicombobox").getSelectedItems();
            var multiinputitems = this.getView().byId("multiinput").getTokens();
            var multicomboboxarray = [];
            var multiinputarray = [];
            for (var i = 0; i < multicomboxboxitems.length; i++) {
                multicomboboxarray.push(multicomboxboxitems[i].getText());
            }
            for (var j = 0; j < multiinputitems.length; j++) {
                multiinputarray.push(multiinputitems[j].getText());
            }
            sap.m.MessageBox.success(userid + " " + fname + " " + lname + " " + emailid + " " + country + " " + salary + " " + mobileno + " " +
                password + " " + cbstatus + " " + switchstatus + " " + rating + " " + slider + " " + progress + " " +
                datepicker + " " + timepicker + " " + textarea + " " + dropdown + " " + combobox + " " + radiobt + " " +
                multicomboboxarray + " " + multiinputarray);

        },

        editEH: function () {
            //Get the Reference of Image Field & Make it Visible as true
            //Get the Reference of Input Fields & Make it enabled as true

            this.getView().byId("image").setVisible(true);
            this.getView().byId("userid").setEnabled(true);
            this.getView().byId("fname").setEnabled(true);
            this.getView().byId("lname").setEnabled(true);
            this.getView().byId("emailid").setEnabled(true);
            this.getView().byId("country").setEnabled(true);
            this.getView().byId("salary").setEnabled(true);
            this.getView().byId("mobileno").setEnabled(true);
            this.getView().byId("password").setEnabled(true);
        },




        getdataEH: function () {
            var country = this.getView().byId("mycountryinput").getValue();
            var salary = this.getView().byId("mysalaryinput").getValue();
            var table = this.getView().byId("mytable");
            var filterobject1 = new sap.ui.model.Filter("Country", sap.ui.model.FilterOperator.EQ, country);
            var filterobject2 = new sap.ui.model.Filter("Salary", sap.ui.model.FilterOperator.GT, salary);
            var tableitems = table.getBinding("items");
            tableitems.filter([
                filterobject1,
                filterobject2
            ]);
        },

        /**
    *@memberOf oasis.controller.Object
    */


        exportdataEH: function () {
            //Construct OData Service URL with EntitySet and format=xlsx
            //use redirect Method & pass OData Service URL

            var odataserviceurl = "/sap/opu/odata/sap/Z8AM_CRUD_ODATAPROJECT_SRV/EMPSet?$format=xlsx";

            sap.m.URLHelper.redirect(odataserviceurl, true);

        },

        assigncountEH: function (oEvent) {
            //get the Record Count from Table
            //Get The reference of Table
            // Assign RecordCount to Table HeaderText

            var recordcount = oEvent.getParameter("total");

            var tableref = this.getView().byId("mytable");

            tableref.setHeaderText(recordcount + " " + "Record(s) Found in Database");
        },



        uploadcompleteEH: function (oEvent) {
            var response = oEvent.getParameter("response");

            if (response) {

                sap.m.MessageBox.information("Return Code:" + response);

            }

        },
        fileuploadEH: function () {
            this.getOwnerComponent().getModel().refreshSecurityToken();

            var userid = this.getView().byId("useridinput").getValue();

            var fileuploader = this.getView().byId("myfileuploader");

            fileuploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                name: "slug",
                value: fileuploader.getValue()
            }));

            fileuploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                name: "x-csrf-token",
                value: this.getOwnerComponent().getModel().getHeaders()['x-csrf-token']
            }));


            fileuploader.setUploadUrl("/sap/opu/odata/SAP/ZNEWFILESPROJECT_SRV/UserSet('" + userid + "')/NP_ON_USERID");

            fileuploader.upload();
        },

        filedownloadEH: function () {
            var userid = this.getView().byId("useridinput").getValue();

            var filecontentsurl = "/sap/opu/odata/SAP/ZNEWFILESPROJECT_SRV/FileSet('" + userid + "')/$value";

            sap.m.URLHelper.redirect(filecontentsurl, true);


        },
        filepreviewEH: function () {

            var userid = this.getView().byId("useridinput").getValue();

            var formref = this.getView().byId("myform");

            var odatamodelobject = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZNEWFILESPROJECT_SRV");

            odatamodelobject.read("/FileSet('" + userid + "')/$value", null, null, true,
                function (OData, oResponse) {
                    var odatafilecontent = oResponse.requestUri;

                    var htmlo = new sap.ui.core.HTML();

                    htmlo.setContent("<Iframe src=" + odatafilecontent + " width='400px' height='400px' />");

                    formref.addContent(htmlo);

                });
        },




        fnamevalEH: function () {
            var fnamevalue = this.getView().byId("fname").getValue();

            if (fnamevalue.length > 5 && fnamevalue.length < 12) {

                this.getView().byId("imageindicator1").setSrc("/greencolor.gif");
                this.getView().byId("text1").setText("Firstname is Valid");

            }
            else {

                this.getView().byId("imageindicator1").setSrc("/redcolor.gif");
                this.getView().byId("text1").setText("Firstname is Not Valid");


            }


        },

        lnamevalEH: function () {
            var lnamevalue = this.getView().byId("lname").getValue();

            var regexpression = /^[A-Za-z]+$/;

            if (lnamevalue.match(regexpression)) {

                this.getView().byId("imageindicator2").setSrc("/greencolor.gif");
                this.getView().byId("text2").setText("Lastname is Valid");

            } else {

                this.getView().byId("imageindicator2").setSrc("/redcolor.gif");
                this.getView().byId("text2").setText("Lastname is Not Valid");

            }




        },
        emailidvalEH: function () {

            var emailidvalue = this.getView().byId("emailid").getValue();

            var atposition = emailidvalue.indexOf("@");
            var dotposition = emailidvalue.lastIndexOf(".");

            if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= emailidvalue.length) {


                this.getView().byId("imageindicator3").setSrc("/redcolor.gif");
                this.getView().byId("text3").setText("Emaild is Not Valid");


            } else {

                this.getView().byId("imageindicator3").setSrc("/greencolor.gif");
                this.getView().byId("text3").setText("Emaild is Valid");



            }




        },
        countryvalEH: function () {
            var countryvalue = this.getView().byId("country").getValue();

            if (countryvalue === "INDIA" || countryvalue === "US") {

                this.getView().byId("imageindicator4").setSrc("/greencolor.gif");
                this.getView().byId("text4").setText("Country is Valid");

            } else {

                this.getView().byId("imageindicator4").setSrc("/redcolor.gif");
                this.getView().byId("text4").setText("Country is Not Valid");


            }

        },
        salaryvalEH: function () {

            var salaryvalue = this.getView().byId("salary").getValue();

            if (isNaN(salaryvalue)) {

                this.getView().byId("imageindicator5").setSrc("/redcolor.gif");
                this.getView().byId("text5").setText("Salary is Not Valid");

            } else {

                this.getView().byId("imageindicator5").setSrc("/greencolor.gif");
                this.getView().byId("text5").setText("Salary is Valid");

            }


        },
        mobilevalEH: function () {
            var mobileno = this.getView().byId("mobileno").getValue();

            var regexpression = /^\d{10}$/;

            if (mobileno.match(regexpression)) {
                this.getView().byId("imageindicator6").setSrc("/greencolor.gif");
                this.getView().byId("text6").setText("Mobile Number is Valid");


            } else {

                this.getView().byId("imageindicator6").setSrc("/redcolor.gif");
                this.getView().byId("text6").setText("Mobile Number is Not Valid");

            }


        },
        passwordvalEH: function () {
            var passwordvalue = this.getView().byId("password").getValue();

            var regexpression = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%&*]).{6,12}$/;

            if (passwordvalue.match(regexpression)) {
                this.getView().byId("imageindicator7").setSrc("/greencolor.gif");
                this.getView().byId("text7").setText("Password is Valid");


            } else {

                this.getView().byId("imageindicator7").setSrc("/redcolor.gif");
                this.getView().byId("text7").setText("Password is Not Valid");

            }

            this.getView().byId("passwordtext").setText(passwordvalue);

        },
        enddatevalEH: function () {
            var startdate = this.getView().byId("datepicker1").getValue();
            var enddate = this.getView().byId("datepicker2").getValue();

            if (Date.parse(enddate) > Date.parse(startdate)) {
                this.getView().byId("imageindicator8").setSrc("/greencolor.gif");
                this.getView().byId("text8").setText("End Date is Valid");


            } else {

                this.getView().byId("imageindicator8").setSrc("/redcolor.gif");
                this.getView().byId("text8").setText("End Date is Not Valid");


            }


        },

        getemployeesEH: function () {

            var modelobject3 = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z8AM_CRUD_ODATAPROJECT_SRV");

            var countryinput = this.getView().byId("countryinput").getValue();

            var tableref = this.getView().byId("myemptable");

            modelobject3.callFunction("/GETEMPLOYEES", {
                method: "GET",
                urlParameters: { Country: countryinput },
                success: function (oData, response) {
                    var jModel = new sap.ui.model.json.JSONModel();
                    var myData = {};
                    myData = oData;
                    jModel.setData(myData);

                    tableref.setModel(jModel, "JSONMODEL3");

                },
                error: function (oError) {
                    sap.m.MessageBox.error("Function Import Error");

                }


            });

        },

        gotoview2EH: function () {

            this.getOwnerComponent().getRouter().getTargets().display("View2");

        },
        gotoview3EH: function () {

            this.getOwnerComponent().getRouter().getTargets().display("View3");

        },

        capturerecordEH: function (oEvent) {
            //implement functionality
            var listitem = oEvent.getParameter("listItem");
            var selectedrow = listitem.getBindingContext();
            var DataObject = {};
            DataObject.Userid = selectedrow.getProperty("Userid");
            DataObject.Firstname = selectedrow.getProperty("Firstname");
            DataObject.Lastname = selectedrow.getProperty("Lastname");
            DataObject.Emailid = selectedrow.getProperty("Emailid");
            DataObject.Country = selectedrow.getProperty("Country");
            DataObject.Salary = selectedrow.getProperty("Salary");
            DataObject.Phone = selectedrow.getProperty("Phone");
            if (DataObject.Salary > 80000) {
                DataObject.Status = "Experience EMP";
                DataObject.Image = "/greencolor.gif";
                DataObject.CheckBox = true;
                DataObject.Switch = true;
                DataObject.Rating = 4;
                DataObject.Progress = 80;
                DataObject.Slider = 80;
            } else {
                DataObject.Status = "Fresher EMP";
                DataObject.Image = "/redcolor.gif";
                DataObject.CheckBox = false;
                DataObject.Switch = false;
                DataObject.Rating = 2;
                DataObject.Progress = 40;
                DataObject.Slider = 40;
            }
            var jsonmodelobject = new sap.ui.model.json.JSONModel();
            jsonmodelobject.setData(DataObject);
            this.getOwnerComponent().setModel(jsonmodelobject, "JSONMODEL");

            this.gotoview2EH();

        }

    });
});