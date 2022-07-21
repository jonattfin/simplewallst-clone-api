import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksResolver } from './stocks.resolver';
import DbRepository from 'src/_repository';

@Module({
  providers: [StocksResolver, StocksService, DbRepository]
})
export class StocksModule {}
