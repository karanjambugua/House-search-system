// server.js
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/Projects/');
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ✅ SINGLE /upload route only
app.post('/upload', upload.single('video'), (req, res) => {
  const { name, location, price } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No video file uploaded" });
  }

  const videoPath = `Projects/${file.filename}`;
  const videoTitle = `${name} - ${location} - ${price}`;

  const newVideo = {
    src: videoPath,
    title: videoTitle
  };

  const videosFile = path.join(__dirname, 'public/videos.json');

  fs.readFile(videosFile, 'utf8', (err, data) => {
    let videos = [];
    if (!err && data) {
      try {
        videos = JSON.parse(data);
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
    }

    videos.push(newVideo);

    fs.writeFile(videosFile, JSON.stringify(videos, null, 2), err => {
      if (err) {
        console.error("Error writing to videos.json", err);
        return res.status(500).json({ message: "Error saving video info" });
      }

      res.status(200).json({ message: "Video uploaded successfully", video: newVideo });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
