import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UpdateVisibilityDto } from './dto/update-visibility.dto';
import { AllowAnonymous, Session, type UserSession } from '@thallesp/nestjs-better-auth';


@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(
    @Body() createNoteDto: CreateNoteDto,
    @Session() session: UserSession,
    )
     {
    return this.notesService.create(createNoteDto, session.user.id);
  }

  @Get()
  findMyNotes(
    @Session() session: UserSession,
  ) {
    return this.notesService.findMyNotes(session.user.id)
  }

  @Get('publicNotes')
  @AllowAnonymous()
  findAllPublicNotes(@Session({ optional: true }) session?: UserSession) {
    return this.notesService.findPublicNotes(session?.user?.id);
  }

  @Patch(':id/visibility')
  updateVisibility(
    @Param('id') id: string,
    @Body() dto: UpdateVisibilityDto,
    @Session() session: UserSession,
  ) {
    return this.notesService.updateVisibility(id, dto.isPublic, session.user.id);
  }

  @Get('search')
  searchNotes(
    @Query('search') search: string,
    @Session() session: UserSession,
  ) {
    return this.notesService.searchNotes(search, session?.user?.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateNoteDto: UpdateNoteDto,
    @Session() session: UserSession,
  ) {
    return this.notesService.update(id, updateNoteDto, session.user.id);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Session() session: UserSession,
  ) {
    return this.notesService.remove(id, session.user.id);
  }
}
