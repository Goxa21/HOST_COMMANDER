const nodemailer = require('nodemailer');
const fs = require('fs');
const { THIS } = require('./SESSION_MANAGER');
class MAILOYALA {
    constructor() {
        this.transporter = nodemailer.createTransport({
            secure: false,
            host: 'smtp.example.ru',
            port: 587,
            logger: false,
            auth: {
                user: 'example@example.ru',
                pass: 'example',
            },
            tls: {
                rejectUnauthorized: false,
                minVersion: 'TLSv1',
            }
        });
    }

    SendMail(options) {
        let THIS = this;
        let subject = options.subject || "ОПОВЕЩЕНИЕ ОТ ИНФОРМАЦИОННОГО ЯДРА";
        let header = options.header || "ОПОВЕЩЕНИЕ ОТ ИНФОРМАЦИОННОГО ЯДРА";
        let text = options.text || "ТЕСТОВОЕ УВЕДОМЛЕНИЕ, ПРОСИМ НЕ ОТВЕЧАТЬ НА НЕГО";
        let targets = options.targets || [];
        let href = options.href || null;
        let template = options.template || "default";
        
        return new Promise((resolve, reject) => {
            try {
                let stream = fs.createReadStream('./ASSETS/mail_templates/' + template + '.html');
                let htmldata = '';
                stream.on('data', function (data) {
                    htmldata += data;
                }).on('end', function () {
                    htmldata = htmldata.toString('utf-8').replace('!text_handler!', text).replace('!header_handler!', header);
                    //console.log(htmldata);
                    let mailData = {
                        from: '"HAL 9000" <example@example.ru>',
                        to: targets,
                        subject: subject,
                        html: htmldata,
                    }
                    let info = {};
                    info = THIS.transporter.sendMail(mailData);
                    info.then(result => {
                        //console.log('result');
                        //console.log(result);
                    },
                        error => {
                            //console.log('error');
                            console.log(error);
                        });
                        resolve(info);
                });
            } 
            catch(e) {
                console.log(e);
                reject(e);
            }
            finally {

            }
        });
    }




}

module.exports = new MAILOYALA();
