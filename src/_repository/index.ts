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
  private readonly _stock: Stock;
  private readonly _news: News;

  constructor() {
    this._company = this._getCompany();
    this._stock = this._getStock(this._company.id);
    this._news = this._getNews(this._company.id);
  }

  getCompany(id: number): Company {
    return this._company;
  }

  getStock(id: number): Stock {
    return this._stock;
  }

  getNews(): News {
    return this._news;
  }

  _getCompany() {
    return new Company({
      id: 1,
      name: 'ING Groep',
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
      risks: [
        new Risk({ id: 1, description: 'Unstable dividend track record' }),
      ],
    });
  }

  _getStock(companyId: number) {
    return new Stock({
      id: 1,
      companyId,
      ticker: 'INGA',
      exchangeName: 'ENXTAM',
      lastPrice: 9.18,
      marketCap: 34.2,
      priceSevenDays: 1.9,
      priceOneYear: -13.1,
      lastUpdated: '20 Jul, 2022',
      // history: [new StockPrice({ id: 1 })],
    });
  }

  _getNews(companyId: number) {
    return new News({
      id: 1,
      companyId,
      date: new Date(2022, 5, 18).toDateString(),
      text: 'ING Groep N.V. commences an Equity Buyback Plan, under the authorization approved on April 25, 2022.',
    });
  }
}
