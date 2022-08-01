import { random, range } from 'lodash';

import {
  Company,
  News,
  Stock,
  Reward,
  Risk,
  Portfolio,
  // CompanyPortfolio,
} from 'src/_shared/entities';

export default class DbRepository {
  private readonly _company: Company;
  private readonly _portfolios: Portfolio[];

  constructor() {
    const companyId = 1;
    const companyName = 'ING Group';

    const stocks = createStocks(companyId);
    const risks = createRisks();
    const news = createNews(companyId);
    const competitors = createCompetitors(companyId);
    const snowflakeValueJson = generateSnowflakeValueJson('ticker');
    const radialBarValueJson = generateRadialBarData();

    this._company = createCompany({
      companyId,
      companyName,
      stocks,
      risks,
      competitors,
      news,
      snowflakeValueJson,
      radialBarValueJson,
    });

    this._portfolios = createPortfolios(competitors);
  }

  getCompany(id: number): Company {
    return this._company;
  }

  getPortfolios(): Portfolio[] {
    return this._portfolios;
  }

  getPortfolio(id: number): Portfolio {
    return this._portfolios.find((p) => p.id === id);
  }
}

function createPortfolios(companies: Company[]) {
  // const companiesPortfolios: CompanyPortfolio[] = companies.map(
  //   (company, index) => {
  //     return {
  //       company,
  //       id: index,
  //       holding: random(500, 1000),
  //       annualDividendContribution: random(10, 20),
  //       annualDividendYield: random(1, 7),
  //     };
  //   },
  // );

  const portfolios: Portfolio[] = [
    new Portfolio({
      id: 1,
      name: 'Accel Partners',
      image: '/forrest.jpg',
      created: new Date().toLocaleDateString(),
      description: '',
      snowflakeValueJson: JSON.stringify(generateSnowflakeValueJson('')),
      // companies: companiesPortfolios,
    }),
    new Portfolio({
      id: 2,
      name: 'ARK Investment Management',
      image: '/spiderweb.jpg',
      created: new Date().toLocaleDateString(),
      description: '',
      snowflakeValueJson: JSON.stringify(generateSnowflakeValueJson('')),
      // companies: companiesPortfolios,
    }),
    new Portfolio({
      id: 3,
      name: 'Bill & Melinda Gates Foundation',
      image: '/stock.jpg',
      created: new Date().toLocaleDateString(),
      description: '',
      snowflakeValueJson: JSON.stringify(generateSnowflakeValueJson('')),
      // companies: companiesPortfolios,
    }),
  ];

  return portfolios;
}

interface CompanyArguments {
  companyId: number;
  companyName: string;
  stocks?: Stock[];
  risks?: Risk[];
  competitors?: Company[];
  news?: News[];
  snowflakeValueJson: string;
  radialBarValueJson;
}

function createCompany({
  companyId,
  companyName,
  stocks,
  risks,
  competitors,
  news,
  snowflakeValueJson,
  radialBarValueJson,
}: CompanyArguments) {
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
    snowflakeValueJson,
    radialBarValueJson,
  });
}

function createCompetitors(companyId: number) {
  return [
    createCompany({
      companyId: companyId + 1,
      companyName: 'ABN AMRO Bank',
      stocks: createStocks(companyId + 1),
      snowflakeValueJson: generateSnowflakeValueJson('ABN AMRO Bank'),
      radialBarValueJson: generateRadialBarData(),
    }),

    createCompany({
      companyId: companyId + 2,
      companyName: 'Lloyds Banking Group',
      stocks: createStocks(companyId + 2),
      snowflakeValueJson: generateSnowflakeValueJson('Lloyds Banking Group'),
      radialBarValueJson: generateRadialBarData(),
    }),

    createCompany({
      companyId: companyId + 3,
      companyName: 'Oversea-Chinese Banking',
      stocks: createStocks(companyId + 3),
      snowflakeValueJson: generateSnowflakeValueJson('Oversea-Chinese Banking'),
      radialBarValueJson: generateRadialBarData(),
    }),

    createCompany({
      companyId: companyId + 4,
      companyName: 'Shanghai Development Bank',
      stocks: createStocks(companyId + 4),
      snowflakeValueJson: generateSnowflakeValueJson(
        'Shanghai Development Bank',
      ),
      radialBarValueJson: generateRadialBarData(),
    }),
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
      priceHistoryJson: JSON.stringify(generateHistory({ start: 9 })),
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
      description:
        'ING Groep N.V. commences an Equity Buyback Plan, under the authorization approved on April 25, 2022.',
    }),
  ];
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
