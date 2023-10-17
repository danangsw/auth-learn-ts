import nodemailer, { SendMailOptions } from "nodemailer";
import config from "config";
import log from "./logger";

/**
 * Hanya digunakan untuk generate fake email smtp server
 */
// async function createTestCreds() { 
//     const creds = await nodemailer.createTestAccount()
//     log.info({ creds });
// }

// createTestCreds();

const smtp = config.get<{
    auth: {
        user: string,
        pass: string,
    }
    host: string,
    port: number,
    secure: boolean,
}>('smtp');

const transporter = nodemailer.createTransport({
    ...smtp,
    auth: smtp.auth
});

export async function sendEmail(payload: SendMailOptions) {
    transporter.sendMail(payload, (err, info) => {
        if (err) {
            log.error(err, "Error sending email");
            return;
        }

        log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        return;
    });
}
