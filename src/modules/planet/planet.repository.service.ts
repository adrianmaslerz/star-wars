import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Planet, PlanetDocument } from './planet.schema';

@Injectable()
export class PlanetRepositoryService {
  constructor(@InjectModel(Planet.name) private model: Model<PlanetDocument>) {}
}
