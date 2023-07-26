const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const { v4: uuidv4 } = require('uuid');


const app = express();

app.use(bodyParser.json());
app.use(cors())
// Create the "uploads" directory if it doesn't exist
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.post('/upload', (req, res) => {
//   const svgData = req.body.svgData;
  const svgData = JSON.parse( req.body.svgData);
  console.log("svgData:",svgData);
  const filename = `${uuidv4()}.svg`;

  fs.writeFile(`${uploadsDir}/${filename}`, svgData, (err) => {
    console.log("writefile");
    if (err) {
      console.error('Error saving SVG file:', err);
      res.status(500).json({ error: 'Failed to save SVG file on the server' });
    } else {
      const svgUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
      console.log("svgUrl:",svgUrl);
      res.json({ url: svgUrl });
    }
  });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
