const PostModel = require('../models/PostModel')
const multer = require('multer');
const path = require('path');


// Create Post
exports.PostCreate = async (req, res) => {
    try {
        const reqBody = req.body
        const data = await PostModel.create(reqBody)
        res.status(201).json({status: 'Successfull', data: data}) 
    } catch (error) {
        res.status(400).json({status: 'Fail', data: error}) 
    }
}

// Update Post
exports.PostUpdateById = async (req, res) => {
    try {
        const id = req.params.id
        const post = await PostModel.findById(id)

        if (post.username === req.body.username) {
            try {
                const data = await PostModel.findByIdAndUpdate(id, {$set: req.body}, {new: true})
                res.status(201).json({status: 'Successfull', data: data}) 
            } catch (error) {
                res.status(400).json({status: 'Fail', data: error}) 
            }
        } else {
            res.status(401).json({message: 'You can update only your post!'})
        }
    } catch (error) {
        res.status(400).json({status: 'Fail', data: error}) 
    }
}

// Find Sigle Post
exports.FindPostById = async(req, res) => {
    try {
        const id = req.params.id
        const data = await PostModel.findById(id)
        res.status(200).json({status: 'Successfull', data: data})
    } catch (error) {
        res.status(400).json({status: 'Fail', data: error})
    }
}


// Find All Post
exports.FindAllPost = async (req, res) => {
    const username = req.query.user
    try {
        let data
        if (username) {
            data = await PostModel.find({username})
        } else {
            data = await PostModel.find()
        }
        res.status(200).json({status: 'Successfull', data: data})
    } catch (error) {
        res.status(400).json({status: 'Fail', data: error})
    }
}

// Delete Post
exports.PostDeleteById = async(req, res) => {
    try {
        const id = req.params.id
        const post = await PostModel.findById(id)
        if (post.username === req.body.username) {
            try {
                await PostModel.findByIdAndDelete(id)
                res.status(200).json({status: 'Successfull'})
            } catch (error) {
                res.status(400).json({status: 'Fail', data: error})
            }
        } else {
            res.status(401).json({status: 'You can Delete only your post.'}) 
        }
    } catch (error) {
        res.status(400).json({status: 'Fail', data: error})
    }
}


// Image Upload

// Multer configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // Directory where the files will be stored
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname); // Rename the file with current timestamp
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});

// Example of the controller function to handle file upload
exports.uploadImage = (req, res) => {
  // 'image' should be the name of the file input field in your form
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file', error: err });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // File uploaded successfully, you can do further processing here
    const imagePath = req.file.path;
    return res.status(200).json({ message: 'File uploaded successfully', imagePath: imagePath });
  });
};










