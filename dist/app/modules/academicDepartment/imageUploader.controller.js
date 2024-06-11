"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploader = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const fileUploader = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('asdkf', req.formData);
        const image = req.file;
        let imagePath = "";
        if (image) {
            imagePath = image.path;
        }
        res.json({
            success: 1,
            file: {
                url: `http://localhost:3002/${imagePath}`,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}));
const getFile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('asdkf', req.formData);
        const image = req.file;
        let imagePath = "";
        if (image) {
            imagePath = image.path;
        }
        res.json({
            success: 1,
            file: {
                url: `http://localhost:3002/${imagePath}`,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}));
exports.ImageUploader = {
    fileUploader,
    getFile
};
