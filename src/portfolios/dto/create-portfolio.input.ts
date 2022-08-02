import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePortfolioInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  currency: string;
}
