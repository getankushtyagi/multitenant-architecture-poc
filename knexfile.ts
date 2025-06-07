module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'ankushtyagi',
            password: 'Admin@123',
            database: 'master',
        },
        migrations: {
            directory: './migrations',
        },
    },
}