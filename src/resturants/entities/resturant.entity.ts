import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Resturant {
  @Field(() => String)
  name: string;
  @Field(() => Boolean, { nullable: true })
  isGood?: boolean;
}
