import { Injectable } from '@nestjs/common';
import { MongooseQueryInterface } from '../../shared/interfaces/mongoose-query.interface';

@Injectable()
export class CharacterQueryService {
  public getCharactersQuery(): MongooseQueryInterface {
    const pipeline = [
      {
        $lookup: {
          from: 'episodes',
          as: 'episodes',
          let: { foreignId: '$episodes' },
          pipeline: [
            {
              $match: { $expr: { $in: ['$_id', '$$foreignId'] } },
            },
            {
              $project: {
                name: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'planets',
          as: 'planet',
          let: { foreignId: '$planet' },
          pipeline: [
            {
              $match: { $expr: { $eq: ['$_id', '$$foreignId'] } },
            },
            {
              $project: {
                name: 1,
              },
            },
          ],
        },
      },
      { $unwind: { path: '$planet', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          name: 1,
          episodes: 1,
          planet: 1,
        },
      },
    ];

    //sorts
    const options = {
      sort: { name: 1, _id: 1 },
    };

    return { pipeline, options };
  }
}
