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
    //Les paramètres a ajouter
    const newVideo = {
        title: req.body.snippet.title,
        id: req.body.id.videoId
    }

    //On modifie le JSON en fonction de l'utilisateur
    if (user == "john") {
        fs.readFile(JohnDB, 'utf-8', (err, data) => {
            let johnJSON = JSON.parse(data)

            johnJSON.videos.push(newVideo)

            fs.writeFile(JohnDB, JSON.stringify(johnJSON), (err) => {
                err ? console.log(err) : null;
            });
        });

    } else if (user == "mark") {
        fs.readFile(MarkDB, 'utf-8', (err, data) => {
            let markJSON = JSON.parse(data)

            markJSON.videos.push(newVideo)

            fs.writeFile(MarkDB, JSON.stringify(markJSON), (err) => {
                err ? console.log(err) : null;
            });
        });
    }
})

app.delete('/delete', (req, res) => {
    const user = req.body.usrName;
    const id = req.body.id;
    console.log(req.body)

    if (user === "john") {
        fs.readFile(JohnDB, 'utf-8', (err, data) => {
            let johnJSON = JSON.parse(data);
            console.log(johnJSON)
            //Filter de notre Json en fonction de la video que l'on veut supprimer
            const newjohnJSON = {
                name: user,
                videos: johnJSON.videos.filter(video => video.id !== id),
                libName: johnJSON.libName
            }
            console.log('///////////////////////////////')
            console.log(johnJSON)
            // On réécrit le JSON sans la data
            fs.writeFile(JohnDB, JSON.stringify(newjohnJSON), (err) => {
                err ? console.log(err) : null
            })
        });
    }
    if (user === "mark") {
        fs.readFile(MarkDB, 'utf-8', (err, data) => {
            let markJSON = JSON.parse(data);
            console.log(markJSON)
            //Filter de notre Json en fonction de la video que l'on veut supprimer
            const newMarkJSON = {
                name: user,
                videos: markJSON.videos.filter(video => video.id !== id),
                libName: markJSON.libName
            }
            console.log('///////////////////////////////')
            console.log(markJSON)
            // On réécrit le JSON sans la data
            fs.writeFile(MarkDB, JSON.stringify(newMarkJSON), (err) => {
                err ? console.log(err) : null
            })
        });
    }
})

app.listen(8400);