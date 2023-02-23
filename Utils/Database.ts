const dotenv = require('dotenv').config();
const S = require('sequelize');

const s = new S(process.env.Database,'root',process.env.password,{
  dialect :'mysql',
  host: 'localhost'
});

module.exports = s;