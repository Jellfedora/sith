"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainController_1 = __importDefault(require("./controllers/mainController"));
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
exports.default = router;
