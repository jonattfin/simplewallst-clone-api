import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Company {
  @Field(() => Int)
  id: number;

  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field(() => [Reward], { nullable: false })
  readonly rewards: Reward[];

  @Field(() => [Risk], { nullable: false })
  readonly risks: Risk[];

  @Field(() => [Stock], { nullable: false })
  readonly stocks: Stock[];

  @Field(() => [Company], { nullable: false })
  readonly competitors: Company[];

  @Field(() => [News], { nullable: false })
  readonly news: News[];

  @Field()
  readonly snowflakeValueJson: string;

  @Field()
  readonly radialBarValueJson: string;

  constructor({
    id,
    name,
    description,
    rewards,
    risks,
    stocks,
    competitors,
    news,
    snowflakeValueJson,
    radialBarValueJson,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.rewards = rewards;
    this.risks = risks;
    this.stocks = stocks;
    this.competitors = competitors;
    this.news = news;
    this.snowflakeValueJson = snowflakeValueJson;
    this.radialBarValueJson = radialBarValueJson;
  }
}

@ObjectType()
export class Reward {
  @Field(() => Int)
  id: number;

  @Field()
  readonly description: string;

  constructor({ id, description }) {
    this.id = id;
    this.description = description;
  }
}

@ObjectType()
export class Risk {
  @Field(() => Int)
  id: number;

  @Field()
  readonly description: string;

  constructor({ id, description }) {
    this.id = id;
    this.description = description;
  }
}

@ObjectType()
export class Stock {
  @Field(() => Int)
  id: number;

  @Field()
  companyId: number;

  @Field()
  readonly ticker: string;

  @Field()
  readonly exchangeName: string;

  @Field()
  readonly lastPrice: number;

  @Field()
  readonly marketCap: number;

  @Field()
  readonly priceSevenDays: number;

  @Field()
  readonly priceOneYear: number;

  @Field()
  readonly lastUpdated: string;

  @Field()
  readonly priceHistoryJson: string;

  constructor({
    id,
    companyId,
    ticker,
    exchangeName,
    lastPrice,
    marketCap,
    priceSevenDays,
    priceOneYear,
    lastUpdated,
    priceHistoryJson,
  }) {
    this.id = id;
    this.companyId = companyId;
    this.ticker = ticker;
    this.exchangeName = exchangeName;
    this.lastPrice = lastPrice;

    this.marketCap = marketCap;
    this.priceOneYear = priceOneYear;
    this.priceSevenDays = priceSevenDays;
    this.lastUpdated = lastUpdated;
    this.priceHistoryJson = priceHistoryJson;
  }
}

@ObjectType()
export class News {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  companyId: number;

  @Field()
  readonly date: string;

  @Field()
  readonly description: string;

  constructor({ id, companyId, date, description }) {
    this.id = id;
    this.companyId = companyId;
    this.date = date;
    this.description = description;
  }
}

@ObjectType()
export class Portfolio {
  @Field(() => Int)
  id: number;

  @Field()
  readonly name: string;

  @Field()
  readonly image: string;

  @Field()
  readonly created: string;

  @Field()
  readonly description: string;

  @Field()
  readonly snowflakeValueJson: string;

  constructor({ id, name, image, created, description, snowflakeValueJson }) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.created = created;
    this.description = description;
    this.snowflakeValueJson = snowflakeValueJson;
  }

  // @Field(() => [CompanyPortfolio], { nullable: false })
  // readonly companies: CompanyPortfolio[];
}

// @ObjectType()
// export class CompanyPortfolio {
//   @Field(() => Int)
//   id: number;

//   @Field(() => Int)
//   holding: number;

//   @Field(() => Int)
//   annualDividendYield: number;

//   @Field(() => Int)
//   annualDividendContribution: number;

//   @Field()
//   readonly company: Company;
// }
