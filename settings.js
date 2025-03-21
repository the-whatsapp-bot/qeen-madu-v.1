const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}



module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? '' : process.env.SESSION_ID,
LOGO: process.env.LOGO === undefined ? 'https://i.ibb.co/mrKTL314/Rashmika-Ofc.jpg' : process.env.LOGO,
FOOTER: process.env.FOOTER === undefined ? 'QUEEN-MADU-MD' : process.env.FOOTER       
};
