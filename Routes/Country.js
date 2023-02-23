"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
var routeCache = require('route-cache');
const controller = require('../Controllers/commonController');
const Customer = require('../Controllers/CustomerControllers');
router.post('/api/common/countries', routeCache.cacheSeconds(20), controller.CountryApi);
router.post('/api/customer/create', Customer.DetailsApi);
router.get('/api/get', controller.Getdata);
router.post('/api/getOne', controller.GetdataOne);
module.exports = router;
