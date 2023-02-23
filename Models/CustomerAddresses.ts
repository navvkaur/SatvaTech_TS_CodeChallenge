const Seq = require('sequelize');

const seq = require('../Utils/Database');
const CustomerAddresses = seq.define('customeraddresses', {
    AddressId: {
      type: Seq.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    
    Streetaddress: {
      type: Seq.STRING,
      allowNull: false,
    },
    city: {
      type: Seq.STRING,
      allowNull: false
    },
    state: {
      type: Seq.STRING,
      allowNull: false
    },
    AddressType: {
      type: Seq.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[1, 2]]
      }
    },
    IsBillingSameAsShipping: {
      type: Seq.BOOLEAN,
      allowNull: false
    }
  });
  
  module.exports = CustomerAddresses;