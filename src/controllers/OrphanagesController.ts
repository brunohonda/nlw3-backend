import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Orphanage from '../models/Orphanage';
import OrphanagesView from '../views/Orphanages.view';
import OrphanageValidator from '../validators/OrphanagesValidator';

export default {
    async create(request: Request, response: Response): Promise<Response> {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            openingHours,
            isOpenOnWeekends
        } = request.body;
    
        const orphanagesRepository = getRepository(Orphanage);

        const requestImages= request.files as Express.Multer.File[];
        const images = requestImages.map(image => ({ path: image.filename }));

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            openingHours,
            isOpenOnWeekends,
            images
        };

        await OrphanageValidator.validate(data, {
            abortEarly: false,
        });
    
        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);
    
        return response.status(201).json(OrphanagesView.render(orphanage));
    },

    async getList(request: Request, response: Response): Promise<Response> {
        const orphanagesRepository = getRepository(Orphanage);
    
        const orphanages = await orphanagesRepository.find({
            relations: [ 'images' ]
        });

        return response.json(OrphanagesView.renderMany(orphanages));
    },

    async get(request: Request, response: Response): Promise<Response> {
        const orphanagesRepository = getRepository(Orphanage);
    
        try {
            const orphanage = await orphanagesRepository.findOneOrFail(request.params.id, {
                relations: [ 'images' ]
            });

            return response.json(OrphanagesView.render(orphanage));
        } catch (error) {
            return response.status(404).json(error);
        }
        
    }
}