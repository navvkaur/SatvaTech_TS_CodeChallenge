import express from 'express';
const router= express();
var routeCache = require('route-cache');
const controller = require('../Controllers/commonController')
const Customer = require('../Controllers/CustomerControllers')

router.post('/api/common/countries',routeCache.cacheSeconds(20),controller.CountryApi);
router.post('/api/customer/create',Customer.DetailsApi);
router.get('/api/get',controller.Getdata)
router.post('/api/getOne',controller.GetdataOne)



module.exports = router;