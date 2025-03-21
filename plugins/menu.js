cmd({
  pattern: "menu",
  react: "👨‍💻",
  alias: ["panel","help","commands"],
  desc: "Get bot\'s command list.",
  category: "main",
  use: '.menu',
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{


const category = q.trim().toUpperCase();
let menuc = `*◈╾──────${category} DOWNLOAD COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        let wm = '*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ*\n*ᴛʜᴇ ᴛᴇᴀᴍ • ᴛᴅᴅ*'	

  for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'download'){
  if(!commands[i].dontAddCommandList){

menuc += `• *${commands[i].pattern}*\n`
}}};
  menuc += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`

let menuc1 = `*◈╾──────${category} SEARCH COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        
  for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'search'){
  if(!commands[i].dontAddCommandList){

menuc1 += `• *${commands[i].pattern}*\n`
}}};
  menuc1  += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`



let menuc2 = `*◈╾──────${category} CONVERT COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        
  for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'convert'){
  if(!commands[i].dontAddCommandList){

menuc2 += `• *${commands[i].pattern}*\n`
}}};
  menuc2 += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`


let menuc3 = `*◈╾──────${category} LOGO COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        
  for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'logo'){
  if(!commands[i].dontAddCommandList){

menuc3 += `• *${commands[i].pattern}*\n`
}}};
  menuc3 += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`


let menuc4 = `*◈╾──────${category} MAIN COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        
  for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'main'){
  if(!commands[i].dontAddCommandList){

menuc4 += `• *${commands[i].pattern}*\n`
}}};
  menuc4 += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`
	
let menuc5 = `*◈╾──────${category} GROUP COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        
  for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'group'){
  if(!commands[i].dontAddCommandList){

menuc5 += `• *${commands[i].pattern}*\n`
}}};
  menuc5 += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`

let menuc6 = `*◈╾──────${category} BUG COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        
  for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'bug'){
  if(!commands[i].dontAddCommandList){

menuc6 += `• *${commands[i].pattern}*\n`
}}};
  menuc6 += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`
	
let menuc7 = `*◈╾──────${category} OTHER COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        
  for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'other'){
  if(!commands[i].dontAddCommandList){

menuc7 += `• *${commands[i].pattern}*\n`
}}};
  menuc7 += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`
	
let menuc8 = `*◈╾──────${category} MOVIE COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        
  for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'movie'){
  if(!commands[i].dontAddCommandList){

menuc8 += `• *${commands[i].pattern}*\n`
}}};
  menuc8 += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`
	
let msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: {
                text: `` },
              carouselMessage: {
                cards: [
                  {
                    
                    header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: 'https://i.ibb.co/mqBPbrr/IMG-20241113-WA0220.jpg' } }, { upload: conn.waUploadToServer })),
          title: menuc,
          gifPlayback: true,
          subtitle: "VAJIRA-MD",
          hasMediaAttachment: false
        }),
                    body: { text: '' },
                    nativeFlowMessage: {
                      
                    },
                  },
                  {                   

header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: 'https://i.ibb.co/WKHXByg/IMG-20241113-WA0230.jpg' } }, { upload: conn.waUploadToServer })),
          title: menuc1,
          gifPlayback: true,
          subtitle: "VAJIRA-MD",
          hasMediaAttachment: false
        }),
                    body: { text: ``},
                    nativeFlowMessage: {

                    },
                  },
                  {                   

header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: 'https://i.ibb.co/61s5zcy/IMG-20241113-WA0221.jpg' } }, { upload: conn.waUploadToServer })),
          title: menuc2,
          gifPlayback: true,
          subtitle: "VAJIRA-MD",
          hasMediaAttachment: false
        }),
                    body: { text: ``},
                    nativeFlowMessage: {
                      
                    },
                  },
                  {                   
			  
header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: 'https://i.ibb.co/C56pmps/IMG-20241113-WA0227.jpg' } }, { upload: conn.waUploadToServer })),
          title: menuc3,
          gifPlayback: true,
          subtitle: "VAJIRA-MD",
          hasMediaAttachment: false
        }),
                    body: { text: ``},
                    nativeFlowMessage: {
                      
                    },
                  },                                    

                  {                   
			  
header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: 'https://i.ibb.co/bWbkNqB/IMG-20241113-WA0229.jpg' } }, { upload: conn.waUploadToServer })),
          title: menuc4,
          gifPlayback: true,
          subtitle: "VAJIRA-MD",
          hasMediaAttachment: false
        }),
                    body: { text: ``},
                    nativeFlowMessage: {
                      
                    },
                  },                                    
                      {                   
			  
header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: 'https://i.ibb.co/M7rJbv1/IMG-20241113-WA0222.jpg' } }, { upload: conn.waUploadToServer })),
          title: menuc5,
          gifPlayback: true,
          subtitle: "VAJIRA-MD",
          hasMediaAttachment: false
        }),
                    body: { text: ``},
                    nativeFlowMessage: {
                      
                    },
                  },        
	                  {                   
			  
header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: 'https://i.ibb.co/LppL632/IMG-20241113-WA0228.jpg' } }, { upload: conn.waUploadToServer })),
          title: menuc6,
          gifPlayback: true,
          subtitle: "VAJIRA-MD",
          hasMediaAttachment: false
        }),
                    body: { text: ``},
                    nativeFlowMessage: {
                      
                    },
                  },         
	                  {             
	                  
header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: config.LOGO } }, { upload: conn.waUploadToServer })),
          title: menuc8,
          gifPlayback: true,
          subtitle: "VAJIRA-MD",
          hasMediaAttachment: false
        }),
                    body: { text: ``},
                    nativeFlowMessage: {
                      
                    },
                  },         
	                  {                                                 
			  			  
header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: 'https://i.ibb.co/n3vs7pD/IMG-20241113-WA0226.jpg' } }, { upload: conn.waUploadToServer })),
          title: menuc7,
          gifPlayback: true,
          subtitle: "VAJIRA-MD",
          hasMediaAttachment: false
        }),
                    body: { text: ``},
                    nativeFlowMessage: {
                      
                    },
                  },                                    		
                ],
                            messageVersion: 1,
                        },
                         contextInfo: {
                         mentionedJid: [m.sender],
                         forwardingScore: 999,
                         isForwarded: true,
                         forwardedNewsletterMessageInfo: {
                         newsletterJid: '120363290448968237@newsletter',
                         newsletterName: `⛅ 𝘝𝘈𝘑𝘐𝘙𝘈 𝑴𝑫 💙`,
                         serverMessageId: 143
                            }
                        }
                    }
                }
            },
        },
        { quoted: m })
        
            await conn.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id,
    });


	
} catch (e) {
reply()
l(e)
}
})