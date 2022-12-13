import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from './companies/companies.module';
import { PortfoliosModule } from './portfolios/portfolios.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: './graphql/schema.gql',
      driver: ApolloDriver,
      cache: 'bounded',
      cors: {
        origin: "https://www.codeplaybook.com",
      }
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   port: 3306,
    //   ...getConnection(),
    //   entities: [],
    //   // synchronize: true,
    // }),
    CompaniesModule,
    PortfoliosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// function getConnection() {
//   return {
//     host: process.env.DB_HOST,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//   };
// }
