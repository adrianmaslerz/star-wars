import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Episode, EpisodeSchema } from './episode.schema';
import { EpisodeRepositoryService } from './episode.repository.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Episode.name,
        useFactory: () => {
          return EpisodeSchema;
        },
      },
    ]),
  ],
  providers: [EpisodeRepositoryService],
  exports: [ EpisodeRepositoryService ]
})
export class EpisodeModule {}
