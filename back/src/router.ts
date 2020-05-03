import express from 'express';

import MainController from './controllers/mainController';

const router: express.Router = express.Router();




// on définit des routes
router.get('/', MainController.home);

router.get('/makeTrainer', MainController.makeTrainer);

router.get('/listTrainers', MainController.listTrainers);

router.get('/listTrainers', MainController.listTrainers);

// Si le disque externe est accessible
router.get(`/api/start`, MainController.apiIsStart);

router.get(`/api/music/folder`, MainController.getAllMusicFolder);
router.get(`/api/img`, MainController.getImgFolder);
router.get(`/api/get-folder-songs/:key`, MainController.getFolderSongs);
router.get(`/api/play/:repertory/:song`, MainController.getMusicStreaming);
router.get(`/api/get-folder-videos`, MainController.getFolderVideos);
router.get(`/api/video/:key`, MainController.getVideoStreaming);
router.post(`/api/login`, MainController.postLogin);

export default router;