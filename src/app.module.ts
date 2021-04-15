import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ResturantsModule } from './resturants/resturants.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    ResturantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
