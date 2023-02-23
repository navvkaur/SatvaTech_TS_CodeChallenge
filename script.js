"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const sequelize = require('./Utils/Database');
const Customer = require('./Models/Customers');
const CustomerAddresses = require('./Models/CustomerAddresses');
const CountryMaster = require('./Models/CountryMaster');
const app = (0, express_1.default)();
let CountryRoutes = require('./Routes/Country');
const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: false }));
dotenv.config();
const PORT = parseInt(process.env.PORT, 10);
if (!process.env.PORT) {
    console.log(`Error to get ports`);
    process.exit(1);
}
app.use(CountryRoutes);
Customer.hasMany(CustomerAddresses, {
    as: 'BillingAddress',
    onDelete: "CASCADE",
});
Customer.hasMany(CustomerAddresses, {
    as: 'ShippingAddress',
    onDelete: "CASCADE",
});
CustomerAddresses.belongsTo(Customer);
CountryMaster.hasMany(Customer);
Customer.belongsTo(CountryMaster);
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});
