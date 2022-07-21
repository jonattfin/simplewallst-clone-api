import { Injectable } from '@nestjs/common';
import DbRepository from 'src/_repository';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';

@Injectable()
export class NewsService {
  constructor(private repository: DbRepository) {}

  create(createNewsInput: CreateNewsInput) {
    return 'This action adds a new news';
  }

  findAll() {
    return `This action returns all news`;
  }

  findOne(id: number) {
    return this.repository.getNews();
  }

  update(id: number, updateNewsInput: UpdateNewsInput) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
