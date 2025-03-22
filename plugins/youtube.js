const { cmd, commands } = require("../Utils/command");
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
const yts = require("yt-search");
const config = require("../settings/config.cjs");
let prefix = config.PREFIX;
//===============================================
const axios = require("axios");
if (!axios) return;
//===============================================

// Download YouTube video as MP3
async function ytmp3(url, base, apikey) {
  try {
    if (!url) {
      throw new Error("URL parameter is required");
    }
    if (!apikey) {
      throw new Error("API key is required");
    }

    // Call the API using axios
    const response = await axios.get(`${base}/api/ytmp3`, {
      params: {
        url: url,
        apikey: apikey,
      },
    });

    const data = response.data;

    if (!data || data.status !== true) {
      throw new Error(data.message || "Failed to fetch data from the API");
    }

    return {
      status: true,
      Created_by: "Janith Rashmika",
      dl_link: data.downloadLink,
    };
  } catch (error) {
    return {
      status: false,
      error: error.response?.data?.message || error.message,
    };
  }
}

// Download YouTube video in specified format (e.g., MP4)

async function ytmp4(url, base, quality, apikey) {
  try {
    if (!url) {
      throw new Error("URL parameter is required");
    }
    if (!quality) {
      throw new Error("Quality parameter is required");
    }
    if (!apikey) {
      throw new Error("API key is required");
    }

    // Call the API using axios
    const response = await axios.get(`${base}/api/ytmp4`, {
      params: {
        url: url,
        quality: quality,
        apikey: apikey,
      },
    });

    const data = response.data;

    if (!data || data.status !== true) {
      throw new Error(data.message || "Failed to fetch data from the API");
    }

    return {
      status: true,
      Created_by: "Janith Rashmika",
      quality: data.quality,
      dl_link: data.downloadLink,
    };
  } catch (error) {
    return {
      status: false,
      error: error.response?.data?.message || error.message,
    };
  }
}

async function ytmp33(query, base, key) {
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    attempts++;
    console.log(`Retrying... Attempt ${attempts}`);

    try {
      const data = await ytmp3(query, base, key);
      if (data && data.dl_link) {
        return data.dl_link; // Download URL Found
      }
    } catch (error) {
      console.error(`Attempt ${attempts} failed: ${error.message}`);
    }
  }

  throw new Error(`Failed to get download URL after ${maxAttempts} attempts.`);
}

async function ytmp44(url, base, quality, apikey) {
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    attempts++;
    console.log(`Retrying... Attempt ${attempts}`);

    try {
      const data = await ytmp4(url, base, quality, apikey);
      if (data) {
        return data.dl_link; // Download URL Found
      }
    } catch (error) {
      console.error(`Attempt ${attempts} failed: ${error.message}`);
    }
  }

  throw new Error(`Failed to get download URL after ${maxAttempts} attempts.`);
}

// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
  const videoId = extractYouTubeId(q);
  if (videoId) {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
  return q;
}

// .song command
if (!cmd) return;
cmd(
  {
    pattern: "song",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    use: ".song lelena",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      kee,
      from,
      quoted,
      apikey,
      baseurl,
      body,
      args,
      q,
      isGroup,
      pushname,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("Please give me a URL or title.");
      q = convertYouTubeLink(q);
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      let desc = `
    ⫷⦁[ * '-'_꩜ 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝙎𝙊𝙉𝙂 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙀𝙍 ꩜_'-' * ]⦁⫸
    
    🎵 *Song Found!* 
    
    ➥ *Title:* ${data.title} 
    ➥ *Duration:* ${data.timestamp} 
    ➥ *Views:* ${data.views} 
    ➥ *Uploaded On:* ${data.ago} 
    ➥ *Link:* ${data.url} 
    
    🎧 *Enjoy the music brought to you by* *Queen Anju Bot*! 
    
    > *Created with ❤️ by Janith Rashmika* 
    `;
      const buttons = [
        {
          buttonId: prefix + `yt1s ${url} & 1`,
          buttonText: { displayText: "*Audio File* 🎶" },
          type: 1,
        },
        {
          buttonId: prefix + `yt1s ${url} & 2`,
          buttonText: { displayText: "*Document File* 📂" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: { url: data.thumbnail },
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
      console.error(e);
      reply(`${e}`);
    }
  }
);

if (!cmd) return;
cmd(
  {
    pattern: "yt1s",
    desc: "To download songs.",
    category: "download",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      kee,
      from,
      quoted,
      apikey,
      baseurl,
      getThumbnailBuffer,
      body,
      args,
      q,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("Please provide a search query.");

      const [Download, choice] = q.split(" & ");

      if (!Download || !choice) {
        return reply("Invalid format. Use: *yt1s <search term> & <choice>*");
      }

      const search = await yts(Download);
      const data = search.videos[0];

      if (!data) return reply("No video found.");

      const url = data.url;
      m.react("⬇️"); // Start the download

      const down = await ytmp33(`${url}`, baseurl, apikey);
      const downloadUrl = down;
      const thumbnailBuffer = await getThumbnailBuffer(data.thumbnail);

      let info = `
🎥 *MP3 Download Found!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url}

🎬 *Enjoy the video brought to you by Queen Anju Bot!* 
`;

      // React to the upload starting (⬆️)
      m.react("⬆️");

      if (choice === "1") {
        // Handle option 1 (Audio File)
        await conn.sendMessage(
          from,
          {
            audio: { url: downloadUrl },
            mimetype: "audio/mpeg",
          },
          { quoted: kee }
        );
      } else if (choice === "2") {
        // Handle option 2 (Document File)
        await conn.sendMessage(
          from,
          {
            document: { url: downloadUrl },
            mimetype: "audio/mp3",
            fileName: `${data.title}.mp3`,
            caption: info,
            jpegThumbnail: thumbnailBuffer, // Ensure this is properly formatted
          },
          { quoted: kee }
        );
      } else {
        return reply(
          "Invalid choice. Please choose '1' for audio or '2' for document."
        );
      }

      // React to the successful completion of the task (✅)
      m.react("✅");
    } catch (e) {
      console.log(e);
      reply(`Error: ${e.message || e}`);
    }
  }
);

if (!cmd) return;
cmd(
  {
    pattern: "yts",
    desc: "To search for videos on YouTube.",
    react: "🎥",
    category: "search",
    use: ".yts numba ha",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      kee,
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
      if (!q) return reply("Please provide a search query.");

      const search = await yts(q);
      const videos = search.videos.slice(0, 10); // Get top 10 results

      if (!videos.length) return reply("No videos found.");

      const buttons = videos.map((video, index) => ({
        buttonId: `${prefix}yts1 ${video.url}`,
        buttonText: { displayText: `${index + 1}. ${video.title}` },
        type: 1,
      }));

      const buttonMessage = {
        image: { url: videos[0].thumbnail },
        caption: `🔎 *YouTube Search Results*\n\n_Select a video to download:_`,
        footer: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
        buttons: buttons,
        headerType: 4,
      };

      return await conn.buttonMessage2(from, buttonMessage);
    } catch (e) {
      console.log(e);
      reply(`Error: ${e.message || e}`);
    }
  }
);

if (!cmd) return;
cmd(
  {
    pattern: "yts1",
    desc: "To download videos.",
    react: "📂",
    use: ".video alone part 2",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      kee,
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      apikey,
      baseurl,
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
      if (!q) return reply("Please give me a URL or title.");

      q = convertYouTubeLink(q);
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      let desc = `
    ⫷⦁[ * '-'_꩜ 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝙑𝙄𝘿𝙀𝙊 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙀𝙍 ꩜_'-' * ]⦁⫸ 
    
    🎥 *Video Found!* 
    
    ➥ *Title:* ${data.title} 
    ➥ *Duration:* ${data.timestamp} 
    ➥ *Views:* ${data.views} 
    ➥ *Uploaded On:* ${data.ago} 
    ➥ *Link:* ${data.url} 
    
    🎬 *Enjoy the video brought to you by*© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚 **!
    
    > *Created with ❤️ by Janith Rashmika* 
    `;
      const buttons = [
        {
          buttonId: prefix + `song ${url}`,
          buttonText: { displayText: "*Song* 🎶" },
          type: 1,
        },
        {
          buttonId: prefix + `video ${url}`,
          buttonText: { displayText: "*Video* 🎥" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: { url: data.thumbnail },
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
      console.error(e);
      reply(`${e}`);
    }
  }
);

if (!cmd) return;
cmd(
  {
    pattern: "video",
    desc: "To download videos.",
    react: "🎥",
    category: "download",
    use: ".video alone part 2",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      kee,
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      apikey,
      baseurl,
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
      if (!q) return reply("Please give me a URL or title.");

      q = convertYouTubeLink(q);
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      let desc = `
    ⫷⦁[ * '-'_꩜ 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝙑𝙄𝘿𝙀𝙊 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙀𝙍 ꩜_'-' * ]⦁⫸ 
    
    🎥 *Video Found!* 
    
    ➥ *Title:* ${data.title} 
    ➥ *Duration:* ${data.timestamp} 
    ➥ *Views:* ${data.views} 
    ➥ *Uploaded On:* ${data.ago} 
    ➥ *Link:* ${data.url} 
    
    🎬 *Enjoy the video brought to you by* *Queen Anju Bot*! 
    
    > *Created with ❤️ by Janith Rashmika* 
    `;
      const buttons = [
        {
          buttonId: prefix + `yt2s ${url} & 144`,
          buttonText: { displayText: "*Video File* 🎶 144p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt2s ${url} & 360`,
          buttonText: { displayText: "*Video File* 🎶 360p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt2s ${url} & 480`,
          buttonText: { displayText: "*Video File* 🎶 480p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt2s ${url} & 720`,
          buttonText: { displayText: "*Video File* 🎶 720p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt2s ${url} & 1080`,
          buttonText: { displayText: "*Video File* 🎶 1080p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt3s ${url} & 144`,
          buttonText: { displayText: "*Document File* 📂 144p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt3s ${url} & 360`,
          buttonText: { displayText: "*Document File* 📂 360p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt3s ${url} & 480`,
          buttonText: { displayText: "*Document File* 📂 480p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt3s ${url} & 720`,
          buttonText: { displayText: "*Document File* 📂 720p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt3s ${url} & 1080`,
          buttonText: { displayText: "*Document File* 📂 1080p" },
          type: 1,
        },
      ];

      const buttonMessage = {
        image: { url: data.thumbnail },
        caption: desc,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };

      return await conn.buttonMessage2(from, buttonMessage);
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);

if (!cmd) return;
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
// Download video
const videoPath = `./temp/input.mp4`;
const convertedPath = `./temp/output.mp4`;
cmd(
  {
    pattern: "yt2s",
    desc: "To download songs.",
    category: "download",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { kee, from, quoted, apikey, baseurl, body, args, q, reply }
  ) => {
    try {
      if (!q) return reply("Please provide a YouTube link or query.");

      const Download = q.split(" & ")[0];
      const quality = q.split(" & ")[1] || "360p"; // Default to 360p
      const search = await yts(Download);
      const data = search.videos[0];
      const url = data.url;
      const tempDir = "./temp";
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      // Fetch download URL
      m.react("⬇️");
      const down = await ytmp44(`${url}`, baseurl, `${quality}`, `${apikey}`);
      const downloadUrl = down;

      const response = await axios.get(downloadUrl, {
        responseType: "arraybuffer",
      });
      await fs.writeFileSync(videoPath, Buffer.from(response.data));

      // Convert video to WhatsApp-compatible format
      m.react("🎥");

      await new Promise((resolve, reject) => {
        ffmpeg(videoPath)
          .outputOptions([
            "-c:v libx264",
            "-preset fast",
            "-crf 28",
            "-c:a aac",
            "-b:a 128k",
            "-movflags +faststart",
          ])
          .toFormat("mp4")
          .on("end", resolve)
          .on("error", reject)
          .save(convertedPath);
      });

      let info = `
🎥 *MP4 Download Found!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎬 *Enjoy the video brought to you by Queen Anju Bot!* 
`;

      // React to upload starting
      m.react("⬆️");

      await conn.sendMessage(from, {
        video: fs.readFileSync(convertedPath),
        mimetype: "video/mp4",
        caption: info,
        fileName: "video.mp4",
      });

      // React to completion
      m.react("✅");
    } catch (e) {
      console.log(e);
      reply("Failed to download or send video.");
    } finally {
      // Cleanup files safely
      try {
        if (fs.existsSync(videoPath)) {
          fs.unlinkSync(videoPath);
        }
        if (fs.existsSync(convertedPath)) {
          fs.unlinkSync(convertedPath);
        }
      } catch (err) {
        console.error("Error deleting temp files:", err);
      }
    }
  }
);
if (!cmd) return;
cmd(
  {
    pattern: "yt3s",
    desc: "To download songs.",
    category: "download",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      kee,
      from,
      quoted,
      apikey,
      baseurl,
      getThumbnailBuffer,
      body,
      args,
      q,
      reply,
    }
  ) => {
    if (!q) return reply("Please provide a YouTube link or query.");

    const Download = q.split(" & ")[0];
    const quality = q.split(" & ")[1] || "360p"; // Default to 360p
    const search = await yts(Download);
    const data = search.videos[0];
    const url = data.url;
    const thumbnailBuffer = await getThumbnailBuffer(data.thumbnail);
    m.react("⬇️");

    try {
      // Fetch download URL
      const down = await ytmp44(`${url}`, baseurl, `${quality}`, `${apikey}`);
      const downloadUrl = down;
      const tempDir = "./temp";
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      // Download video
      const response = await axios.get(downloadUrl, {
        responseType: "arraybuffer",
      });
      await fs.writeFileSync(videoPath, Buffer.from(response.data));

      m.react("🎥");

      // Convert video
      await new Promise((resolve, reject) => {
        ffmpeg(videoPath)
          .outputOptions([
            "-c:v libx264",
            "-preset fast",
            "-crf 28",
            "-c:a aac",
            "-b:a 128k",
            "-movflags +faststart",
          ])
          .toFormat("mp4")
          .on("end", resolve)
          .on("error", reject)
          .save(convertedPath);
      });

      let info = `
🎥 *MP4 Download Found!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎬 *Enjoy the video brought to you by Queen Anju Bot!* 
`;

      m.react("⬆️");

      await conn.sendMessage(from, {
        document: fs.readFileSync(convertedPath),
        mimetype: "video/mp4",
        fileName: `${data.title}.mp4`,
        caption: info,
        jpegThumbnail: thumbnailBuffer, // Ensure this is properly formatted
      });

      m.react("✅");
    } catch (e) {
      console.log(e);
      reply(`Failed to download or send video. Error: ${e.message}`);
    } finally {
      // Cleanup files safely
      try {
        if (fs.existsSync(videoPath)) {
          fs.unlinkSync(videoPath);
        }
        if (fs.existsSync(convertedPath)) {
          fs.unlinkSync(convertedPath);
        }
      } catch (err) {
        console.error("Error deleting temp files:", err);
      }
    }
  }
);
