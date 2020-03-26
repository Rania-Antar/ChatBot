# Setup

1) `npm install node-gmail-sender`
2) Follow instructions here to allow your application to send email on your behalf as a "Less than Secure Application". Personally, I use a throw away email for my automation. I have neither researched nor vouge for the security of this process use at your own risk. https://support.google.com/accounts/answer/6010255?hl=en

# Usage

``` 
const Emailer = require('node-gmail-sender`);
const user = "youremail@gmail.com"; // Replace with your email
const pass = "yourpassword"; // Replace with your password
const emailer = new Emailer(user, pass)

const msg = "This is an email from node-gmail-sender";
const subject = "Automated Email using Node-Gmail-Sender";
const fromEmail = "youremail@gmail.com";
const toEmail = "someOtherPerson@gmail.com";

emailer.send(msg, fromEmail, toEmail, subject);
```

# Troubleshooting

> Error: Invalid login: 535-5.7.8 Username and Password not accepted. Learn more at
> 535 5.7.8  https://support.google.com/mail/?p=BadCredentials r9sm1541485wmh.38 - gsmtp
- https://stackoverflow.com/a/26196619/5100560