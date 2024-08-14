const express = require('express');
const sendEmail = require('./emailService');  
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/send', async (req, res) => {
    const { to, subject, message } = req.body;
    const emailOptions = {  
        from: 'sanketpatilcs13@gmail.com',
        to,
        subject,
        text: message,
    };

    try {
        await sendEmail(emailOptions);  
        res.send('Email sent successfully!');
    } catch (error) {
        res.status(500).send('Failed to send email. Please try again later.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

