import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Company {
  @Field(() => Int)
  id: number;

  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  constructor({ id, name, description }) {
    this.id = id;
    this.name = name;
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
  readonly lastPrice: number;

  @Field()
  readonly marketCap: number;

  @Field()
  readonly priceSevenDays: number;

  @Field()
  readonly priceOneYear: number;

  @Field()
  readonly lastUpdated: string;

  constructor({
    id,
    companyId,
    ticker,
    lastPrice,
    marketCap,
    priceSevenDays,
    priceOneYear,
    lastUpdated,
  }) {
    this.id = id;
    this.companyId = companyId;
    this.ticker = ticker;
    this.lastPrice = lastPrice;
    this.marketCap = marketCap;
    this.priceOneYear = priceOneYear;
    this.priceSevenDays = priceSevenDays;
    this.lastUpdated = lastUpdated;
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
  readonly text: string;

  constructor({
    id,
    companyId,
    date,
    text,
  }) {
    this.id = id;
    this.companyId = companyId;
    this.date = date;
    this.text = text;
  }
}
