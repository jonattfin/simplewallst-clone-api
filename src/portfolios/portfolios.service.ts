import { Injectable } from '@nestjs/common';
import DbRepository from 'src/_repository';
import { CreatePortfolioInput } from './dto/create-portfolio.input';
import { UpdatePortfolioInput } from './dto/update-portfolio.input';

@Injectable()
export class PortfoliosService {
  constructor(private repository: DbRepository) {}

  create(createPortfolioInput: CreatePortfolioInput) {
    return 'This action adds a new portfolio';
  }

  findAll() {
    return this.repository.getPortfolios();
  }

  findOne(id: number) {
    return this.repository.getPortfolio(id);
  }

  update(id: number, updatePortfolioInput: UpdatePortfolioInput) {
    return `This action updates a #${id} portfolio`;
  }

  remove(id: number) {
    return `This action removes a #${id} portfolio`;
  }
}
