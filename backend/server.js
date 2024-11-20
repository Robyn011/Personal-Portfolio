const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config(); // This will load variables from your .env file

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Nodemailer transport configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use Gmail or another email service
    auth: {
        user: process.env.EMAIL_USER,  // Email from .env file
        pass: process.env.EMAIL_PASS   // App-specific password from .env file
    }
});

// Define the POST endpoint for sending email
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Mail options
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender's email
        to: process.env.EMAIL_USER,    // Send to yourself (or another email)
        subject: 'New Message from Portfolio Contact Form',
        text: `You have a new message from ${name} (${email}):\n\n${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send({ success: false, error: error.message });
        }
        console.log('Email sent: ' + info.response);
        res.status(200).send({ success: true, message: 'Email sent successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
