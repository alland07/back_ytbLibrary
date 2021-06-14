const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const JohnDB = './asset/database/John.json';
const JDB = require('./asset/database/John.json');
const MarkDB = './asset/database/Mark.json';
const MDB = require('./asset/database/Mark.json');

//Enable Cors
app.use(cors());
//Enable Request with json

app.use(express.json());

//Requests
app.get('/', (req, res) => {
    // On récupère l'utilisateur dans l'URL
    const user = req.url.slice(7);
    //On envoie les données correspondantes à l'utilisateur
    if (user == "john") {
        res.send(JDB);
    } else if (user == "mark") {
        res.send(MDB);
    }
});

app.post('/addvideo', (req, res) => {

    //notre user
    const user = req.body.name;
    const newVideo = {
        title: req.body.snippet.title,
        id: req.body.id.videoId
    }

    if (user == "john") {
        fs.readFile(JohnDB, 'utf-8', (err, data) => {
            let johnJSON = JSON.parse(data)
            console.log(johnJSON)

            johnJSON.videos.push(newVideo)

            fs.writeFile(JohnDB, JSON.stringify(johnJSON), (err) => {
                err ? console.log(err) : null;
            });
        });

    } else if (user == "mark") {
        fs.readFile(MarkDB, 'utf-8', (err, data) => {
            let johnJSON = JSON.parse(data)
            console.log(johnJSON)

            markJSON.videos.push(newVideo)

            fs.writeFile(MarkDB, JSON.stringify(markJSON), (err) => {
                err ? console.log(err) : null;
            });
        });
    }
})

app.listen(8400);