const { Pool } = require('pg');
const fs = require('fs');
const { definitions, triggers, instantiations } = require('./main/build.json');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'moodpandadb',
    password: '',
    port: 5432
})

const transact = async (callback) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await callback(client.query.bind(client));
        await client.query('COMMIT');
        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

function getPath(fileName) {
    return `./main/${fileName}`;
}

function read(file) {
    const path = getPath(file);
    return fs.readFileSync(path, { encoding: 'utf-8' });
}

async function execute(file, query) {
    const sqlQuery = read(file);
    await query(sqlQuery);
    console.log("done");
}

async function executeSequentially(files, query) {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
        // eslint-disable-next-line no-await-in-loop
        await execute(file, query);
    }
}

async function build() {
    try {
        await transact(async (query) => {
            await executeSequentially(definitions, query);
            await executeSequentially(instantiations, query);
            await executeSequentially(triggers, query);
        });
        console.log('Successfully built database.');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

build();
