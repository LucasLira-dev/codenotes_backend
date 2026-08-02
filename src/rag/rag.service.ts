import { Injectable, Logger } from '@nestjs/common';
import { PageIndexClient, PageIndexError } from '@pageindex/sdk';
import { Observable, Subscriber } from 'rxjs';

if (!process.env.PAGEINDEX_API_KEY) {
  throw new Error(
    'PAGEINDEX_API_KEY is not defined in the environment variables.',
  );
}

if (!process.env.PAGEINDEX_DOC_ID) {
  throw new Error(
    'PAGEINDEX_DOC_ID is not defined in the environment variables.',
  );
}

@Injectable()
export class RagService {
  private readonly logger = new Logger(RagService.name);
  private readonly client: PageIndexClient;
  private readonly doc_id: string;

  constructor() {
    this.client = new PageIndexClient({
      apiKey: process.env.PAGEINDEX_API_KEY || '',
    });
    this.doc_id = process.env.PAGEINDEX_DOC_ID || '';
  }

  askQuestion(pergunta: string): Observable<{ data: string }> {
    return new Observable((subscriber: Subscriber<{ data: string }>) => {
      this.client.api
        .chatCompletions({
          messages: [{ role: 'user', content: pergunta }],
          doc_id: this.doc_id,
          stream: true,
        })
        .then(async (stream) => {
          for await (const chunk of stream) {
            const content = chunk?.choices?.[0]?.delta?.content;
            if (content) {
              subscriber.next({ data: content });
            }
          }
          subscriber.complete();
        })
        .catch((error: PageIndexError) => {
          this.logger.error('Error while asking question:', error);
          subscriber.error(error);
        });
    });
  }
}
