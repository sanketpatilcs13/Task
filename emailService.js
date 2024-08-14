const nodemailer = require('nodemailer');

let attemptCount = 0;  
const MAX_ATTEMPTS = 3;  

const primaryMailer = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'sanketpatilcs1@gmail.com',
        pass: 'dxsx idzg tuhx nogt',
    },
});

const backupMailer = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'sanketpatilcs13@gmail.com',
        pass: 'dxsx idzg tuhx nogt',
    },
});

async function sendEmail(mailOptions) {  
    try {
        await primaryMailer.sendMail(mailOptions);
        console.log('Email sent successfully using primary mailer');
        attemptCount = 0; // Reset attempt count on success
    } catch (error) {
        console.error(`Failed to send email using primary mailer: ${error}`);
        attemptCount++;
        if (attemptCount >= MAX_ATTEMPTS) {
            console.log('Switching to backup mailer after max attempts');
            try {
                await backupMailer.sendMail(mailOptions);
                console.log('Email sent successfully using backup mailer');
                attemptCount = 0; // Reset attempt count on success
            } catch (backupError) {
                console.error(`Failed to send email using backup mailer: ${backupError}`);
                throw new Error('Both primary and backup mailers failed');
            }
        } else {
            console.log(`Retrying... Attempt ${attemptCount}`);
            await sendEmail(mailOptions); // Retry
        }
    }
}

module.exports = sendEmail;  
