import { Injectable } from '@nestjs/common';
import DbRepository from 'src/_repository';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';

@Injectable()
export class CompaniesService {
  constructor(private repository: DbRepository) {}

  create(createCompanyInput: CreateCompanyInput) {
    return 'This action adds a new company';
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return this.repository.getCompany(id);
  }

  update(id: number, updateCompanyInput: UpdateCompanyInput) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
