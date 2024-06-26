const { Client } = require('pg');

exports.handler = async (event) => {
    const client = new Client({
        user: 'yourDatabaseUser',
        host: 'yourDatabaseHost',
        database: 'yourDatabaseName',
        password: 'yourDatabasePassword',
        port: 5432,
    });

    try {
        await client.connect();

        // Parse the event body
        const { method, body } = JSON.parse(event.body);
        let response;

        switch (method) {
            case 'create':
                response = await createHelpinho(client, body);
                break;
            case 'read':
                response = await readHelpinhos(client);
                break;
            case 'update':
                response = await updateHelpinho(client, body);
                break;
            case 'delete':
                response = await deleteHelpinho(client, body.id);
                break;
            default:
                response = {
                    statusCode: 400,
                    body: JSON.stringify({ message: "Invalid method" }),
                };
        }

        return response;

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

const createHelpinho = async (client, helpinho) => {
    const { image, category, title, description, avatars, extraAvatars } = helpinho;
    const query = 'INSERT INTO helpinhos (image, category, title, description, avatars, extra_avatars) VALUES ($1, $2, $3, $4, $5, $6)';
    await client.query(query, [image, category, title, description, avatars, extraAvatars]);
    return {
        statusCode: 201,
        body: JSON.stringify({ message: "Helpinho created successfully" }),
    };
};

const readHelpinhos = async (client) => {
    const res = await client.query('SELECT * FROM helpinhos');
    return {
        statusCode: 200,
        body: JSON.stringify(res.rows),
    };
};

const updateHelpinho = async (client, helpinho) => {
    const { id, image, category, title, description, avatars, extraAvatars } = helpinho;
    const query = 'UPDATE helpinhos SET image = $1, category = $2, title = $3, description = $4, avatars = $5, extra_avatars = $6 WHERE id = $7';
    await client.query(query, [image, category, title, description, avatars, extraAvatars, id]);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Helpinho updated successfully" }),
    };
};

const deleteHelpinho = async (client, id) => {
    const query = 'DELETE FROM helpinhos WHERE id = $1';
    await client.query(query, [id]);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Helpinho deleted successfully" }),
    };
};
