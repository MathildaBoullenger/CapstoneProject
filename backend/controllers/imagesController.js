const fs = require('fs');
const multer = require('multer');

const upload = multer({ dest: 'images/' });

const getImage = (req, res) => {
  // Do a bunch of if statements to make sure the user is authorized to view this image

  const imageName = req.params.imageName;
  const readStream = fs.createReadStream(`images/${imageName}`);
  readStream.pipe(res);
};

const uploadImage = (req, res) => {
  const imageName = req.file.filename;

  // Save this data to a database probably

  console.log(imageName);
  res.send({ imageName });
};

module.exports = { getImage, uploadImage };
