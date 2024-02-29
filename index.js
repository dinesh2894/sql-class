// const {faker} = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "delta_app"
});


/*let createRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
}*/

// let q = "INSERT INTO user (id, username, email, password) values ?";

// let data = [];
//
// for (let i = 0; i <= 100; i++) {
//     // data.push(createRandomUser);
//     data.push(createRandomUser());
// }


// try {
//     connection.query(q, [data], (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     })
// } catch (err) {
//     console.log(err);
// }
//
// connection.end();

// TODO : Home Route
app.get("/", (req, res) => {
    let query = `SELECT *
                 FROM user`;
    try {
        connection.query(query, (err, result) => {
            if (err) throw err;
            let data = result;
            console.log(result);
            res.render('home.ejs', {data});
        })
    } catch (err) {
        console.log(err);
        res.send(`Error in database ${err}`);
    }
});

// TODO: Show route
app.get("/user", (req, res) => {
    let query = `SELECT *
                 FROM user`;
    try {
        connection.query(query, (err, result) => {
            if (err) throw err;
            let users = result;
            console.log(result);
            res.render('show-user.ejs', {users});
        })
    } catch (err) {
        console.log(err);
        res.send(`Error in database ${err}`);
    }

});

// Edit Route
// TODO :: /user/:id/edit
app.get("/user/:id/edit", (req, res) => {
    let {id} = req.params;
    let query = `SELECT *
                 FROM user
                 WHERE id = '${id}'`;
    try {
        connection.query(query, (err, result) => {
            if (err) throw err;
            let user = result[0];
            console.log(result);
            res.render('edit.ejs', {user});
        })
    } catch (err) {
        console.log(err);
        res.send(`Some error in DB ${err}`);
    }
});

// UPDATE(DB) Route
app.patch("/user/:id", (req, res) => {
    let {id} = req.params;
    let {password: formPass, username: newUsername} = req.body;
    // SQL Query
    let q = `SELECT *
             FROM user
             WHERE id = '${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            if (formPass !== user.password) {
                res.send("WRONG password");
            } else {
                let q2 = `UPDATE user
                          SET username = '${newUsername}'
                          WHERE id = '${id}'`;
                connection.query(q2, (err, result) => {
                    if (err) throw err;
                    res.redirect("/user");
                });
            }
        })
    } catch (err) {
        console.log(err);
        res.send(`Some error in DB ${err}`);
    }

});

app.listen(port, (req, res) => {
    console.log(req);
    console.log(res);
    console.log(`Listening port is ${port}`);
})