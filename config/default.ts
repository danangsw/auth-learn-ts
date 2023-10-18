/**
 * Fake email serviceL: https://ethereal.email/
 */

/**
 * Set this property  of `'logLevel'`to the desired logging level. In order of priority, available levels are:
 *
 * - 'fatal'
 * - 'error'
 * - 'warn'
 * - 'info'
 * - 'debug'
 * - 'trace'
 *
 * The logging level is a __minimum__ level. For instance if `logger.level` is `'info'` then all `'fatal'`, `'error'`, `'warn'`,
 * and `'info'` logs will be enabled.
 *
 * You can pass `'silent'` to disable logging.
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