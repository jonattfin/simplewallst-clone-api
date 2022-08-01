import { Test, TestingModule } from '@nestjs/testing';
import { PortfoliosResolver } from './portfolios.resolver';
import { PortfoliosService } from './portfolios.service';

describe('PortfoliosResolver', () => {
  let resolver: PortfoliosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortfoliosResolver, PortfoliosService],
    }).compile();

    resolver = module.get<PortfoliosResolver>(PortfoliosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
