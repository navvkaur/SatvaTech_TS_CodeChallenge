const Sequ = require('sequelize');

const sequ = require('../Utils/Database');

const CountryMaster = sequ.define('countryMaster' , {
    id:{
        type:Sequ.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
       
    },
    CountryName:{
        type:Sequ.STRING,
       
    }
})

module.exports = CountryMaster;