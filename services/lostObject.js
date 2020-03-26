var bcrypt = require('bcrypt-nodejs')
var deasync = require('deasync');
var Users = require("../models/users");
var lostObject = require('../models/lostObject');

class LostObject {
    static add(object) {
        console.log(object.name);
        let lb;
        var done = false;
        object.save(function (err, crp) {
            if (err) {
                lb = "error";
                done = true;
            }
            else {
                lb = crp;
                done = true;
            }
        });
        deasync.loopWhile(function () {
            return !done;
        });
        return lb;
    }

    static findAll() {
        let data;
        var done = false;
        lostObject.model.find(function (err, carps) {
            if (err) {
                data = "error";
                done = true;
            }
            else {
                if (carps.length) {
                    data = carps;
                    done = true;
                }
                else {
                    data = "error";
                    done = true;
                }
            }
        });
        deasync.loopWhile(function () {
            return !done;
        });
        return data;
    }

    static findBy(keyword) {
        let data;
        var done = false;
        lostObject.model.find(
            {
                $or: [
                    {name: {$regex: '.*' + keyword + '.*', $options: 'i'}},
                    {description: {$regex: '.*' + keyword + '.*', $options: 'i'}},
                ]
            }
            , function (err, carps) {
                if (err) {
                    data = "error";
                    done = true;
                }
                else {
                    if (carps.length) {
                        data = carps;
                        done = true;
                    }
                    else {
                        data = "error";
                        done = true;
                    }
                }
            });
        deasync.loopWhile(function () {
            return !done;
        });
        return data;
    }
}

module.exports = LostObject;