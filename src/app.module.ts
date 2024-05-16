import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConnectionLink } from './modules/core/utils/get-mongo-connection-link';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterModule } from './modules/character/character.module';
import { EpisodesModule } from './modules/episode/episodes.module';
import { PlanetModule } from './modules/planet/planet.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: getMongoConnectionLink({
          host: config.get<string>('DB_HOST'),
          port: parseInt(config.get<string>('DB_PORT')),
          srv: Boolean(parseInt(config.get<string>('DB_SRV'))),
          user: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASSWORD'),
          database_name: config.get<string>('DB_DATABASE_NAME'),
        }),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 120,
      },
    ]),
    CharacterModule,
    EpisodesModule,
    PlanetModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
