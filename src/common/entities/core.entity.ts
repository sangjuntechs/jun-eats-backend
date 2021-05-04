/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CoreEntity {
  @Field((type) => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Date)
  @CreateDateColumn()
  createAt: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updateAt: Date;
}