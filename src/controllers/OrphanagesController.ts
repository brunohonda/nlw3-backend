import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Orphanage from '../models/Orphanage';

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
    
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            openingHours,
            isOpenOnWeekends,
            images
        });
    
        await orphanagesRepository.save(orphanage);
    
        return response.status(201).json(orphanage);
    },

    async getList(request: Request, response: Response): Promise<Response> {
        const orphanagesRepository = getRepository(Orphanage);
    
        const orphanages = await orphanagesRepository.find();

        return response.json(orphanages);
    },

    async get(request: Request, response: Response): Promise<Response> {
        const orphanagesRepository = getRepository(Orphanage);
    
        try {
            const orphanage = await orphanagesRepository.findOneOrFail(request.params.id);

            return response.json(orphanage);
        } catch (error) {
            return response.status(404).json(error);
        }
        
    }
}