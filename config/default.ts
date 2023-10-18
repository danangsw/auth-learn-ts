/**
 * Fake email serviceL: https://ethereal.email/
 */

export default {
    port: 3000,
    mongoDbUri: 'mongodb://danang.msi:27017/user-auth-learning',
    logLevel: 'info',
    // only for development purpose
    // use the real smtp configuration for the production purpose
    smtp: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jevon.kuhn77@ethereal.email',
            pass: 'jFHkrwVjTNhqRvc5Kq'
        },
        secure: false // true: for production
    },
    emailFrom: 'test@example.com'
};