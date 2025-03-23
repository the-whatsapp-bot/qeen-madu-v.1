const { fetchJson } = require('../lib/functions')
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const getFBInfo = require("@xaviabot/fb-downloader");
const { igdl } = require('ruhend-scraper')
const axios = require('axios');
const { cmd, commands } = require('../command')
 
cmd({
    pattern: "tiktok",
    alias: ["tt"],
    react: "🎥",
    desc: "download tt videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return await reply("*give me tiktok url ❌*")
        m.react('⬇️')
        //fetch data from api  
        //fetch data from api
      let dat = await fetchJson(
        `https://mr-rashmika-apis.vercel.app/scrape-tiktok?url=${q}&apikey=MR.RASHMIKA`
      );
      let datas = dat.data.data;
      let desc = `
🎟️ *QUEEN-MADU-MD TIKTOK DOWNLOADER* 🎟️  

🔢 *Please reply with the number you want to select:*  

📌 *Title:* ${datas.title}  
✍️ *Author:* ${datas.author}  
🔗 *URL:* ${q}  

1️⃣ 📽️ *Video (No Watermark)*  
2️⃣ 🎭 *Video (With Watermark)*  
3️⃣ 🎵 *Audio (MP3)*  

✨ *Reply with the number to download your choice!* 🚀
     
     `;

const sentMsg = await conn.sendMessage(from, {
  image: { url: datas.thumbnail}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
  caption: desc,
  contextInfo: {
      mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
      groupMentions: [],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
          newsletterJid: '120363299978149557@newsletter',
          newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
          serverMessageId: 999
      },
      externalAdReply: {
          title: '© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚',
          body: ' ©𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 💚',
          mediaType: 1,
          sourceUrl: "https://github.com/Mrrashmika",
          thumbnailUrl: 'https://raw.githubusercontent.com/RASH-DATA/ANJU-DATA/refs/heads/main/LOGOS/thisjpg.jpg', // This should match the image URL provided above
          renderLargerThumbnail: false,
          showAdAttribution: true
      }
  }
});
const messageID = sentMsg.key.id; // Save the message ID for later reference


// Listen for the user's response
conn.addReplyTracker(messageID, async (mek, messageType) => {
    if (!mek.message) return;
    const from = mek.key.remoteJid;
    const sender = mek.key.participant || mek.key.remoteJid;

    // React to the user's reply (the "1" or "2" message)
    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1') {
            // Handle option 1 (no wm File)
            await conn.sendMessage(from, {
              video: { url: datas.watermark}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ WHATSAPP BOT",
              contextInfo: {
                  mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                  groupMentions: [],
                  forwardingScore: 999,
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                      newsletterJid: '120363299978149557@newsletter',
                      newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
                      serverMessageId: 999
                  },
                  externalAdReply: {
                      title: '© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚',
                      body: ' ©𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 💚',
                      mediaType: 1,
                      sourceUrl: "https://github.com/Mrrashmika",
                      thumbnailUrl: 'https://raw.githubusercontent.com/RASH-DATA/ANJU-DATA/refs/heads/main/LOGOS/thisjpg.jpg', // This should match the image URL provided above
                      renderLargerThumbnail: false,
                      showAdAttribution: true
                  }
              }
            });
            }
         else if (messageType === '2') {
            // Handle option 2 (wm File)
            await conn.sendMessage(from, {
              video: { url: datas.nowm}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ WHATSAPP BOT",
              contextInfo: {
                  mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                  groupMentions: [],
                  forwardingScore: 999,
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                      newsletterJid: '120363299978149557@newsletter',
                      newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
                      serverMessageId: 999
                  },
                  externalAdReply: {
                      title: '© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚',
                      body: ' ©𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 💚',
                      mediaType: 1,
                      sourceUrl: "https://github.com/Mrrashmika",
                      thumbnailUrl: 'https://raw.githubusercontent.com/RASH-DATA/ANJU-DATA/refs/heads/main/LOGOS/thisjpg.jpg', // This should match the image URL provided above
                      renderLargerThumbnail: false,
                      showAdAttribution: true
                  }
              }
            }); }
           
          else if (messageType === '3') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: datas.audio }, mimetype: "audio/mpeg" }, { quoted: mek })  
    
          }

        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
});

} catch (e) {
console.log(e);
reply(`${e}`);
}
});

// Facebook Downloader
cmd({
  pattern: "fb",
  alias: ["facebook"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
     try {
    
      if (!q || !q.startsWith("https://")) {
        return conn.sendMessage(from, { text: "❌ Please provide a valid URL." }, { quoted: mek });
    }
    
    await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
    
    const result = await getFBInfo(q);
    
const captionHeader = `
💢 *QUEEN-MADU-MD FB DOWNLOADER* 💢  

🎞 *TITLE:* ${result.title}  

🔢 *Please reply with the number you want to select:*  

📽️ *[1] Facebook Video*  
  ├ 1.1 | 🪫 *SD QUALITY*  
  ├ 1.2 | 🔋 *HD QUALITY*  

🎵 *[2] Facebook Audio*  
  ├ 2.1 | 🎶 *Audio File*  
  ├ 2.2 | 📂 *Document File*  
  ├ 2.3 | 🎤 *Voice Cut [PTT]*  

🔗 *FB URL:* ${q}  
`;  

    const sentMsg = await conn.sendMessage(from, {
      image: { url: result.thumbnail}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
      caption: captionHeader,
      contextInfo: {
          mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
          groupMentions: [],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363299978149557@newsletter',
              newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
              serverMessageId: 999
          },
          externalAdReply: {
              title: '© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚',
              body: ' ©𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 💚',
              mediaType: 1,
              sourceUrl: "https://github.com/Mrrashmika",
              thumbnailUrl: 'https://raw.githubusercontent.com/RASH-DATA/ANJU-DATA/refs/heads/main/LOGOS/thisjpg.jpg', // This should match the image URL provided above
              renderLargerThumbnail: false,
              showAdAttribution: true
          }
      }
    });
    const messageID = sentMsg.key.id; // Save the message ID for later reference
    
    
    // Listen for the user's response
    conn.addReplyTracker(messageID, async (mek, messageType) => {
        if (!mek.message) return;
        const from = mek.key.remoteJid;
        const sender = mek.key.participant || mek.key.remoteJid;
    
        // React to the user's reply (the "1" or "2" message)
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
            
            
    
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
    
            if (messageType === '1.1') {
                // Handle option 1 (sd File)
                await conn.sendMessage(from, {
                  video: { url: result.sd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                  caption: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ WHATSAPP BOT",
                  contextInfo: {
                      mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                      groupMentions: [],
                      forwardingScore: 999,
                      isForwarded: true,
                      forwardedNewsletterMessageInfo: {
                          newsletterJid: '120363299978149557@newsletter',
                          newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
                          serverMessageId: 999
                      },
                      externalAdReply: {
                          title: '© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚',
                          body: ' ©𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 💚',
                          mediaType: 1,
                          sourceUrl: "https://github.com/Mrrashmika",
                          thumbnailUrl: 'https://raw.githubusercontent.com/RASH-DATA/ANJU-DATA/refs/heads/main/LOGOS/thisjpg.jpg', // This should match the image URL provided above
                          renderLargerThumbnail: false,
                          showAdAttribution: true
                      }
                  }
                });
              }
    
              else if (messageType === '1.2') {
                // Handle option 2 (hd File)
                await conn.sendMessage(from, {
                  video: { url: result.hd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                  caption: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ WHATSAPP BOT",
                  contextInfo: {
                      mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                      groupMentions: [],
                      forwardingScore: 999,
                      isForwarded: true,
                      forwardedNewsletterMessageInfo: {
                          newsletterJid: '120363299978149557@newsletter',
                          newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
                          serverMessageId: 999
                      },
                      externalAdReply: {
                          title: '© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚',
                          body: ' ©𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 💚',
                          mediaType: 1,
                          sourceUrl: "https://github.com/Mrrashmika",
                          thumbnailUrl: 'https://raw.githubusercontent.com/RASH-DATA/ANJU-DATA/refs/heads/main/LOGOS/thisjpg.jpg', // This should match the image URL provided above
                          renderLargerThumbnail: false,
                          showAdAttribution: true
                      }
                  }
                });
              }
               
              else if (messageType === '2.1') {
                //Handle option 3 (audio File)  
              await conn.sendMessage(from, { audio: { url: result.sd }, mimetype: "audio/mpeg" }, { quoted: mek })
              }
              
              else if (messageType === '2.2') {
                await conn.sendMessage(from, {
                  document: { url: result.sd },
                  mimetype: "audio/mpeg",
                  fileName: `ANJU-MD/FBDL.mp3`,
                  caption: "*© QUEEN ANJU WHATSAPP BOT MD*",
                  contextInfo: {
                    mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                    groupMentions: [],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363299978149557@newsletter',
                        newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
                        serverMessageId: 999
                    },
                    externalAdReply: {
                        title: '© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚',
                        body: ' ©𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 💚',
                        mediaType: 1,
                        sourceUrl: "https://github.com/Mrrashmika",
                        thumbnailUrl: 'https://raw.githubusercontent.com/RASH-DATA/ANJU-DATA/refs/heads/main/LOGOS/thisjpg.jpg', // This should match the image URL provided above
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
              }, { quoted: mek });
              }
              
              else if (messageType === '2.3') {
                //Handle option 3 (audio File)  
              await conn.sendMessage(from, { audio: { url: result.sd }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek })
        
              }
    
            // React to the successful completion of the task
            await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    
            console.log("Response sent successfully");
      });
    } catch (e) {
    console.log(e);
    reply(`${e}`);
    }
})
cmd({
    pattern: "twitter",
    alias: ["tweet", "twdl"],
    desc: "Download Twitter videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {
    if (!q || !q.startsWith("https://")) {
      return conn.sendMessage(from, { text: "❌ Please provide a valid Twitter URL." }, { quoted: mek });
    }

    // React to indicate processing start
    await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

    // Fetch video information from Dark Yasiya Twitter API
    const twitterData = await axios.get(`https://www.dark-yasiya-api.site/download/twitter?url=${q}`);
    const data = twitterData.data;

    if (!data || !data.status || !data.result) {
      return m.reply("Failed to retrieve Twitter video. Please check the link and try again.");
    }

    const { desc, thumb, video_sd, video_hd } = data.result;
const captionHeader = `
💢 *QUEEN-MADU-MD TWITTER DOWNLOADER* 💢  

📝 *Description:* ${desc || "No description"}  

🔢 *Please reply with the number for your selection:*  

📽️ *[1] Twitter Video*  
  ├ 1.1 | 🪫 *SD QUALITY*  
  ├ 1.2 | 🔋 *HD QUALITY*  

🎵 *[2] Twitter Audio*  
  ├ 2.1 | 🎶 *Audio File*  
  ├ 2.2 | 📂 *Document File*  
  ├ 2.3 | 🎤 *Voice (PTT)*  

🔗 *Twitter URL:* ${q}  
`;  

    const sentMsg = await conn.sendMessage(from, {
      image: { url: thumb}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
      caption: captionHeader,
      contextInfo: {
          mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
          groupMentions: [],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363299978149557@newsletter',
              newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
              serverMessageId: 999
          },
          externalAdReply: {
              title: '© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚',
              body: ' ©𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 💚',
              mediaType: 1,
              sourceUrl: "https://github.com/Mrrashmika",
              thumbnailUrl: 'https://raw.githubusercontent.com/RASH-DATA/ANJU-DATA/refs/heads/main/LOGOS/thisjpg.jpg', // This should match the image URL provided above
              renderLargerThumbnail: false,
              showAdAttribution: true
          }
      }
    });
    const messageID = sentMsg.key.id;

    // Listen for the user's response
    conn.addReplyTracker(messageID, async (mek, messageType) => {
        if (!mek.message) return;
        const from = mek.key.remoteJid;
        const sender = mek.key.participant || mek.key.remoteJid;

        // React to the user's reply (the "1" or "2" message)
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        if (messageType === '1.1') {
          // Send SD video
          await conn.sendMessage(from, {
            video: { url: video_sd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ",
            contextInfo: {
                mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363299978149557@newsletter',
                    newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: '© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚',
                    body: ' ©𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 💚',
                    mediaType: 1,
                    sourceUrl: "https://github.com/Mrrashmika",
                    thumbnailUrl: 'https://raw.githubusercontent.com/RASH-DATA/ANJU-DATA/refs/heads/main/LOGOS/thisjpg.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
          });
        } else if (messageType === '1.2') {
          // Send HD video
          await conn.sendMessage(from, {
            video: { url: video_hd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ WHATSAPP BOT",
            contextInfo: {
                mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363299978149557@newsletter',
                    newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: '© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚',
                    body: ' ©𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 💚',
                    mediaType: 1,
                    sourceUrl: "https://github.com/Mrrashmika",
                    thumbnailUrl: 'https://raw.githubusercontent.com/RASH-DATA/ANJU-DATA/refs/heads/main/LOGOS/thisjpg.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
          });
        } else if (messageType === '2.1') {
          // Send audio as an audio file
          await conn.sendMessage(from, { audio: { url: video_sd }, mimetype: "audio/mpeg" }, { quoted: mek });
        } else if (messageType === '2.2') {
          // Send audio as a document file
          await conn.sendMessage(from, {
            document: { url: video_sd },
            mimetype: "audio/mpeg",
            fileName: `ANJU-MD/TWDL.mp3`,
            caption: "*© QUEEN ANJU WHATSAPP BOT MD*",
            contextInfo: {
                mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363299978149557@newsletter',
                    newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: '© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚',
                    body: ' ©𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 💚',
                    mediaType: 1,
                    sourceUrl: "https://github.com/Mrrashmika",
                    thumbnailUrl: 'https://raw.githubusercontent.com/RASH-DATA/ANJU-DATA/refs/heads/main/LOGOS/thisjpg.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
          }, { quoted: mek });
        } else if (messageType === '2.3') {
          // Send audio as a voice note (ptt)
          await conn.sendMessage(from, { audio: { url: video_sd }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek });
        }

        // React to completion
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Twitter response sent successfully");
    });
  } catch (e) {
    console.log(e);
    reply(`An error occurred: ${e}`);
  }
});

cmd({

  pattern: "ig",
  desc: "To download instagram videos.",
  react: "🎥",
  category: "download",
  filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{
  
if (!q) return m.reply(`Please Give Me a vaild Link...`);
m.react('⬇️')

       let res = await igdl(q);
      
       let data = await res.data;
       for (let i = 0; i < 20; i++) {
          let media = data[i];
          let downloadurl = media.url
           m.react('⬆️')
          await conn.sendMessage(from,{
            video: {url:downloadurl},
            mimetype:"video/mp4",
            caption: `>  © 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚*`,
            contextInfo: {
                mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363299978149557@newsletter',
                    newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: '© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚',
                    body: ' ©𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 💚',
                    mediaType: 1,
                    sourceUrl: "https://github.com/Mrrashmika",
                    thumbnailUrl: 'https://raw.githubusercontent.com/RASH-DATA/ANJU-DATA/refs/heads/main/LOGOS/thisjpg.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }},{quoted:mek})
           m.react('✅')
       }

}catch(e){
console.log(e)
}
})


cmd({
    pattern: "apk",
    desc: "Download apk.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {

await m.react("⬇")
      
const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
const response = await axios.get(apiUrl);
const data = response.data;

let step1 = data.datalist.list[0].size % 1000000
let step2 = `.` + step1
let step3 = data.datalist.list[0].size / 1000000
let correctsize = step3 - step2
    
let desc = `
*「 🗃️ 𝐐𝐔𝐄𝐄𝐍-𝐌𝐀𝐃𝐔 𝐀𝐏𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 🗃️ 」*  

*╭──📦 APK Details 📦──◦•◦❥•*  
*╎*  
*╎* *🏷️ Nᴀᴍᴇ:* ${data.datalist.list[0].name}  
*╎* *📦 Sɪᴢᴇ:* ${correctsize}MB  
*╎* *🔖 Pᴀᴄᴋᴀɢᴇ:* ${data.datalist.list[0].package}  
*╎* *📆 Lᴀꜱᴛ Uᴘᴅᴀᴛᴇ:* ${data.datalist.list[0].updated}  
*╎* *👤 Dᴇᴠᴇʟᴏᴘᴇʀ:* ${data.datalist.list[0].developer.name}  
*╎*  
*╰────────────────────◦•◦❥•*  
💚 *𝙏𝙝𝙖𝙣𝙠𝙨 𝙁𝙤𝙧 𝙐𝙨𝙞𝙣𝙜 © 𝚀𝚄𝙀𝙀𝙽-𝙈𝘼𝘿𝙐 !*  
`;  
await m.react("⬆")
await conn.sendMessage(from,{
    document: {url: data.datalist.list[0].file.path_alt},
    fileName: data.datalist.list[0].name,
    mimetype: 'application/vnd.android.package-archive',
    caption: desc,
    contextInfo: {
        mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
        groupMentions: [],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363299978149557@newsletter',
            newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
            serverMessageId: 999
        },
        externalAdReply: {
            title: '© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚',
            body: ' ©𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 💚',
            mediaType: 1,
            sourceUrl: "https://github.com/Mrrashmika",
            thumbnailUrl: 'https://raw.githubusercontent.com/RASH-DATA/ANJU-DATA/refs/heads/main/LOGOS/thisjpg.jpg', // This should match the image URL provided above
            renderLargerThumbnail: false,
            showAdAttribution: true
        }
    }},{quoted: mek})
        
await m.react("✅")

}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({

    pattern: "gdrive",
    desc: "To download Gdrive files.",
    react: "🌐",
    category: "download",
    filename: __filename
  
  },
  
  async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  
  try{
    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
  if (!q) return m.reply(`Please Give Me a vaild Link...`);
  
  const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${q}&apikey=mnp3grlZ`;

  const downloadResponse = await axios.get(apiUrl);
                            const downloadUrl = downloadResponse.data.result.downloadUrl; // Assuming this is the correct path

                            if (downloadUrl) {
                                // Send the video as a document (.mp4)
                                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                                await conn.sendMessage(from, {
                                    document: { url: downloadUrl },
                                    mimetype: downloadResponse.data.result.mimetype,
                                    fileName: downloadResponse.data.result.fileName,
                                    caption: `|  © 𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐌𝐄𝐍𝐓. 💗\n\n© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚`,
                                    contextInfo: {
                                        mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                                        groupMentions: [],
                                        forwardingScore: 999,
                                        isForwarded: true,
                                        forwardedNewsletterMessageInfo: {
                                            newsletterJid: '120363299978149557@newsletter',
                                            newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
                                            serverMessageId: 999
                                        },
                                        externalAdReply: {
                                            title: '© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚',
                                            body: ' ©𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 💚',
                                            mediaType: 1,
                                            sourceUrl: "https://github.com/Mrrashmika",
                                            thumbnailUrl: 'https://raw.githubusercontent.com/RASH-DATA/ANJU-DATA/refs/heads/main/LOGOS/thisjpg.jpg', // This should match the image URL provided above
                                            renderLargerThumbnail: false,
                                            showAdAttribution: true
                                        }
                                    }
                                }, { quoted: mek });
                            }
         
                            await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
  }catch(e){
  console.log(e)
  }
  });
  
  // Replace this URL with your actual webpage URL


cmd({
  pattern: 'spotify',
  react: '🎵',
  category: 'download',
  desc: 'Search and download songs from Spotify.',
  filename: __filename
}, async (conn, message, mek, { from, q, reply }) => {
  try {
    if (!q) {
      return await reply("*Please provide a song name to search!*");
    }

    // Fetch search results from Spotify API
    let response = await fetchJson(`https://api.agatz.xyz/api/spotify?message=${q}`);
    let data = response.data;
    let item = data[0];

    if (!data || data.length === 0) {
      return await reply("*No results found for your search! Try a different query.*");
    }

    let resultMessage = `
🔍 *Spotify Search Results*

  ${item.trackName}*

📀 *Artist*: ${item.artistName}
💽 *Album*: ${item.albumName}
⏱️ *Duration*: ${item.duration}
🔗 *URL*: [Click Here](${item.externalUrl})
🎧 *Enjoy the music brought to you by* *Queen Anju Bot*! 

🔽 *To download send:*

1. *Audio File* 🎶
2. *Document File* 📂

> © 𝚀𝚄𝙀𝙀𝙽-𝙈𝘼𝘿𝙐 !*
`
let info = `
📀 *Artist*: ${item.artistName}
💽 *Album*: ${item.albumName}
⏱️ *Duration*: ${item.duration}
🔗 *URL*: [Click Here](${item.externalUrl})
🎧 *Enjoy the music brought to you by* *© 𝚀𝚄𝙀𝙀𝙽-𝙈𝘼𝘿𝙐 !* `

async function ytmp33() {
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
        attempts++;
        console.log(`Retrying... Attempt ${attempts}`);
        
        try {
            const datasa = await fetchJson(`https://api.siputzx.my.id/api/d/spotify?url=${item.externalUrl}`);
            if (datasa && datasa.metadata) {
                return datasa; // Download URL Found
            }
        } catch (error) {
            console.error(`Attempt ${attempts} failed: ${error.message}`);
        }
    }

    throw new Error(`Failed to get download URL after ${maxAttempts} attempts.`);
}
let res =await ytmp33();
let datas = res.metadata;
// Send the initial message and store the message ID
const sentMsg = await conn.sendMessage(from, {
  image: { url: datas.cover_url}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
  caption: resultMessage,
  contextInfo: {
      mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
      groupMentions: [],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
          newsletterJid: '120363299978149557@newsletter',
          newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
          serverMessageId: 999
      },
      externalAdReply: {
          title: '© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚',
          body: ' ©𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 💚',
          mediaType: 1,
          sourceUrl: "https://github.com/Mrrashmika",
          thumbnailUrl: 'https://raw.githubusercontent.com/RASH-DATA/ANJU-DATA/refs/heads/main/LOGOS/thisjpg.jpg', // This should match the image URL provided above
          renderLargerThumbnail: false,
          showAdAttribution: true
      }
  }
});
const messageID = sentMsg.key.id; // Save the message ID for later reference


// Listen for the user's response
conn.addReplyTracker(messageID, async (mek, messageType) => {
    if (!mek.message) return;
    const from = mek.key.remoteJid;
    const sender = mek.key.participant || mek.key.remoteJid;

    // React to the user's reply (the "1" or "2" message)
    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

      const downloadUrl = res.download;

      // React to the upload (sending the file)
      await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

      if (messageType === '1') {
          // Handle option 1 (Audio File)
          await conn.sendMessage(from, { 
              audio: { url: downloadUrl }, 
              mimetype: "audio/mpeg" ,
              contextInfo: {
                  externalAdReply: {
                      title: item.trackName,
                      body: item.albumName,
                      mediaType: 1,
                      sourceUrl: item.externalUrl,
                      thumbnailUrl: datas.cover_url, // This should match the image URL provided above
                      renderLargerThumbnail: true,
                      showAdAttribution: true
                  }
              }
          
          }, { quoted: mek });
      } else if (messageType === '2') {
          // Handle option 2 (Document File)
          await conn.sendMessage(from, {
              document: { url: downloadUrl},
              mimetype: "audio/mp3",
              fileName: `${item.trackName}.mp3`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: info,
              contextInfo: {
                  mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                  groupMentions: [],
                  forwardingScore: 999,
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                      newsletterJid: '120363299978149557@newsletter',
                      newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
                      serverMessageId: 999
                  },
                  externalAdReply: {
                      title: '© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚',
                      body: ' ©𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 💚',
                      mediaType: 1,
                      sourceUrl: "https://github.com/Mrrashmika",
                      thumbnailUrl: 'https://raw.githubusercontent.com/RASH-DATA/ANJU-DATA/refs/heads/main/LOGOS/thisjpg.jpg', // This should match the image URL provided above
                      renderLargerThumbnail: false,
                      showAdAttribution: true
                  }
              }
            });
      }

      // React to the successful completion of the task
      await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

      console.log("Response sent successfully");
});
  } catch (error) {
    console.error(error);
    await reply("🚩 *Error occurred while processing your request!*");
  }
});


