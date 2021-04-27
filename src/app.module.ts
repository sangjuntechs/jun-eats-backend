import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ResturantsModule } from './resturants/resturants.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sangjun',
      password: '0421',
      database: 'jun-eats',
      synchronize: true,
      logging: true,
    }),
    ResturantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
