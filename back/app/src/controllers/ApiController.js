const Controller = require('./Controller')
const player = require('chromecast-player')();
const fs = require('fs');
var path = require('path');


class PostController extends Controller {

    constructor(service) {
        super(service);
    }

    // Liste tout les dossiers de Musique
    async getAllMusicFolder(req, res) {
        const musicPath = '/home/jellfedora/Musique';

        var listOfMusicFolders = fs.readdirSync(musicPath).sort();
        listOfMusicFolders.forEach(folder => {
            listOfMusicFolders.push(folder);
        });

        return res.status(200).json(listOfMusicFolders);
    }

    // Retourne l'image d'un albulm
    async getImgFolder(req, res) {
        var img = fs.readFileSync('/home/jellfedora/Musique/Nightwish-Human/1585625756_cover.jpg');

        return res.status(200, { 'Content-Type': 'image/jpg' }).end(img, 'binary');
    }

    // Renvoie les chansons et la photo d'un Repertoire
    async getFolderSongs(req, res) {
        var key = req.params.key;
        // Chemin du dossier Musique + key
        let pathMusicFolder = '/home/jellfedora/Musique/' + key;
        var songsOfRepository = fs.readdirSync(pathMusicFolder).sort();

        let listOfMusic = [];
        let listOfMusicImg = [];
        songsOfRepository.forEach(file => {
            // Recherche si il y a une image dans le répertoire
            if (path.extname(file) === '.jpg' || path.extname(file) === '.png') {
                listOfMusicImg.push(file);
            }
            // Recherche si cest un mp3 //Todo voir autre format
            if (path.extname(file) === '.mp3') {
                // Supprime .mp3 du titre
                file = file.replace('.mp3', '')
                listOfMusic.push(file);
                // Todo ajouter un index aux fichiers
            }
        })

        var data = {
            "repertorySongs": listOfMusic,
            "repertoryImg": listOfMusicImg,
        };

        res.json(data)
    }

    // Renvoie les films présentd'un Repertoire
    async getFolderVideos(req, res) {
        // Chemin du dossier Videos
        let pathVideoFolder = '/home/jellfedora/Vidéos/';
        var videosOfRepository = fs.readdirSync(pathVideoFolder).sort();

        let listOfVideos = [];
        videosOfRepository.forEach(file => {
            // Recherche si cest un mkv
            if (path.extname(file) === '.mkv') {
                // Supprime .mp3 du titre
                file = file.replace('.mkv', '')
                listOfVideos.push(file);
                // Todo ajouter un index aux fichiers
            }
            // Recherche si cest un mp4
            if (path.extname(file) === '.mp4') {
                // Supprime .mp3 du titre
                file = file.replace('.mp4', '')
                listOfVideos.push(file);
                // Todo ajouter un index aux fichiers
            }
            // Recherche si cest un avi
            if (path.extname(file) === '.avi') {
                // Supprime .mp3 du titre
                file = file.replace('.avi', '')
                listOfVideos.push(file);
                // Todo ajouter un index aux fichiers
            }

            // SI cest un dossier
            // if (path.extname(file) === '') {
            //     // Supprime .mp3 du titre
            //     // file = file.replace('.mp4', '')
            //     listOfVideos.push(file);
            //     // Todo ajouter un index aux fichiers
            // }
        })

        var data = {
            "repertorySongs": listOfVideos
        };

        res.json(data)
    }

    // Streaming audio
    async getMusicStreaming(req, res) {
        var repertory = req.params.repertory;
        var song = req.params.song;
        const musicFolder = '/home/jellfedora/Musique/' + repertory;
        var music = musicFolder + '/' + song + '.mp3';

        var stat = fs.statSync(music);
        var range = req.headers.range;
        var readStream;

        if (range !== undefined) {
            var parts = range.replace(/bytes=/, "").split("-");

            var partial_start = parts[0];
            var partial_end = parts[1];

            if ((isNaN(partial_start) && partial_start.length > 1) || (isNaN(partial_end) && partial_end.length > 1)) {
                return res.sendStatus(500); //ERR_INCOMPLETE_CHUNKED_ENCODING
            }

            var start = parseInt(partial_start, 10);
            var end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
            var content_length = (end - start) + 1;

            res.status(206).header({
                'Content-Type': 'audio/mpeg',
                'Content-Length': content_length,
                'Content-Range': "bytes " + start + "-" + end + "/" + stat.size
            });

            readStream = fs.createReadStream(music, { start: start, end: end });
        } else {
            res.header({
                'Content-Type': 'audio/mpeg',
                'Content-Length': stat.size
            });
            readStream = fs.createReadStream(music);
        }
        readStream.pipe(res);
    }

    // Streaming vidéo
    async getVideoStreaming(req, res) {
        var key = req.params.key;
        const videoFolder = '/home/jellfedora/Vidéos';
        var video = videoFolder + '/' + key + '.mkv';

        var stat = fs.statSync(video);
        var range = req.headers.range;
        var readStream;

        if (range !== undefined) {
            var parts = range.replace(/bytes=/, "").split("-");

            var partial_start = parts[0];
            var partial_end = parts[1];

            if ((isNaN(partial_start) && partial_start.length > 1) || (isNaN(partial_end) && partial_end.length > 1)) {
                return res.sendStatus(500); //ERR_INCOMPLETE_CHUNKED_ENCODING
            }

            var start = parseInt(partial_start, 10);
            var end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
            var content_length = (end - start) + 1;

            res.status(206).header({
                // 'Content-Type': 'audio/mpeg',
                'Content-Type': 'video/mkv',
                'Content-Length': content_length,
                'Content-Range': "bytes " + start + "-" + end + "/" + stat.size
            });

            readStream = fs.createReadStream(video, { start: start, end: end });
        } else {
            res.header({
                'Content-Type': 'audio/mpeg',
                'Content-Length': stat.size
            });
            readStream = fs.createReadStream(video);
        }
        readStream.pipe(res);
    }

    // Cast (in progress)
    async getCast(req, res) {
        var otherMovie = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4';
        var movie = 'https://sith-api.hopto.org/api/video/Tomb-Raider';
        var img = 'https://sith-api.hopto.org/api/img';

        var googleHomeAdress = '192.168.1.10';
        var chromecastAdress = '192.168.1.11'

        // player.attach({ displayName: 'Google Home' }, function (err, p) {
        //     console.log(p)


        //     // p.play(); 

        //     p.launch(movie, { type: 'video/mkv' }, function (err, p) {
        //         if (err) {
        //             console.log(err)
        //         }
        //         console.log('Le film est casté!');
        //     });
        // });


        // player.launch(musicUrl, (err, p) => {
        //     p.once('playing', () => {
        //         console.log('playback has started.');
        //     });
        // });

        // change type of media
        player.launch(movie, { type: 'video/mkv' }, function (err, p) {
            console.log(p)
            if (err) {
                console.log(err)
            }
            p.once('playing', () => {
                console.log('Le film est casté!');
            });
        })

        return res.status(200).json('Cast');

    }
}

module.exports = new PostController;