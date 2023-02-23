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
const Customers = require('../Models/Customers');
const CustomersMaster = require('../Models/CountryMaster');
function addtomaster(country) {
    return __awaiter(this, void 0, void 0, function* () {
        yield CustomersMaster.findOne({ where: { CountryName: country } }).then((res) => __awaiter(this, void 0, void 0, function* () {
            if (!res) {
                yield CustomersMaster.create({ CountryName: country }).then((data) => {
                    return data.id;
                });
            }
            else {
                return res.id;
            }
        })).catch((err) => { console.log(err); });
    });
}
exports.DetailsApi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        let detail = req.body;
        let error = [];
        if (detail.fname == null || detail.mname == null || detail.lname == null) {
            error.push({ "Message": " Name Required",
                "Detail": "The Name Required." });
        }
        if (detail.country == null) {
            error.push({ "Message": " Country Name Required",
                "Detail": "The  Country Name Required." });
        }
        if (detail.company == null) {
            error.push({ "Message": " Company Name Required",
                "Detail": "The  Company Name Required." });
        }
        if (detail.Email == null) {
            error.push({ "Message": " Email Required",
                "Detail": "The  Email Required." });
        }
        const email = yield Customers.findOne({ where: { Email: detail.Email } });
        if (email) {
            error.push({
                "Message": "Duplicate Email Exists",
                "Detail": "The Email supplied already exists.",
            });
        }
        if (error.length) {
            return res.status(400).json(error);
        }
        if (error.length == 0) {
            yield addtomaster(detail.country);
            CustomersMaster.findOne({ where: { CountryName: detail.country } }).then((d) => __awaiter(void 0, void 0, void 0, function* () {
                yield Customers.create(detail).then((data) => {
                    Customers.update({ countryMasterId: d.id }, { where: { id: data.id } });
                });
                return res.status(200).json({ 'Success': 'true', Message: 'Customer Created!' });
            }));
        }
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ Success: false, Message: 'Something Went wrong!', error: err });
    }
});
