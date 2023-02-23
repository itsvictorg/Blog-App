const sequelize = require('../config/connection');

const Accounts = require('../models/accounts');
const Leases = require('../models/leases');
const Residents = require('../models/residents');


const AccountSeedData = require('./accountSeedData.json');
const LeasesSeedData = require('./leasesSeedData.json');
const ResidentsSeedData = require('./residentsSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
   
    await Accounts.bulkCreate(AccountSeedData, {
        individualHooks: true,
        returning: true,
      });
    await Leases.bulkCreate(LeasesSeedData,{
        individualHooks: true,
        returning: true,
      });
    await Residents.bulkCreate(ResidentsSeedData, {
        individualHooks: true,
        returning: true,
      });

    process.exit(0);
}

seedDatabase();