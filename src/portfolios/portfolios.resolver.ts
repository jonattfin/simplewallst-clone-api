import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PortfoliosService } from './portfolios.service';
import { CreatePortfolioInput } from './dto/create-portfolio.input';
import { UpdatePortfolioInput } from './dto/update-portfolio.input';
import { Portfolio } from 'src/_shared/entities';

@Resolver(() => Portfolio)
export class PortfoliosResolver {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Mutation(() => Portfolio)
  createPortfolio(@Args('createPortfolioInput') createPortfolioInput: CreatePortfolioInput) {
    return this.portfoliosService.create(createPortfolioInput);
  }

  @Query(() => [Portfolio], { name: 'portfolios' })
  findAll() {
    return this.portfoliosService.findAll();
  }

  @Query(() => Portfolio, { name: 'portfolio' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.portfoliosService.findOne(id);
  }

  @Mutation(() => Portfolio)
  updatePortfolio(
    @Args('updatePortfolioInput') updatePortfolioInput: UpdatePortfolioInput,
  ) {
    return this.portfoliosService.update(
      updatePortfolioInput.id,
      updatePortfolioInput,
    );
  }

  @Mutation(() => Portfolio)
  removePortfolio(@Args('id', { type: () => Int }) id: number) {
    return this.portfoliosService.remove(id);
  }
}
