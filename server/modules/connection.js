// connection.js
var connectionString = 'postgres://localhost:5432/musical-forecast';

if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/musical-forecast';
}

module.exports = connectionString;
