const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "KZlx0bCR#NdpqgvLf3SmwlQBdWrTz0IN13PZqli4k835MK9kGEn4",
ALIVE_IMG: process.env.ALIVE_IMG || "https://i.ibb.co/bjF8GsTd/Rashmika-Ofc.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "┏━━━━━━━━━━━➤◍◉➤\n│ 🧝‍♀️💬 හායි කොහොමද 𝐈'𝐦 𝐐𝐄𝐄𝐍_𝐌𝐀𝐃𝐔-𝐌𝐃 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐁𝐨𝐭⚡*\n┗━━━━━━━━━━━━━━━━━━━━\n━➤◍◉➤\n┏━━━━━━━━━━━➤◍◉➤\n│ *🔔𝐈'𝐦 𝐀𝐥𝐢𝐯𝐞 𝐍𝐨𝐰❤️*\n┗━━━━━━━━━━\n━➤◍◉➤\n┏━━━━━━━━━━━➤◍◉➤\n│ *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : 𝐌𝐑_𝐒𝐔𝐑𝐀𝐍𝐆𝐀_𝐌𝐎𝐃-𝐙|*\n┗━━━━━━━━━━━━━━━━━━━━\n*2025🤍*\n\n┏━━━━━━━━━━━➤◍◉➤\n*This bot is made by Avishka_X technology.This is made with using Ai.You can use this bot easily.New updates will coming*\n┗━━━━━━━━━━━━━━━━━━━━\n\n🌻❤️ *join with us.....* 🌻❤️\nhttps://whatsapp.com/channel/0029Vb2th7xChq6PmU8iGF1B",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
MODE: process.env.MODE || "public",
BOT_NUMBER: process.env.BOT_NUMBER || "94769819044",
OWNER_REACT: process.env.OWNER_REACT || "🧜‍♀️",
OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39",
READ_CMD: process.env.READ_CMD || "true",
AUTO_VOICE: process.env.AUTO_VOICE || "true",
AUTO_TYPING: process.env.AUTO_TYPING || "false",
ALWAYS_RECORDING: process.env.ALWAYS_RECORDING || "true",
BOT_NAME: process.env.BOT_NAME || "QEEN_MADU-MD",
AUTO_REACT: process.env.AUTO_REACT || "true",
OWNER_REACT: process.env.OWNER_REACT || "true",
ANTI_DELETE: process.env.ANTI_DELETE || "true",
AUTO_MSG_READ: process.env.AUTO_MSG_READ || "true",
AI_MODE: process.env.AI_MODE || "true",
AUTO_STICKER: process.env.AUTO_STICKER || "true",
AUTO_REPLY: process.env.AUTO_REPLY || "true",
LANG: process.env.BOT_LANG || 'SI',
AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "true",
AUTO_STATUS__MSG: process.env.AUTO_STATUS__MSG || "😘❤️ *Qᴇᴇɴ_ᴍᴀᴅᴜ-ᴍᴅ sᴇᴇɴ ʏᴏᴜʀ sᴛᴀᴛᴜs* 😼❤️",
ANTI_CALL: process.env.ANTI_CALL || "true",
OWNER_NAME: process.env.OWNER_NAME || "SURANGA"
};