import { responseSuccess } from "../common/helpers/response.helper";
import { chatGroupService } from "../services/chat-group.service";

export const chatGroupController = {
    create: async function (req, res, next) {
        const result = await chatGroupService.create(req);
        const response = responseSuccess(result, `Create chatGroup successfully`);
        res.status(response.statusCode).json(response);
    },

    findAll: async function (req, res, next) {
        const result = await chatGroupService.findAll(req);
        const response = responseSuccess(result, `Get all chatGroups successfully`);
        res.status(response.statusCode).json(response);
    },

    findOne: async function (req, res, next) {
        const result = await chatGroupService.findOne(req);
        const response = responseSuccess(result, `Get chatGroup #${req.params.id} successfully`);
        res.status(response.statusCode).json(response);
    },

    update: async function (req, res, next) {
        const result = await chatGroupService.update(req);
        const response = responseSuccess(result, `Update chatGroup #${req.params.id} successfully`);
        res.status(response.statusCode).json(response);
    },

    remove: async function (req, res, next) {
        const result = await chatGroupService.remove(req);
        const response = responseSuccess(result, `Remove chatGroup #${req.params.id} successfully`);
        res.status(response.statusCode).json(response);
    }
};