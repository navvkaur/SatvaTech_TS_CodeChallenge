"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomerAddresses = require('../Models/CustomerAddresses');
const Customers = require('../Models/Customers');
const CustomersMaster = require('../Models/CountryMaster');
const { Sequelize } = require('sequelize');
const dotnev = require('dotenv').config();
exports.CountryApi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { CustomerId, Streetaddress, City, state, AddressType, IsBillingSameAsShipping } = req.body;
    let error = [];
    if (CustomerId == null) {
        error.push({ "Message": " Customer id Required", "Detail": "The  customer id Required." });
    }
    if (City == null || state == null || Streetaddress == null) {
        error.push({ "Message": " Address Required",
            "Detail": "The  Address Required." });
    }
    if (error.length !== 0) {
        res.status(400).json(error);
    }
    else if (error.length == 0) {
        if ((AddressType == 1 || AddressType == 2) && IsBillingSameAsShipping == 'true') {
            try {
                for (let i = 1; i <= 2; i++) {
                    yield CustomerAddresses.create({
                        customerId: CustomerId,
                        Streetaddress: Streetaddress,
                        city: City,
                        state: state,
                        AddressType: i,
                        IsBillingSameAsShipping: true
                    });
                }
                return res.status(200).json({ Success: true, Message: 'Billing Address & shipping Address Added!' });
            }
            catch (err) {
                console.log(err);
                return res.status(404).json({ Success: false, Message: 'Something Went wrong!', error: err });
            }
        }
        else {
            if (AddressType == 1 && IsBillingSameAsShipping == 'false') {
                yield CustomerAddresses.create({
                    customerId: CustomerId,
                    Streetaddress: Streetaddress,
                    city: City,
                    state: state,
                    AddressType: 1,
                    IsBillingSameAsShipping: false
                }).then((response) => {
                    return res.status(200).json({ Success: true, Message: 'Billing Address Added!' });
                }).catch((err) => {
                    console.log(err);
                    res.status(404).json({ Success: false, Message: 'Something Went wrong!', error: err });
                });
            }
            else if (AddressType == 2 && IsBillingSameAsShipping == 'false') {
                yield CustomerAddresses.create({
                    customerId: CustomerId,
                    Streetaddress: Streetaddress,
                    city: City,
                    state: state,
                    AddressType: 2,
                    IsBillingSameAsShipping: false
                }).then(() => {
                    return res.status(200).json({ Success: true, Message: 'Shipping Address Added!' });
                }).catch((err) => {
                    console.log(err);
                    res.status(404).json({ Success: false, Message: 'Something Went wrong!', error: err });
                });
            }
        }
    }
});
exports.Getdata = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Customers.findAll({
            attributes: ['id', 'Email', 'fname', 'lname', 'suffix', 'country', 'company', 'countryMasterId'],
            include: [
                //     {
                //     required:true,
                //     model: CustomersMaster,
                //     attributes: ['CountryName','id'],
                //   },
                {
                    separate: true,
                    model: CustomerAddresses,
                    as: 'BillingAddress',
                    attributes: ['state', 'city', 'Streetaddress'],
                    where: { AddressType: 1 }
                }, {
                    separate: true,
                    model: CustomerAddresses,
                    as: 'ShippingAddress',
                    attributes: ['state', 'city', 'Streetaddress'],
                    where: { AddressType: 2 }
                }
            ]
        }).then((data) => {
            console.log(data);
            return res.status(200).json(data);
        }).catch((err) => {
            console.log(err);
            res.status(404).json({ Success: false, Message: 'Something Went wrong!', error: err });
        });
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ Success: false, Message: 'Something Went wrong!', error: err });
    }
});
exports.GetdataOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.body.id;
    try {
        yield Customers.findAll({
            where: { id: id },
            attributes: ['id', 'Email', 'fname', 'lname', 'suffix', 'country', 'company', 'countryMasterId'],
            include: [
                //     {
                //     required:true,
                //     model: CustomersMaster,
                //     attributes: ['CountryName','id'],
                //   },
                {
                    separate: true,
                    model: CustomerAddresses,
                    as: 'BillingAddress',
                    attributes: ['state', 'city', 'Streetaddress'],
                    where: { AddressType: 1 }
                }, {
                    separate: true,
                    model: CustomerAddresses,
                    as: 'ShippingAddress',
                    attributes: ['state', 'city', 'Streetaddress'],
                    where: { AddressType: 2 }
                }
            ]
        }).then((data) => {
            console.log(data);
            return res.status(200).json(data);
        }).catch((err) => {
            console.log(err);
            res.status(404).json({ Success: false, Message: 'Something Went wrong!', error: err });
        });
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ Success: false, Message: 'Something Went wrong!', error: err });
    }
});
