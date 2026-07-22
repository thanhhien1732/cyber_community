import { responseSuccess } from "../common/helpers/response.helper";
import { chatMessageService } from "../services/chat-message.service";

export const chatMessageController = {
    create: async function (req, res, next) {
        const result = await chatMessageService.create(req);
        const response = responseSuccess(result, `Create chatMessage successfully`);
        res.status(response.statusCode).json(response);
    },

    findAll: async function (req, res, next) {
        const result = await chatMessageService.findAll(req);
        const response = responseSuccess(result, `Get all chatMessages successfully`);
        res.status(response.statusCode).json(response);
    },

    findOne: async function (req, res, next) {
        const result = await chatMessageService.findOne(req);
        const response = responseSuccess(result, `Get chatMessage #${req.params.id} successfully`);
        res.status(response.statusCode).json(response);
    },

    update: async function (req, res, next) {
        const result = await chatMessageService.update(req);
        const response = responseSuccess(result, `Update chatMessage #${req.params.id} successfully`);
        res.status(response.statusCode).json(response);
    },

    remove: async function (req, res, next) {
        const result = await chatMessageService.remove(req);
        const response = responseSuccess(result, `Remove chatMessage #${req.params.id} successfully`);
        res.status(response.statusCode).json(response);
    }
};