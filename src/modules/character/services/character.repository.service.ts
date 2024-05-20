import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from '../character.schema';
import { PaginationInputDTO } from '../../shared/dto/pagination.input.dto';
import { PaginationOutputDTO } from '../../shared/dto/pagination.output.dto';
import { paginate } from '../../shared/utils/paginate';
import { MongooseQueryInterface } from '../../shared/interfaces/mongoose-query.interface';

@Injectable()
export class CharacterRepositoryService {
  constructor(
    @InjectModel(Character.name) private model: Model<CharacterDocument>,
  ) {}

  public create(input: Character): Promise<CharacterDocument> {
    return this.model.create(input);
  }

  public findById(id: string): Promise<CharacterDocument> {
    return this.model.findById(id).populate(['episodes', 'planet']);
  }

  public update(
    document: CharacterDocument,
    input: Character,
  ): Promise<CharacterDocument> {
    document.set(input);
    return document.save();
  }

  public delete(id: string) {
    return this.model.deleteOne({ _id: id });
  }

  public paginate(
    query: MongooseQueryInterface,
    input: PaginationInputDTO,
  ): Promise<PaginationOutputDTO<CharacterDocument>> {
    return paginate<CharacterDocument>(this.model, query, input);
  }
}
