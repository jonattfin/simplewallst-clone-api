import { Injectable } from '@nestjs/common';
import DbRepository from 'src/_repository';

import { CreateStockInput } from './dto/create-stock.input';
import { UpdateStockInput } from './dto/update-stock.input';

@Injectable()
export class StocksService {
  constructor(private repository: DbRepository) {}

  create(createStockInput: CreateStockInput) {
    return 'This action adds a new stock';
  }

  findAll() {
    return `This action returns all stocks`;
  }

  findOne(id: number) {
    return this.repository.getStock(id);
  }

  update(id: number, updateStockInput: UpdateStockInput) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
