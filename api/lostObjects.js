var express = require('express')
var router = express.Router()
var lostOb = require('../services/lostObject')
var lostObject = require('../models/lostObject');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'raniapiweb',
    api_key: '459522612719716',
    api_secret: '6LmYPj8ZsthdUJ2Y1wQwHXZ1foE'
});

router.get('/all', function (req, res) {
    var obs = lostOb.findAll();
    if (obs === "error")
        res.send('error');
    else {
        res.send(obs);
    }
})


router.post("/uploadImage", (req, res) => {

    const values = Object.values(req.files)
    const promises = values.map(image => cloudinary.v2.uploader.upload(image.path))
    const id = req.body.id;
    console.log(id);
    Promise
        .all(promises)
        .then(results => {
            lostObject.model.findById(id, function (err, p) {
                if (!p)
                    res.send(err)
                else {
                    results.forEach(e => {
                        p.photo.push(e.secure_url);
                    });
                    p.save(function (err) {
                        if (err)
                            res.send(err)
                        else
                            res.json(results)
                    });
                }
            });

        })
});


module.exports = router