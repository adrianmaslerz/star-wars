import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Episode, EpisodeDocument } from './episode.schema';

@Injectable()
export class EpisodeRepositoryService {
  constructor(
    @InjectModel(Episode.name) private model: Model<EpisodeDocument>,
  ) {}

  public async findBy(criteria: any): Promise<EpisodeDocument[]> {
    return this.model.find(criteria);
  }
}
