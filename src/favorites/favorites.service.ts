import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async addFavorite(dto: CreateFavoriteDto, userId: string) {
    const note = await this.prisma.notes.findUnique({
      where: { id: dto.noteId },
    });
    if (!note) {
      throw new NotFoundException('Note not found!');
    }

    const existing = await this.prisma.favorite.findFirst({
      where: {
        userId,
        noteId: dto.noteId,
      },
    });
    
    if (existing) {
      throw new ConflictException('This note is already in your favorites.');
    }

    const favorite = await this.prisma.favorite.create({
      data: {
        userId,
        noteId: dto.noteId,
      },
      include: {
        note: true,
      },
    });

    return {
      message: 'Nota adicionada aos favoritos',
      favorite,
    };
  }

  async findMyFavorites(userId: string) {
    return await this.prisma.favorite.findMany({
      where: { userId },
      include: {
        note: {
          include: {
            author: {
              select: { id: true, name: true, image: true },
            },
          },
        },
      },
      orderBy: { id: 'desc' },
    });
  }
}
