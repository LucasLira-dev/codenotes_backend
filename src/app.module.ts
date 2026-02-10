import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth/auth.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule.forRoot({ auth }),
    ConfigModule.forRoot({ isGlobal: true }),
    NotesModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
