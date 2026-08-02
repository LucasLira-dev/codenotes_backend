import { BadRequestException, Controller, Query, Sse } from '@nestjs/common';
import { RagService } from './rag.service';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@AllowAnonymous()
@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @Sse('ask')
  askQuestion(@Query('pergunta') pergunta: string) {
    if (!pergunta || pergunta.trim().length === 0) {
      throw new BadRequestException('Pergunta é obrigatória');
    }
    return this.ragService.askQuestion(pergunta);
  }
}
