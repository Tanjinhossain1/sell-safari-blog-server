"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageUploader_routes_1 = require("../modules/academicDepartment/imageUploader.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/image',
        route: imageUploader_routes_1.imageUploaderRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
