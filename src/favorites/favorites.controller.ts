import { Controller, Get, Post, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  addFavorite(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @Session() session: UserSession,
  ) {
    return this.favoritesService.addFavorite(
      createFavoriteDto,
      session.user.id,
    );
  }

  @Get()
  findMyFavorites(@Session() session: UserSession) {
    return this.favoritesService.findMyFavorites(session.user.id);
  }
}
