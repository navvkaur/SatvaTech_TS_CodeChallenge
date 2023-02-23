"use strict";
const Sequelize = require('sequelize');
const sequelize = require('../Utils/Database');
const Customer = sequelize.define('customer', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    fname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    mname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    suffix: {
        type: Sequelize.STRING
    },
    company: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Phone: {
        type: Sequelize.INTEGER,
    },
    Mobile: {
        type: Sequelize.INTEGER,
    },
    Fax: {
        type: Sequelize.INTEGER,
    },
    other: {
        type: Sequelize.STRING
    },
    website: {
        type: Sequelize.STRING
    },
    issubcustomer: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});
module.exports = Customer;
