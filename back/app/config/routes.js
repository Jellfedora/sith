



// // TEST cast

// // Chromecast Test (Works!)






// // Cast zik
// app.get('/api/cast', function (req, res) {
//     mediaURL = 'https://sith.hopto.org/api/play/Indochine%20-%2013/07.%20Indochine%20-%20Karma%20Girls';

//     cast.castMusic(mediaURL);

//     res.json('yep')
// })










// // TEST cast






const ApiController = require('../src/controllers/ApiController');

module.exports = app => {

    // ROUTES
    app.get(`/api/music/folder`, ApiController.getAllMusicFolder);
    app.get(`/api/img`, ApiController.getImgFolder);
    app.get(`/api/get-folder-songs/:key`, ApiController.getFolderSongs);
    app.get(`/api/play/:repertory/:song`, ApiController.getMusicStreaming);
    app.get(`/api/get-folder-videos`, ApiController.getFolderVideos);
    app.get(`/api/video/:key`, ApiController.getVideoStreaming);
    app.get(`/api/cast`, ApiController.getCast);
    // app.post(`/api/post`, PostController.insert)
    // app.put(`/api/post/:id`, PostController.update);
    // app.delete(`/api/post/:id`, PostController.delete);
}

