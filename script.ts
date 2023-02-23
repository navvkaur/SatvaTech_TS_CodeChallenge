import express from 'express';
import * as dotenv from 'dotenv';
const sequelize = require('./Utils/Database');
const Customer = require('./Models/Customers')
const CustomerAddresses = require('./Models/CustomerAddresses')
const CountryMaster = require('./Models/CountryMaster')
const app = express();
let  CountryRoutes = require('./Routes/Country')
const bodyParser = require('body-parser');

app.use(bodyParser.json({ extended: false}));
dotenv.config();
const PORT: number = parseInt(process.env.PORT as string, 10);

if (!process.env.PORT) {
  console.log(`Error to get ports`);
    process.exit(1);
 }
 
app.use(CountryRoutes)
Customer.hasMany(CustomerAddresses, {
    as:'BillingAddress',
    onDelete: "CASCADE",  
});
Customer.hasMany(CustomerAddresses, {
    as:'ShippingAddress',
    onDelete: "CASCADE",  
});

CustomerAddresses.belongsTo(Customer);
CountryMaster.hasMany(Customer);
Customer.belongsTo(CountryMaster);
sequelize.sync().then(()=>{
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
})