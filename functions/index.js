
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.sendMessage = functions.firestore
    .document('contacts/{userId}')
    .onCreate(event => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const value = event.data.data();

        // perform desired operations ...
        const mailOptions = {
            to: 'snadomestic@gmail.com',
            subject: `New message from ${value.firstName}  ${value.lastName }`,
            text: `\n 
            Name: ${value.firstName}  ${value.lastName} \n
            phone: ${value.phone} \n
            email: ${value.email} \n
            -------------------------
            \n
            Message:
            \n${value.message}`
        };
        return mailTransport.sendMail(mailOptions).then(() => {
            return console.log('Mail sent'); //The log will be shown in Firebase.
        });
    });

exports.sendBookings = functions.firestore
    .document('bookings/{userId}')
    .onCreate(event => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const value = event.data.data();

        // perform desired operations ...
        const mailOptions = {
            to: 'snadomestic@gmail.com',
            subject: `New Booking from ${value.name}`,
            text: `\n 
            Name: ${value.name} \n
            Date: ${value.date} \n
            Address: ${value.address} \n
            phone: ${value.phone} \n
            email: ${value.email} \n
            -----------------------------
            \n
            Number of Bedrooms: ${value.bedroom} \n
            Number of Bathrooms: ${value.bathroom} \n
            Service Type: ${value.service} \n
            ------------------------------
            \n${value.message}
            `
        };
        return mailTransport.sendMail(mailOptions).then(() => {
            return console.log('Mail sent'); //The log will be shown in Firebase.
        });
    });

exports.sendCareer = functions.firestore
    .document('careers/{userId}')
    .onCreate(event => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const value = event.data.data();

        // perform desired operations ...
        const mailOptions = {
            to: 'snadomestic@gmail.com',
            subject: `New job application from ${value.firstName} ${value.lastName}`,
            text: `\n 
            Name: ${value.firstName} ${value.lastName} \n
            phone: ${value.phone} \n
            email: ${value.email} \n
            Experience: ${value.experience} \n
            -----------------------------
            \n
            Australian License: ${value.licence} \n
            Car: ${value.car} \n
            Blue card: ${value.blueCard} \n
            Police Check: ${value.afp} \n
            ------------------------------
            \n
            Cover Letter:
            \n${value.coverLetter}
            `
        };
        return mailTransport.sendMail(mailOptions).then(() => {
            return console.log('Mail sent'); //The log will be shown in Firebase.
        });
    });

