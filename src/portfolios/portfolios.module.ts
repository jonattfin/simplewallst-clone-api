import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosResolver } from './portfolios.resolver';
import DbRepository from 'src/_repository';

@Module({
  providers: [PortfoliosResolver, PortfoliosService, DbRepository]
})
export class PortfoliosModule {}
