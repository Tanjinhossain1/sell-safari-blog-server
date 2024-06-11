"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUploaderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const imageUploader_controller_1 = require("./imageUploader.controller");
const router = express_1.default.Router();
router.get('/uploads/:id', imageUploader_controller_1.ImageUploader.getFile);
// router.get('/:id', AcademicDepartmentController.getByIdFromDB);
router.post('/', imageUploader_controller_1.ImageUploader.fileUploader);
exports.imageUploaderRoutes = router;
