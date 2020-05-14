"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("./controllers/authController"));
const mainController_1 = __importDefault(require("./controllers/mainController"));
const videoController_1 = __importDefault(require("./controllers/videoController"));
const router = express_1.default.Router();
// on définit des routes
router.get('/', mainController_1.default.home);
router.get('/makeTrainer', mainController_1.default.makeTrainer);
router.get('/listTrainers', mainController_1.default.listTrainers);
router.get('/listTrainers', mainController_1.default.listTrainers);
// Si le disque externe est accessible
router.get(`/api/start`, mainController_1.default.apiIsStart);
router.get(`/api/music/folder`, mainController_1.default.getAllMusicFolder);
router.get(`/api/img`, mainController_1.default.getImgFolder);
router.get(`/api/get-folder-songs/:key`, mainController_1.default.getFolderSongs);
router.get(`/api/play/:repertory/:song`, mainController_1.default.getMusicStreaming);
router.get(`/api/get-folder-videos`, mainController_1.default.getFolderVideos);
router.get(`/api/video/:key`, mainController_1.default.getVideoStreaming);
router.get(`/api/get-all-users`, authController_1.default.getAllUsers);
router.post(`/api/login`, authController_1.default.login);
router.post(`/api/register`, authController_1.default.register);
router.delete(`/api/delete/:key`, authController_1.default.delete);
router.get(`/api/check-films`, videoController_1.default.checkFilms);
router.post(`/api/add-film`, videoController_1.default.addFilm);
router.get(`/api/all-films`, videoController_1.default.getAllFilms);
router.get(`/api/one-film/:key`, videoController_1.default.getOneFilm);
router.get(`/api/admin-all-films`, videoController_1.default.adminGetAllFilms);
exports.default = router;
