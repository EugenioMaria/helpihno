const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
    const { name, email, cpfCnpj, birthdate, password } = JSON.parse(event.body);

    if (!name || !email || !cpfCnpj || !birthdate || !password) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "All fields are required" }),
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

        const passwordHash = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (name, email, cpf_cnpj, birthdate, password_hash) VALUES ($1, $2, $3, $4, $5)';
        await client.query(query, [name, email, cpfCnpj, birthdate, passwordHash]);

        return {
            statusCode: 201,
            body: JSON.stringify({ message: "User registered successfully" }),
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
