var express = require('express');
var router = express.Router();
const multer = require("multer");


// taken from the official documentation of the mutlter at https://www.npmjs.com/package/multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    },

  })

  var upload = multer({ storage: storage }).single("file")


router.post('/', function(req,res){
    try {
        const file = upload(req, res, err => {
            if(err) {
                console.log(err);
              return res.json("file upload failed")
            }
            console.log(res.req.file.path);
            return res.json(res.req.file.path );
          })

    } catch (error) {
        res.status(500).json(err)

    }

          
    
})

module.exports = router;