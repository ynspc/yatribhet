import { createTransport } from 'nodemailer';
import { emailConfig } from '../config/index';

export const sendMail = ( data ) => {

    const options = {
        transporter: {
            host: emailConfig.host,
            port: emailConfig.port,
            secure:  false,
            auth: {
                user: emailConfig.authUserName,
                pass: emailConfig.authPassword
            }
        },
        defaults: {}
    };

    console.log(options.transporter, 'testing')

    const { from, to, subject, template, dataObject } = data || {};

    const transport = createTransport(options.transporter);

    transport.sendMail(
        {
            from: from || 'sender@example.com',
            to: to || 'recipient@example.com',
            subject: subject || 'Message',
            text: 'I hope this message gets delivered!'//dataObject
        },
        (error, info) => {
            if ( error ){
                console.log('error', error);
                return false;
            }

            console.log('envelope', info.envelope);
            console.log('messageId', info.messageId);
        });
};
