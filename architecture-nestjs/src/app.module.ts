import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoModule from './repo.module';
import { GraphQLModule } from '@nestjs/graphql';
import AuthorResolver from './resolvers/author.resolver';
import { genreBooksLoader } from './db/loaders/books.loader';
const path = require('path');

const graphQLImports = [AuthorResolver];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.resolve(__dirname, '../data/dev.db'),
      entities: ["dist/**/*.entity{.ts,.js}"], 
      logging: true,
      synchronize: true,
    }),
    RepoModule,
    ...graphQLImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      context: {
        genreBooksLoader: genreBooksLoader(),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
