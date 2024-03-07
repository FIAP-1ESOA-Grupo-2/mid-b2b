import nodemailer from 'nodemailer';

export const mailConfig = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'renatoalmeida727261@gmail.com',
        pass: 'rhch kgdf mgvw kwis',
    },
});