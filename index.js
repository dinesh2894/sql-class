const {faker} = require('@faker-js/faker');

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost", user: "root", password: "root", database: "delta_app"
});
let createRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
}

let q = "INSERT INTO user (id, username, email, password) values ?";

let data = [];

for (let i = 0; i <= 100; i++) {
    // data.push(createRandomUser);
    data.push(createRandomUser());
}


try {
    connection.query(q, [data], (err, result) => {
        if (err) throw err;
        console.log(result);
    })
} catch (err) {
    console.log(err);
}

connection.end();



