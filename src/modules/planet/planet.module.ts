import { Module } from '@nestjs/common';
import { PlanetRepositoryService } from './planet.repository.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Planet, PlanetSchema } from './planet.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Planet.name,
        useFactory: () => {
          return PlanetSchema;
        },
      },
    ]),
  ],
  providers: [PlanetRepositoryService],
})
export class PlanetModule {}
