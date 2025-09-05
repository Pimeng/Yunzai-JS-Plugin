import nodemailer from 'nodemailer';

/**
 * 邮件发送模块
 */
const sendEMail = {
    /**
     * 使用固定邮箱向某人发送邮件信息
     * @param {string} mailuser 收件人
     * @param {string} subject 主题
     * @param {string} html 内容
     * @returns {Promise<string|Error>} 发送结果或错误
     */
    async send(mailuser, subject, html) {   
        let transporter = nodemailer.createTransport({
            host: 'smtp.example.com', 
            port: 465,
            secure: true, // 使用 SSL 协议
            auth: {
                user: 'user@example.com', // 发件人邮箱
                pass: 'yourpasswd' // SMTP 服务授权码
            }
        });
        
        let mailOptions = {
            from: 'user@example.com',
            to: mailuser,
            subject: subject,
            html: html
        };
        
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                transporter.close();
                if (error) {
                    reject(error);
                } else {
                    resolve('发送成功');
                }
            });
        });
    }
};

export default sendEMail;