// express-v5-controller-crud
import { responseSuccess } from "../common/helpers/response.helper";
import { articleService } from "../services/article.service";

export const articleController = {
   create: async function (req, res, next) {
      const result = await articleService.create(req);
      const response = responseSuccess(result, `Create article successfully`);
      res.status(response.statusCode).json(response);
   },

   findAll: async function (req, res, next) {
      const result = await articleService.findAll(req);
      const response = responseSuccess(result, `Get all articles successfully`);
      res.status(response.statusCode).json(response);
   },

   findOne: async function (req, res, next) {
      const result = await articleService.findOne(req);
      const response = responseSuccess(result, `Get article #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   update: async function (req, res, next) {
      const result = await articleService.update(req);
      const response = responseSuccess(result, `Update article #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   remove: async function (req, res, next) {
      const result = await articleService.remove(req);
      const response = responseSuccess(result, `Remove article #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   }
};