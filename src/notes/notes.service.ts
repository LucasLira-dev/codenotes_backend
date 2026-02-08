import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotesService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createNoteDto: CreateNoteDto, userId: string) {
     const note = await this.prisma.notes.create({
      data: {
        ...createNoteDto,
        authorId: userId,
      },
    });

    return {
      message: 'Nota criada com sucesso',
      note,
    };
  }

  async findMyNotes(userId: string) {
    return await this.prisma.notes.findMany({
      where: {
        authorId: userId,
      },
      orderBy: { createdAt: 'desc' }
    })
  }

  async findPublicNotes() {
    const notes = await this.prisma.notes.findMany({
      where: {
        isPublic: true,
      },
      include: {
        author: true,
      },
    });

    return notes;
  }

  async findOne(id: string) {
    const note = await this.prisma.notes.findFirst({
      where: {
        id,
      }
    })

    if (!note){
      throw new NotFoundException('Note not found!')
    }

    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, userId: string) {
    const existingNote = await this.prisma.notes.findUnique({
      where: {
        id,
      },
    });

    if (!existingNote){
      throw new NotFoundException('Note not found!')
    }

    if (existingNote.authorId !== userId){
      throw new ForbiddenException('You do not have permission to update this note.')
    }

    return await this.prisma.notes.update({
      where: { id },
      data: updateNoteDto,
    });
  }

  async updateVisibility(noteId: string, isPublic: boolean, userId: string) {
    const existingNote = await this.prisma.notes.findUnique({
      where: { id: noteId },
    });

    if (!existingNote) {
      throw new NotFoundException('Note not found!');
    }
    if (existingNote.authorId !== userId) {
      throw new ForbiddenException('You cannot update the visibility of a note that is not yours.');
    }

    return await this.prisma.notes.update({
      where: { id: noteId },
      data: { isPublic },
    });
  }

  async remove(id: string, userId: string) {
    const existingNote = await this.prisma.notes.findFirst({
      where: { id, authorId: userId },
    });

    if (!existingNote) {
      throw new NotFoundException('Note not found!');
    }

    await this.prisma.notes.delete({
      where: {
        id,
      }
    })

    return {
      message: 'Note deleted with sucessfull!'
    }
  }
}
