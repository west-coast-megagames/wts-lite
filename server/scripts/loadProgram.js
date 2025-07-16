// const { clans, sects, province } = require('../../data');
const { Team } =  require('../models/team');
const { logger } = require('./../middleware/log/winston');
const teams = require('../data/teams');
const { Role } = require('../models/role');

const loadTeams = async () => {
  try {
    const teamResult = await Team.deleteMany(); // Deletes all existing Teams...
    logger.info(`${teamResult.deletedCount} teams destroyed...`); // Shows how many were deleted on the console...
    const roleResult = await Role.deleteMany(); // Deletes all existing Roles...
    logger.info(`${roleResult.deletedCount} roles purged...`); // Shows how many were deleted on the console...
    
		let teamCount = 0;
		let roleCount = 0;

    // For loop creates a TEAM for every entry found in DATA
    for await (const team of teams) {
      const { name, shortName, code, roles } = team;
      let newTeam = new Team({
        name, shortName, code, roles: [], users:[]
      }); // Creates TEAM using MODEL
      newTeam = await newTeam.save(); // Saves TEAM into Mongo
      teamCount++;

			for await (const role of roles) {
				const { title, type, team } = role;
				let newRole = new Role({ title, type, team: newTeam._id })
				newRole = await newRole.save();
        newTeam.roles.push(newRole._id);

				roleCount++
			}

      await newTeam.save();
    }

    
    // let people = await TEAM.find(); // GETS all TEAMS post creation
    logger.info(`Created entries for ${teamCount} teams...`);
		logger.info(`Added ${roleCount} roles...`);
    
  } catch (error) {
    logger.error(error);
  }
}

// const loadTeams = async () => {
//   try {
//     const result = await Organization.deleteMany();
//     logger.info(`${result.deletedCount} clans faded into obscurity...`);
//     let count = 0;

//     for await (const org of [...clans, ...sects]) {
//       try {
//         const { name, ancestor, type, leadership, kamon } = org;
//         let dimyo = await Character.findOne(leadership.leader);

//         let clan = new Organization({
//           type,
//           name,
//           ancestor,
//           kamon,
//           leadership: {
//             leader: dimyo._id
//           },
//         });

//         clan = await clan.save();
//         await dimyo.addAffiliation(clan._id);
//         count++;
//       } catch (error) {
//         logger.error(error);
//       }
//     }

//     logger.info(`Created entries for ${count} teams...`);

//     // let groups = await Organization.find();
//     // let chars = await Character.find();

//     // console.log(groups);
//     // console.log(chars);

//   } catch (error) {
//     logger.error(error);
//   }
// };

// const loadJapan = async () => {
//   try {
//     const result = await Location.deleteMany();
//     logger.info(`${result.deletedCount} locations were devastated...`);
//     let count = 0;

//     for await (const place of province) {
//       try {
//         const { name, admin, income, unrest } = place;
//         let org = await Organization.findOne({ name: admin }).populate('leadership.leader');

//         // Program for generating random Fielty Values
//         const randomFealty = [];
//         const randFealty = Math.floor(Math.random() * (3 - 1 + 1) + 1);

//         for (let i = 0; i <= randFealty; i++) {
//           if (i === 0) {
//             randomFealty.push({
//               org: org.id,
//               percentage: Math.floor(Math.random() * (100 - 1 + 1) + 1),
//             })
//           } else {
//             let temp = await Organization.findOne().skip(Math.floor(Math.random() * 20));
//             randomFealty.push({
//               org: temp.id,
//               percentage: Math.floor(Math.random() * (100 - 1 + 1) + 1),
//             })
//           }
//         }
      
//         // Saving of the Location
//         let land = new Location({
//           name,
//           type: "Province",
//           income,
//           unrest,
//           admin: org._id,
//           fealty: randomFealty
//         });


//         land = await land.save();
//         count++
//       } catch (error) {
//         logger.error(`ERROR ${place.name} | ${place.admin}, `, error);
//       }
//     }

//     logger.info(`Created entries for ${count} provinces...`);
//     // let groups = await Organization.find();
//     // let chars = await Character.find();

//     // console.log(groups);
//     // console.log(chars);

//   } catch (error) {
//     logger.error(error);
//   }
// }

const loadDB = async (args = []) => {
  const loadAll = args.legth > 0 ? false : true;
  if (args.includes('teams') || loadAll) await loadTeams();
  // if (args.includes('organizations') || loadAll) await loadTeams();
  // if (args.includes('locations') || loadAll) await loadJapan();

  logger.info('Load Sequence complete...');
}

module.exports = { loadDB };