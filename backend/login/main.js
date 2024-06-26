const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Username and password are required" }),
        };
    }

    const client = new Client({
        user: 'yourDatabaseUser',
        host: 'yourDatabaseHost',
        database: 'yourDatabaseName',
        password: 'yourDatabasePassword',
        port: 5432,
    });

    try {
        await client.connect();

        const query = 'SELECT username, password_hash FROM users WHERE username = $1';
        const res = await client.query(query, [username]);

        if (res.rows.length === 0) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: "Invalid username or password" }),
            };
        }

        const user = res.rows[0];
        const passwordValid = await bcrypt.compare(password, user.password_hash);

        if (!passwordValid) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: "Invalid username or password" }),
            };
        }

        // Generate token (e.g., JWT)
        const token = generateToken(user);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Login successful", token }),
        };

    } catch (error) {
        console.error('Database connection error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error" }),
        };
    } finally {
        await client.end();
    }
};

function generateToken(user) {
    const secretKey = process.env.JWT_SECRET || 'your-256-bit-secret';

    const payload = {
        username: user.username,
    };

    const options = {
        expiresIn: '1h',
    };

    const token = jwt.sign(payload, secretKey, options);
    return token;
}
