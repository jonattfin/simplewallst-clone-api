import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './companies.resolver';
import DbRepository from 'src/_repository';

@Module({
  providers: [CompaniesResolver, CompaniesService, DbRepository]
})
export class CompaniesModule {}
