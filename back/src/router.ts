import express from 'express';

import AuthController from './controllers/authController';
import MainController from './controllers/mainController';
import VideoController from './controllers/videoController';
import MusicController from './controllers/musicController';
const auth = require('./middlewares/auth');
const router: express.Router = express.Router();




// on définit des routes
router.get('/', MainController.home);

// router.get('/makeTrainer', MainController.makeTrainer);

// router.get('/listTrainers', MainController.listTrainers);

// router.get('/listTrainers', MainController.listTrainers);

// Si le disque externe est accessible
router.get(`/api/start`, MainController.apiIsStart);

router.get(`/api/music/folder`, auth, MainController.getAllMusicFolder);
router.get(`/api/img`, auth, MainController.getImgFolder);
router.get(`/api/get-folder-songs/:key`, auth, MainController.getFolderSongs);
router.get(`/api/play/:repertory/:song`, MainController.getMusicStreaming);
router.get(`/api/get-folder-videos`, auth, MainController.getFolderVideos);
router.get(`/api/video/:key`, MainController.getVideoStreaming);

router.get(`/api/get-all-users`, auth, AuthController.getAllUsers);
router.post(`/api/login`, AuthController.login);
router.post(`/api/register`, auth, AuthController.register);
router.delete(`/api/delete/:key`, auth, AuthController.delete);

router.get(`/api/check-films`, auth, VideoController.checkFilms);
router.get(`/api/check-series`, auth, VideoController.checkSeries);
router.post(`/api/add-film`, auth, VideoController.addFilm);
router.get(`/api/all-films`, auth, VideoController.getAllFilms);
router.get(`/api/one-film/:key`, auth, VideoController.getOneFilm);
router.get(`/api/admin-all-films`, auth, VideoController.adminGetAllFilms);
router.post(`/api/upload-film`, auth, VideoController.uploadMovie);

router.post(`/api/upload-song`, auth, MusicController.uploadSong);


export default router;