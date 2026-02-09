import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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

    if (!note.isPublic && note.authorId !== userId) {
      throw new NotFoundException('Note not found or is private!');
    }

    const existing = await this.prisma.favorite.findFirst({
      where: {
        userId,
        noteId: dto.noteId,
      },
    });
    
    // Toggle behavior: if already favorited, remove it
    if (existing) {
      await this.prisma.favorite.delete({
        where: { id: existing.id },
      });

      return {
        message: 'Note removed from favorites successfully!',
        isFavorited: false,
      };
    }

    if(!note.isPublic) {
      throw new UnauthorizedException('You are not authorized to favorite this note.');
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
      message: 'Note added to favorites successfully!',
      favorite,
      isFavorited: true,
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
