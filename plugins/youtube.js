const { fetchJson, getFileDetails } = require("../Utils/functions");
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const getFBInfo = require("@xaviabot/fb-downloader");
const cheerio = require("cheerio");
const { igdl } = require("ruhend-scraper");
const axios = require("axios");
const { cmd, commands } = require("../Utils/command");
const config = require("../settings/config.cjs");
const {
  BufferJSON,
  Browsers,
  WA_DEFAULT_EPHEMERAL,
  makeWASocket,
  generateWAMessageFromContent,
  proto,
  getBinaryNodeChildren,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  downloadContentFromMessage,
} = require("anju-xpro-baileys");
let prefix = config.PREFIX;

if (!cmd) return;
cmd(
  {
    pattern: "tiktok",
    alias: ["tt"],
    react: "🎥",
    desc: "download tiktok videos",
    category: "download",
    use: ".tt vt.tiktok.com/url",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q && !q.startsWith("https://"))
        return await reply("*give me tiktok url ❌*");
      m.react("⬇️");
      //fetch data from api
      let dat = await fetchJson(
        `https://mr-rashmika-apis.vercel.app/scrape-tiktok?url=${q}&apikey=MR.RASHMIKA`
      );
      let datas = dat.data.data;
      let desc = `
     🎟️ *QUEEN ANJU-MD TIKTOK DOWNLOADER* 🎟️

🔢 *Please reply with the number you want to select:*

Title  * ${datas.title}
Author * ${datas.author}
URL    * ${q}
     
     `;

      const buttons = [
        {
          buttonId: prefix + `tnw ${datas.watermark}`,
          buttonText: { displayText: "📼 NO WATERMARK" },
          type: 1,
        },
        {
          buttonId: prefix + `tww ${datas.nowm}`,
          buttonText: { displayText: "🎟️ WITH WATERMARK" },
          type: 1,
        },
        {
          buttonId: prefix + `ta ${datas.audio}`,
          buttonText: { displayText: "🎶 Audio file" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: { url: datas.thumbnail },
        caption: desc,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };
      if(config.BTN_MSG === "1"){
        return await conn.buttonMessage2(from, buttonMessage);
      } else if(config.BTN_MSG === "2"){
        return await conn.newButton(from, buttonMessage);
      } else if(config.BTN_MSG === "3"){
        return await conn.oldButton(from, buttonMessage);
      }
      
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);

if (!cmd) return;
cmd(
  {
    pattern: "tnw",
    react: "⬇",
    filename: __filename,
  },

  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      await conn.sendMessage(from, { react: { text: "⬆", key: mek.key } });
      await conn.sendMessage(
        from,
        {
          video: { url: q },
          mimetype: "video/mp4",
          caption: `> NO-WATERMARK\n\n© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ❤️‍🩹`,
        },
        { quoted: mek }
      );
      await conn.sendMessage(from, { react: { text: "✔", key: mek.key } });
    } catch (e) {
      await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } });
      console.log(e);
      reply(`Error !!\n\n*${e}*`);
    }
  }
);

if (!cmd) return;
cmd(
  {
    pattern: "tww",
    react: "⬇",
    filename: __filename,
  },

  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      await conn.sendMessage(from, { react: { text: "⬆", key: mek.key } });
      await conn.sendMessage(
        from,
        {
          video: { url: q },
          mimetype: "video/mp4",
          caption: `> WITH-WATERMARK \n\n© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ❤️‍🩹`,
        },
        { quoted: mek }
      );
      await conn.sendMessage(from, { react: { text: "✔", key: mek.key } });
    } catch (e) {
      await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } });
      console.log(e);
      reply(`Error !!\n\n*${e}*`);
    }
  }
);

if (!cmd) return;
cmd(
  {
    pattern: "ta",
    react: "⬇",
    filename: __filename,
  },

  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      await conn.sendMessage(from, { react: { text: "⬆", key: mek.key } });
      await conn.sendMessage(
        from,
        { audio: { url: q }, mimetype: "audio/mpeg" },
        { quoted: mek }
      );
      await conn.sendMessage(from, { react: { text: "✔", key: mek.key } });
    } catch (e) {
      await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } });
      console.log(e);
      reply(`Error !!\n\n*${e}*`);
    }
  }
);

// Facebook Downloader
if (!cmd) return;
cmd(
  {
    pattern: "fb",
    alias: ["facebook"],
    desc: "Download Facebook videos",
    category: "download",
    use: ".fb www.facebook.com/abc/video",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q || !q.startsWith("https://")) {
        return conn.sendMessage(
          from,
          { text: "❌ Please provide a valid URL." },
          { quoted: mek }
        );
      }

      await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

      const result = await getFBInfo(q);

      const captionHeader = `
    💢 QUEEN ANJU-MD FB DOWNLOADER 💢
    
    🎞 TITLE 🎞 ${result.title}

     Fb-Url: -=-${q} 
    `;

      const buttons = [
        {
          buttonId: prefix + `fbhd ${result.sd}`,
          buttonText: { displayText: "📼 SD QUALITY" },
          type: 1,
        },
        {
          buttonId: prefix + `fbhd ${result.hd}`,
          buttonText: { displayText: "🎟️ HD QUALITY" },
          type: 1,
        },
        {
          buttonId: prefix + `ta ${result.sd}`,
          buttonText: { displayText: "🎶 Audio file" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: { url: result.thumbnail },
        caption: captionHeader,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };
      if(config.BTN_MSG === "1"){
        return await conn.buttonMessage2(from, buttonMessage);
      } else if(config.BTN_MSG === "2"){
        return await conn.newButton(from, buttonMessage);
      } else if(config.BTN_MSG === "3"){
        return await conn.oldButton(from, buttonMessage);
      }
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);
if (!cmd) return;
cmd(
  {
    pattern: "fbhd",
    react: "⬇",
    filename: __filename,
  },

  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      await conn.sendMessage(from, { react: { text: "⬆", key: mek.key } });
      await conn.sendMessage(
        from,
        {
          video: { url: q },
          mimetype: "video/mp4",
          caption: `>© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ❤️‍🩹`,
        },
        { quoted: mek }
      );
      await conn.sendMessage(from, { react: { text: "✔", key: mek.key } });
    } catch (e) {
      await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } });
      console.log(e);
      reply(`Error !!\n\n*${e}*`);
    }
  }
);

if (!cmd) return;
cmd(
  {
    pattern: "twitter",
    alias: ["tweet", "twdl"],
    desc: "Download Twitter videos",
    category: "download",
    use: ".tweet www.twitter.com/url",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q || !q.startsWith("https://")) {
        return conn.sendMessage(
          from,
          { text: "❌ Please provide a valid Twitter URL." },
          { quoted: mek }
        );
      }

      // React to indicate processing start
      await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

      // Fetch video information from Dark Yasiya Twitter API
      const twitterData = await axios.get(
        `https://www.dark-yasiya-api.site/download/twitter?url=${q}`
      );
      const data = twitterData.data;

      if (!data || !data.status || !data.result) {
        return m.reply(
          "Failed to retrieve Twitter video. Please check the link and try again."
        );
      }

      const { desc, thumb, video_sd, video_hd } = data.result;
      const captionHeader = `
💢 QUEEN ANJU-MD TWITTER DOWNLOADER 💢

📝 Description: ${desc || "No description"}

Twitter URL: ${q}
`;

      const sentMsg = await conn.sendMessage(from, {
        image: { url: thumb }, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
        caption: captionHeader,
      });
      const buttons = [
        {
          buttonId: prefix + `fbhd ${video_sd}`,
          buttonText: { displayText: "📼 SD QUALITY" },
          type: 1,
        },
        {
          buttonId: prefix + `fbhd ${video_hd}`,
          buttonText: { displayText: "🎟️ HD QUALITY" },
          type: 1,
        },
        {
          buttonId: prefix + `ta ${video_sd}`,
          buttonText: { displayText: "🎶 Audio file" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: { url: thumb },
        caption: captionHeader,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };
      if(config.BTN_MSG === "1"){
        return await conn.buttonMessage2(from, buttonMessage);
      } else if(config.BTN_MSG === "2"){
        return await conn.newButton(from, buttonMessage);
      } else if(config.BTN_MSG === "3"){
        return await conn.oldButton(from, buttonMessage);
      }
    } catch (e) {
      console.log(e);
      reply(`An error occurred: ${e}`);
    }
  }
);
const puppeteer = require("puppeteer");
async function scrapeMediafire(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set a user agent to simulate a real browser
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
  );

  try {
    // Navigate to the MediaFire page
    await page.goto(url, { waitUntil: "networkidle2" });

    // Wait for the download button to appear
    await page.waitForSelector('a[aria-label="Download file"]', {
      timeout: 10000,
    });

    // Extract the direct download link
    const downloadLink = await page.evaluate(() => {
      const downloadButton = document.querySelector(
        'a[aria-label="Download file"]'
      );
      return downloadButton ? downloadButton.href : null;
    });

    await browser.close();

    if (downloadLink) {
      return downloadLink;
    } else {
      console.log("Download link not found.");
      return null;
    }
  } catch (error) {
    console.error("Error:", error.message);
    await browser.close();
    return null;
  }
}

if (!cmd) return;
cmd(
  {
    pattern: "fetch",
    desc: "To download files from direct links.",
    category: "download",
    use: ".fetch file/link",
    filename: __filename,
  },
  async (conn, mek, m, { from, quoted, body, command, args, q, reply }) => {
    try {
      if (!q) return reply("❌ Please provide a valid direct download link.");

      // React to indicate the download process
      m.react("⬇️");

      // Fetch file details (Ensure `getFileDetails` returns valid data)
      const data = await getFileDetails(q);
      if (!data) return reply("❌ Failed to fetch file details.");

      const fileUrl = q;
      const fileSize = data.fileSize
        ? `${parseFloat(data.fileSize).toFixed(2)} MB`
        : "Unknown Size";
      const fileName = data.fileName || "downloaded_file";
      const fileType = data.fileType || "application/octet-stream";

      // React to indicate the file is being sent
      m.react("⬆️");

      let msg = `✨ *© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ* ✨
        
💎 *DIRECT LINK DOWNLOAD* 💎
        
📂 *File Name:* ${fileName}
📏 *File Size:* ${fileSize}
📝 *File Type:* ${fileType}
        
🔗 *Download Now:* ${fileUrl}
        
🌟 Enjoy your © 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚 Experience! 🌟`;

      // Send file to chat (without downloading locally)
      await conn.sendMessage(from, {
        document: { url: fileUrl },
        mimetype: fileType,
        fileName: fileName,
        caption: msg,
      });

      m.react("✅"); // Success reaction
    } catch (error) {
      console.error(error);
      reply(`❌ An error occurred: ${error.message}`);
    }
  }
);

if (!cmd) return;
cmd(
  {
    pattern: "mediafire",
    desc: "To download MediaFire files.",
    category: "download",
    use: ".mediafire www.mediafire.com/file/link",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) return m.reply("Please provide a valid MediaFire link.");

      // React to indicate download start
      m.react("⬇️");

      // Fetch file information from the Dark Yasiya API
      const response = await scrapeMediafire(q);
      const data = await getFileDetails(response);

      if (!response) {
        return m.reply(
          "Failed to fetch MediaFire download link. Ensure the link is valid and public."
        );
      }

      const fileUrl = response;
      const fileSize = data.fileSize.toFixed(2) + " MB" || ".......";
      const fileName = data.fileName || "mediafire_download";
      const fileType = data.fileType || "application/octet-stream";

      // React to indicate file is being sent
      m.react("⬆️");

      let msg = `
        ✨ *© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ* ✨
        
        💎 *MEDIAFIRE DL* 💎
        
        📂 *File Name:* ${fileName}
        📏 *File Size:* ${fileSize}
        📝 *File Type:* ${fileType}
        
        🔗 *Download Now:* ${fileUrl}
        
        🌟 Enjoy your © 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚 Experience! 🌟
        `;

      // Send file to chat without downloading
      await conn.sendMessage(from, {
        document: { url: fileUrl },
        mimetype: fileType,
        fileName: fileName, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
        caption: msg,
      });
      m.react("✅");
    } catch (error) {
      console.error(error);
      reply(`An error occurred: ${error.message}`);
    }
  }
);

if (!cmd) return;
cmd(
  {
    pattern: "ig",
    desc: "To download instagram videos.",
    react: "🎥",
    category: "download",
    use: ".ig www.instagrame.com/video/link",
    filename: __filename,
  },

  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) return m.reply(`Please Give Me a vaild Link...`);
      m.react("⬇️");

      let res = await igdl(q);

      let data = await res.data;
      for (let i = 0; i < 20; i++) {
        let media = data[i];
        let downloadurl = media.url;
        m.react("⬆️");
        await conn.sendMessage(
          from,
          {
            video: { url: downloadurl },
            mimetype: "video/mp4",
            caption: `>  © 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚*`,
          },
          { quoted: mek }
        );
        m.react("✅");
      }
    } catch (e) {
      console.log(e);
    }
  }
);

const fs = require("fs");
const path = require("path");

// Command handler for searching Avatar episodes
if (!cmd) return;
cmd(
  {
    pattern: "baiscope",
    react: "📑",
    category: "download",
    desc: "baiscope.lk Downloader",
    use: ".baiscope ben ten",
    filename: __filename,
  },
  async (conn, m, mek, { from, q, isDev, reply }) => {
    try {
      if (!q)
        return await reply("*Please provide a search query! (e.g., Avatar)*");

      // Construct the search URL
      const searchUrl = `https://www.baiscope.lk/?s=${encodeURIComponent(q)}`;
      const response = await axios.get(searchUrl);
      const $ = cheerio.load(response.data);

      let episodes = [];

      // Scrape episode details (title, link, and image)
      $("article.elementor-post").each((index, element) => {
        const title = $(element)
          .find("h5.elementor-post__title > a")
          .text()
          .trim();
        const episodeLink = $(element)
          .find("h5.elementor-post__title > a")
          .attr("href");
        const imgUrl = $(element)
          .find(".elementor-post__thumbnail img")
          .attr("src");

        if (title && episodeLink && imgUrl) {
          episodes.push({
            title,
            episodeLink,
            imgUrl,
          });
        }
      });

      // If no episodes found
      if (episodes.length === 0) {
        return await reply(`No results found for: ${q}`);
      }

      // Prepare message info
      let info = `📺 Search Results for *${q}:*\n\n`;
      episodes.forEach((ep, index) => {
        info += `*${index + 1}.* ${ep.title}\n🔗 Link: ${ep.episodeLink}\n\n`;
      });

      // Send the compiled information
      const sentMsg = await conn.sendMessage(
        from,
        {
          text: info,
        },
        { quoted: mek }
      );
      const messageID = sentMsg.key.id; // Save the message ID for later reference

      // Listen for the user's response
      conn.ev.on("messages.upsert", async (messageUpdate) => {
        const mek = messageUpdate.messages[0];
        if (!mek.message) return;
        const messageType =
          mek.message.conversation || mek.message.extendedTextMessage?.text;
        const from = mek.key.remoteJid;

        // Check if the message is a reply to the previously sent message
        const isReplyToSentMsg =
          mek.message.extendedTextMessage &&
          mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;
        if (isReplyToSentMsg) {
          const selectedNumber = parseInt(messageType.trim());
          if (
            !isNaN(selectedNumber) &&
            selectedNumber > 0 &&
            selectedNumber <= episodes.length
          ) {
            const selectedEpisode = episodes[selectedNumber - 1];

            // Fetch the download link from the selected episode page
            const episodeResponse = await axios.get(
              selectedEpisode.episodeLink
            );
            const $episodePage = cheerio.load(episodeResponse.data);
            const downloadLink = $episodePage("a.dlm-buttons-button").attr(
              "href"
            );

            if (downloadLink) {
              // Send the image of the selected episode along with the details
              await conn.sendMessage(
                from,
                {
                  image: { url: selectedEpisode.imgUrl },
                  caption: `🎬 *${selectedEpisode.title}*\n🔗 Link: ${selectedEpisode.episodeLink}\n⬇️ Download will follow.`,
                },
                { quoted: mek }
              );

              // Download the ZIP file
              const zipFilePath = path.join(
                __dirname,
                "downloaded_episode.zip"
              );
              const writer = fs.createWriteStream(zipFilePath);

              const downloadResponse = await axios({
                url: downloadLink,
                method: "GET",
                responseType: "stream",
              });
              downloadResponse.data.pipe(writer);

              writer.on("finish", async () => {
                // Once the download is complete, send the ZIP file to the user
                await conn.sendMessage(
                  from,
                  {
                    document: { url: zipFilePath },
                    mimetype: "application/zip",
                    fileName: `${selectedEpisode.title}.zip`,
                    caption: `*${selectedEpisode.title}*\n\n© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚`,
                  },
                  { quoted: mek }
                );

                // Optionally delete the downloaded ZIP file after sending
                fs.unlinkSync(zipFilePath);
              });

              writer.on("error", (err) => {
                console.error("Error downloading ZIP file:", err);
                reply("*Error downloading the episode ZIP file.*");
              });
            } else {
              await reply(
                "*Download link not found for the selected episode.*"
              );
            }
          } else {
            await reply("*Invalid selection. Please choose a valid number.*");
          }
        }
      });
    } catch (error) {
      console.error(error);
      await reply("*An error occurred while scraping the data.*");
    }
  }
);

// Command handler for searching cartoons
if (!cmd) return;
cmd(
  {
    pattern: "ginisisila",
    react: "📑",
    category: "download",
    desc: "ginisisilacartoon.net Download",
    use: ".ginisisila ben ten",
    filename: __filename,
  },
  async (conn, m, mek, { from, q, isDev, reply }) => {
    try {
      if (!q)
        return await reply("*Please provide a search query! (e.g., Garfield)*");

      // Construct the search URL
      const searchUrl = `https://ginisisilacartoon.net/search.php?q=${encodeURIComponent(
        q
      )}`;
      const response = await axios.get(searchUrl);
      const $ = cheerio.load(response.data);

      let episodes = [];

      // Scrape episode details
      $("div.inner-video-cell").each((index, element) => {
        const title = $(element).find("div.video-title > a").attr("title");
        const postedTime = $(element).find("div.posted-time").text().trim();
        const episodeLink = $(element).find("div.video-title > a").attr("href");
        const imageUrl = $(element)
          .find("div.inner-video-thumb-wrapper img")
          .attr("src"); // Get episode image URL

        if (title && episodeLink) {
          episodes.push({
            title,
            postedTime,
            episodeLink: `https://ginisisilacartoon.net/${episodeLink}`,
            imageUrl: imageUrl,
          });
        }
      });

      // If no episodes found
      if (episodes.length === 0) {
        return await reply(`No results found for: ${q}`);
      }

      // Prepare message info
      let info = `📺 Search Results for *${q}:*\n\n`;
      episodes.forEach((ep, index) => {
        info += `*${index + 1}.* ${ep.title}\n🗓️ Posted: ${
          ep.postedTime
        }\n🔗 Link: ${ep.episodeLink}\n\n`;
      });

      // Send the compiled information
      const sentMsg = await conn.sendMessage(
        from,
        {
          text: info,
        },
        { quoted: mek }
      );
      const messageID = sentMsg.key.id; // Save the message ID for later reference

      // Listen for the user's response
      conn.ev.on("messages.upsert", async (messageUpdate) => {
        const mek = messageUpdate.messages[0];
        if (!mek.message) return;
        const messageType =
          mek.message.conversation || mek.message.extendedTextMessage?.text;
        const from = mek.key.remoteJid;
        // Check if the message is a reply to the previously sent message
        const isReplyToSentMsg =
          mek.message.extendedTextMessage &&
          mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;
        if (isReplyToSentMsg) {
          const selectedNumber = parseInt(messageType.trim());
          if (
            !isNaN(selectedNumber) &&
            selectedNumber > 0 &&
            selectedNumber <= episodes.length
          ) {
            const selectedEpisode = episodes[selectedNumber - 1];

            // Send episode details with image first
            const episodeInfo = `*🪄 ɴᴀᴍᴇ:-* ${selectedEpisode.title}\n⏳ *ᴅᴀᴛᴇ:-* ${selectedEpisode.postedTime}\n📎 *ᴇᴘɪꜱᴏᴅᴇ ʟɪɴᴋ*:- ${selectedEpisode.episodeLink}\n\n☘ *We are uploading the Movie/Episode you requested.*`;
            const imageMessage = {
              image: { url: selectedEpisode.imageUrl },
              caption: episodeInfo,
            };
            await conn.sendMessage(from, imageMessage, { quoted: mek });

            // Fetch the episode page to extract the video link (iframe src)
            const episodePageResponse = await axios.get(
              selectedEpisode.episodeLink
            );
            const $ = cheerio.load(episodePageResponse.data);

            // Extract the IFRAME src link
            const iframeSrc = $("div#player-holder iframe").attr("src");

            if (iframeSrc) {
              // Call the external API to get the download link using the iframe link
              const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${iframeSrc}&apikey=mnp3grlZ`;

              try {
                const downloadResponse = await axios.get(apiUrl);
                const downloadUrl = downloadResponse.data.result.downloadUrl; // Assuming this is the correct path

                if (downloadUrl) {
                  // Send the video as a document (.mp4)
                  await conn.sendMessage(
                    from,
                    {
                      document: { url: downloadUrl },
                      mimetype: "video/mp4",
                      fileName: `MR JANIYA | ${selectedEpisode.title}.mp4`,
                      caption: `${selectedEpisode.title} |  © 𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐌𝐄𝐍𝐓. 💗\n\n© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚`,
                    },
                    { quoted: mek }
                  );
                } else {
                  await reply(
                    "Failed to retrieve the download link for this episode."
                  );
                }
              } catch (error) {
                console.error("Error fetching the download link:", error);
                await reply(
                  "An error occurred while trying to fetch the download link."
                );
              }
            } else {
              await reply("No downloadable link found for this episode.");
            }
          } else {
            await reply(`Please reply with a valid number from the list.`);
          }
        }
      });
    } catch (e) {
      reply("*Error occurred while scraping!*");
      console.error(e);
    }
  }
);

if (!cmd) return;
cmd(
  {
    pattern: "apk",
    desc: "Download apk files.",
    category: "download",
    use: ".apk whatsapp",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      await m.react("⬇");

      const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      let step1 = data.datalist.list[0].size % 1000000;
      let step2 = `.` + step1;
      let step3 = data.datalist.list[0].size / 1000000;
      let correctsize = step3 - step2;

      let desc = `
*「 🗃️𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐀𝐏𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑🗃️ 」*

*╭──📦 APK Details 📦──◦•◦❥•*
*╎*
*╎* *🏷️ Nᴀᴍᴇ :* ${data.datalist.list[0].name}
*╎* *📦 Sɪᴢᴇ :* ${correctsize}MB
*╎* *🔖 Pᴀᴄᴋᴀɢᴇ :* ${data.datalist.list[0].package}
*╎* *📆 Lᴀꜱᴛ Uᴘᴅᴀᴛᴇ :* ${data.datalist.list[0].updated}
*╎* *👤 Dᴇᴠᴇʟᴏᴘᴇʀꜱ :* ${data.datalist.list[0].developer.name}
*╎*
*╰────────────────────◦•◦❥•*
* 𝙏𝙝𝙖𝙣𝙠𝙨 𝙁𝙤𝙧 𝙐𝙨𝙞𝙣𝙜 © 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚`;
      await m.react("⬆");
      await conn.sendMessage(
        from,
        {
          document: { url: data.datalist.list[0].file.path_alt },
          fileName: data.datalist.list[0].name,
          mimetype: "application/vnd.android.package-archive",
          caption: desc,
        },
        { quoted: mek }
      );

      await m.react("✅");
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);

if (!cmd) return;
cmd(
  {
    pattern: "gdrive",
    desc: "To download Gdrive files.",
    react: "🌐",
    category: "download",
    use: ".gdrive www.drive.google.com/file",
    filename: __filename,
  },

  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      await conn.sendMessage(from, { react: { text: "⬇️", key: mek.key } });
      if (!q) return m.reply(`Please Give Me a vaild Link...`);

      const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${q}&apikey=mnp3grlZ`;

      const downloadResponse = await axios.get(apiUrl);
      const downloadUrl = downloadResponse.data.result.downloadUrl; // Assuming this is the correct path

      if (downloadUrl) {
        // Send the video as a document (.mp4)
        await conn.sendMessage(from, { react: { text: "⬆️", key: mek.key } });
        await conn.sendMessage(
          from,
          {
            document: { url: downloadUrl },
            mimetype: downloadResponse.data.result.mimetype,
            fileName: downloadResponse.data.result.fileName,
            caption: `|  © 𝐌𝐑 𝐑𝐀𝐒𝐇𝐌𝐈𝐊𝐀 𝐎𝐅𝐂 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐌𝐄𝐍𝐓. 💗\n\n© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚`,
          },
          { quoted: mek }
        );
      }

      await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
      console.log(e);
    }
  }
);

// Replace this URL with your actual webpage URL
if (!cmd) return;
cmd(
  {
    pattern: "spotify",
    react: "🎵",
    category: "download",
    desc: "Search and download songs from Spotify.",
    use: ".spotify biliver",
    filename: __filename,
  },
  async (conn, message, mek, { from, q, reply }) => {
    try {
      if (!q) {
        return await reply("*Please provide a song name to search!*");
      }

      // Fetch search results from Spotify API
      let response = await fetchJson(
        `https://api.agatz.xyz/api/spotify?message=${q}`
      );
      let data = response.data;
      let item = data[0];
      async function ytmp33() {
        let attempts = 0;
        const maxAttempts = 100;

        while (attempts < maxAttempts) {
          attempts++;
          console.log(`Retrying... Attempt ${attempts}`);

          try {
            const datasa = await fetchJson(
              `https://api.siputzx.my.id/api/d/spotify?url=${item.externalUrl}`
            );
            if (datasa && datasa.data) {
              return datasa.data; // No need to parse, it's already an object
            }
          } catch (error) {
            console.error(`Attempt ${attempts} failed: ${error.message}`);
          }
        }

        throw new Error(
          `Failed to get download URL after ${maxAttempts} attempts.`
        );
      }

      let res = await ytmp33();
      let datas = res;
      if (!data || data.length === 0) {
        return await reply(
          "*No results found for your search! Try a different query.*"
        );
      }

      let resultMessage = `
🔍 *Spotify Search Results*

  ${item.trackName}*

📀 *Artist*: ${item.artistName}
💽 *Album*: ${item.albumName}
⏱️ *Duration*: ${item.duration}
🔗 *URL*: [Click Here](${item.externalUrl})
🎧 *Enjoy the music brought to you by* *Queen Anju Bot*! 

> *Created with ❤️ by Janith Rashmika* 
`;
      const buttons = [
        {
          buttonId: prefix + `spot ${item.externalUrl} & 1`,
          buttonText: { displayText: "*Audio File* 🎶" },
          type: 1,
        },
        {
          buttonId: prefix + `spot ${item.externalUrl} & 2`,
          buttonText: { displayText: "*Document File* 📂" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: { url: datas.image },
        caption: resultMessage,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };
      if(config.BTN_MSG === "1"){
        return await conn.buttonMessage2(from, buttonMessage);
      } else if(config.BTN_MSG === "2"){
        return await conn.newButton(from, buttonMessage);
      } else if(config.BTN_MSG === "3"){
        return await conn.oldButton(from, buttonMessage);
      }
    } catch (error) {
      console.error(error);
      await reply("🚩 *Error occurred while processing your request!*");
    }
  }
);

if (!cmd) return;
cmd(
  {
    pattern: "spot",
    react: "🎵",
    desc: "Search and download songs from Spotify.",
    use: ".spotify biliver",
    filename: __filename,
  },
  async (conn, message, mek, { from, getThumbnailBuffer, q, reply }) => {
    try {
      const [url, messageType] = q.split(" & ");

      async function ytmp33() {
        let attempts = 0;
        const maxAttempts = 100;

        while (attempts < maxAttempts) {
          attempts++;
          console.log(`Retrying... Attempt ${attempts}`);

          try {
            const datasa = await fetchJson(
              `https://api.siputzx.my.id/api/d/spotify?url=${url}`
            );
            if (datasa && datasa.data) {
              return datasa.data; // No need to parse, it's already an object
            }
          } catch (error) {
            console.error(`Attempt ${attempts} failed: ${error.message}`);
          }
        }

        throw new Error(
          `Failed to get download URL after ${maxAttempts} attempts.`
        );
      }

      let res = await ytmp33();
      let data = res;

      await conn.sendMessage(from, { react: { text: "⬇️", key: mek.key } });

      const downloadUrl = data.download; // URL for the MP3
      const thumbnailUrl = data.image; // Thumbnail URL for the image

      // React to the upload (sending the file)
      await conn.sendMessage(from, { react: { text: "⬆️", key: mek.key } });

      if (messageType === "1") {
        // Handle option 1 (Audio File)
        await conn.sendMessage(
          from,
          {
            audio: { url: downloadUrl },
            mimetype: "audio/mpeg",
            contextInfo: {},
          },
          { quoted: mek }
        );
      } else if (messageType === "2") {
        // Handle option 2 (Document File)
        await conn.sendMessage(from, {
          document: { url: downloadUrl },
          mimetype: "audio/mp3",
          fileName: `${data.judul}.mp3`, // Use song title as filename
          caption: config.FOOTER,
          jpegThumbnail: await getThumbnailBuffer(thumbnailUrl), // Ensure this is properly formatted
        });
      }

      // React to the successful completion of the task
      await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

      console.log("Response sent successfully");
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);
