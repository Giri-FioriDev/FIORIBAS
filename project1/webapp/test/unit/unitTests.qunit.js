/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"oasis/project1/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});