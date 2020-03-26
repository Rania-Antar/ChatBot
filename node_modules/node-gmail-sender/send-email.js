const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const fs = require('fs');

class Emailer {

    constructor(user, pass) {
        this.throttleDuration = 1000;
        this.emailInTransit = false;
        this.transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: user,
                pass: pass
            }
        }));
    }

    async send(msg, from, to, subject) {
        const promise = new Promise(async (resolve, reject) => {
            const mailOptions = {
                from: from,
                to: to,
                subject: subject,
                text: msg
            };
            if(!this.emailInTransit) {
                this.emailInTransit = true;
                this.transporter.sendMail(mailOptions, (error, info) => {
                    this.emailInTransit = false;
                    if (error) {
                        reject(error);
                    } else {
                        resolve('Email sent: ' + info.response);
                    }
                });
            } else {
                setTimeout(async () => {
                    console.log("Throttle limit exceeded queuing email");
                    let resp = await this.send(msg, from, to, subject);
                    console.log("Got response let's continue");
                    resolve(resp);
                }, this.throttleDuration);
            }
            
        });
        return promise;
    }

    async buildEmail(template, data) {
        const promise = new Promise((resolve, reject) => {
            fs.readFile(template, 'utf8', function(err, txt) {
                if (err) throw err;
                for (let prop in data) {
                    let regExp = new RegExp(`%${prop}%`, 'g');
                    txt = txt.replace(regExp, data[prop]);
                }
                resolve(txt);
            });
        });
        return promise;
    }
}

module.exports = Emailer;