import _ from 'lodash';
import { random, range } from 'lodash';
import { faker } from '@faker-js/faker';

import {
  Company,
  News,
  Stock,
  Risk,
  Portfolio,
  CompanyPortfolio,
  // CompanyPortfolio,
} from 'src/_shared/entities';

export default class DbRepository {
  private readonly _portfolios: Portfolio[] = [];
  private readonly _companies: Company[] = [];

  constructor() {
    this._companies = range(1, 10).map((element) => {
      return createCompany({
        companyId: element,
        companyName: faker.company.companyName(),
        competitors: createCompetitors(element),
      });
    });
    this._portfolios = createPortfolios(this._companies);
  }

  getCompanies() {
    return this._companies;
  }

  getCompany(id: number): Company {
    return this._companies.find((c) => c.id == id);
  }

  getPortfolios() {
    return this._portfolios;
  }

  getPortfolio(id: number) {
    return this._portfolios.find((p) => p.id === id);
  }

  addPortfolio(name: string, currency: string) {
    const portfolio = {
      id: random(10, 100),
      name,
      currency,
      image: '/forrest.jpg',
      created: new Date().toLocaleDateString(),
      description: '',
      snowflakeValueJson: generateSnowflakeValueJson(''),
      companies: [],
    };

    this._portfolios.push(portfolio);
    console.log(`portfolio with name ${name} was added`);

    return portfolio;
  }
}

function createPortfolios(companies: Company[]): Portfolio[] {
  const companiesPortfolios: CompanyPortfolio[] = companies.map(
    (company, index) => {
      return {
        company,
        id: index,
        holding: random(500, 1000),
        annualDividendContribution: random(10, 20),
        annualDividendYield: random(1, 7),
      };
    },
  );

  return [
    {
      id: 1,
      name: 'Accel Partners',
      image: '/forrest.jpg',
      currency: 'USD',
      created: new Date().toLocaleDateString(),
      description: '',
      snowflakeValueJson: generateSnowflakeValueJson(''),
      companies: companiesPortfolios,
    },
    {
      id: 2,
      name: 'ARK Investment Management',
      currency: 'USD',
      image: '/spiderweb.jpg',
      created: new Date().toLocaleDateString(),
      description: '',
      snowflakeValueJson: generateSnowflakeValueJson(''),
      companies: companiesPortfolios,
    },
    {
      id: 3,
      name: 'Bill & Melinda Gates Foundation',
      currency: 'USD',
      image: '/stock.jpg',
      created: new Date().toLocaleDateString(),
      description: '',
      snowflakeValueJson: generateSnowflakeValueJson(''),
      companies: companiesPortfolios,
    },
  ];
}

function createCompany({
  companyId,
  companyName,
  competitors,
}: {
  companyId: number;
  companyName: string;
  competitors: Company[];
}) : Company {
  const stocks = createStocks({ companyId, companyName });
  const risks = createRisks();
  const news = createNews({ companyId, companyName });
  const snowflakeValueJson = generateSnowflakeValueJson(companyName);
  const radialBarValueJson = generateRadialBarData();

  return {
    id: companyId,
    name: companyName,
    description: `${companyName}, a financial institution, provides various banking products and services in the Netherlands, Belgium, Germany, Poland, Rest of Europe, 
      North America, Latin America, Asia, and Australia.`,
    rewards: [
      {
        id: 1,
        description: 'Trading at 67% below our estimate of its fair value',
      },
      {
        id: 2,
        description: 'Earnings are forecast to grow 12.35% per year',
      },
      {
        id: 3,
        description: 'Earnings grew by 48.9% over the past year',
      },
    ],
    risks,
    stocks,
    competitors,
    news,
    snowflakeValueJson,
    radialBarValueJson,
  };
}

function createCompetitors(companyId: number) : Company[] {
  return [
    createCompany({
      companyId: companyId + 1,
      companyName: 'ABN AMRO Bank',
      competitors: [],
    }),

    createCompany({
      companyId: companyId + 2,
      companyName: 'Lloyds Banking Group',
      competitors: [],
    }),

    createCompany({
      companyId: companyId + 3,
      companyName: 'Oversea-Chinese Banking',
      competitors: [],
    }),

    createCompany({
      companyId: companyId + 4,
      companyName: 'Shanghai Development Bank',
      competitors: [],
    }),
  ];
}

function createStocks({
  companyId,
  companyName,
}: {
  companyId: number;
  companyName: string;
}): Stock[] {
  return [
    {
      id: random(1, 100),
      companyId,
      ticker: companyName.substring(0, 4).toUpperCase(),
      exchangeName: 'ENXTAM',
      lastPrice: random(10, 100),
      marketCap: random(50, 100),
      priceSevenDays: random(-10, 10),
      priceOneYear: random(-20, 20),
      lastUpdated: '20 Jul, 2022',
      priceHistoryJson: JSON.stringify(generateHistory({ start: 9 })),
    },
  ];
}

function createRisks(): Risk[] {
  return [{ id: 1, description: 'Unstable dividend track record' }];
}

function createNews({
  companyId,
  companyName,
}: {
  companyId: number;
  companyName: string;
}): News[] {
  const news = range(1, 5).map((element) => {
    const date = faker.date.past().toDateString();

    return {
      id: element,
      companyId,
      date,
      description: `${companyName} commences an Equity Buyback Plan, under the authorization approved on ${date}`,
    };
  });

  return news;
}

interface IHistoryData {
  start: number;
  dimensions?: number;
  numberOfYears?: number;
}

function generateHistory(historyData: IHistoryData) {
  if (!historyData.dimensions) {
    historyData.dimensions = 1;
  }

  if (!historyData.numberOfYears) {
    historyData.numberOfYears = 1;
  }

  return range(0, historyData.dimensions).map((item) => {
    return {
      id: `INGB ${item}`,
      data: getData(historyData),
    };
  });
}

function getData(historyData: IHistoryData) {
  const years = range(0, historyData.numberOfYears)
    .map((year) => 2022 - year)
    .sort((a, b) => a - b);

  const months = range(1, 12);
  const days = range(1, 28, 5);

  const randomValue = historyData.start * 0.4;

  const data: any = [];

  years.forEach((year) => {
    months.forEach((month) => {
      days.forEach((day) => {
        const obj = {
          x: `${year}-${month}-${day}`,
          y: (historyData.start + random(-randomValue, randomValue)).toFixed(2),
        };
        data.push(obj);
      });
    });
  });

  return data;
}

function generateSnowflakeValueJson(ticker: string | undefined): string {
  if (!ticker) {
    ticker = 'RandomTicker';
  }

  const tickers = [ticker];
  const values = ['value', 'future', 'past', 'health', 'dividend'];

  const data = values.map((value) => {
    const d: Record<string, unknown> = { value };
    tickers.forEach((tickerValue) => {
      d[tickerValue] = random(2, 6);
    });

    return d;
  });

  return JSON.stringify({ data, keys: tickers });
}

function generateRadialBarData() {
  const value = [
    {
      id: 'Earnings',
      data: [
        {
          x: 'Value',
          y: 4.2,
        },
      ],
    },
    {
      id: 'Revenue',
      data: [
        {
          x: 'Value',
          y: 17.04,
        },
      ],
    },
    {
      id: 'Market Cap',
      data: [
        {
          x: 'Value',
          y: 34.48,
        },
      ],
    },
  ];

  return JSON.stringify(value);
}
