import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsResolver } from './news.resolver';
import DbRepository from 'src/_repository';

@Module({
  providers: [NewsResolver, NewsService, DbRepository]
})
export class NewsModule {}
