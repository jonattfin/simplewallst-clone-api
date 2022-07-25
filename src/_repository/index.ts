import { random } from 'lodash';

import {
  Company,
  News,
  Stock,
  StockPrice,
  Reward,
  Risk,
} from 'src/_shared/entities';

export default class DbRepository {
  private readonly _company: Company;

  constructor() {
    const companyId = 1;
    const companyName = 'ING Group';

    const stocks = createStocks(companyId);
    const risks = createRisks();
    const news = createNews(companyId);
    const competitors = createCompetitors(companyId);

    this._company = createCompany(
      companyId,
      companyName,
      stocks,
      risks,
      competitors,
      news,
    );
  }

  getCompany(id: number): Company {
    return this._company;
  }
}

function createCompany(
  companyId: number,
  companyName: string,
  stocks: Stock[] = [],
  risks: Risk[] = [],
  competitors: Company[] = [],
  news: News[] = [],
) {
  return new Company({
    id: companyId,
    name: companyName,
    description:
      'ING Groep N.V., a financial institution, provides various banking products and services in the Netherlands, Belgium, Germany, Poland, Rest of Europe, North America, Latin America, Asia, and Australia.',
    rewards: [
      new Reward({
        id: 1,
        description: 'Trading at 67% below our estimate of its fair value',
      }),
      new Reward({
        id: 2,
        description: 'Earnings are forecast to grow 12.35% per year',
      }),
      new Reward({
        id: 3,
        description: 'Earnings grew by 48.9% over the past year',
      }),
    ],
    risks,
    stocks,
    competitors,
    news,
  });
}

function createCompetitors(companyId: number) {
  return [
    createCompany(companyId + 1, 'ABN AMRO Bank', createStocks(companyId + 1)),
    createCompany(companyId + 2, 'Lloyds Banking Group', createStocks(companyId + 2)),
    createCompany(companyId + 3, 'Oversea-Chinese Banking ', createStocks(companyId + 3)),
    createCompany(companyId + 4, 'Shanghai Development Bank', createStocks(companyId + 4)),
  ];
}

function createStocks(companyId: number) {
  return [
    new Stock({
      id: random(1, 100),
      companyId,
      ticker: 'INGA',
      exchangeName: 'ENXTAM',
      lastPrice: random(10, 100),
      marketCap: random(50, 100),
      priceSevenDays: random(-10, 10),
      priceOneYear: random(-20, 20),
      lastUpdated: '20 Jul, 2022',
      priceHistory: [new StockPrice({ id: 1 })],
    }),
  ];
}

function createRisks() {
  return [new Risk({ id: 1, description: 'Unstable dividend track record' })];
}

function createNews(companyId: number) {
  return [
    new News({
      id: 1,
      companyId,
      date: new Date(2022, 5, 18).toDateString(),
      description: 'ING Groep N.V. commences an Equity Buyback Plan, under the authorization approved on April 25, 2022.',
    }),
  ];
}
