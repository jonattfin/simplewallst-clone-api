import { Company, News, Stock } from 'src/_shared/entities';

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
    });
  }

  _getStock(companyId: number) {
    return new Stock({
      id: 1,
      companyId,
      ticker: 'INGA',
      lastPrice: 9.18,
      marketCap: 34.2,
      priceSevenDays: 1.9,
      priceOneYear: -13.1,
      lastUpdated: '20 Jul, 2022',
    });
  }

  _getNews(companyId: number) {
    return new News({ id: 1, companyId, date: 'd1', text: 'a' });
  }
}
