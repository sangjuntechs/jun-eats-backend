/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { getConnection } from 'typeorm';
import * as request from 'supertest';

jest.mock('got', () => {
  return {
    post: jest.fn(),
  };
});

const testUser = {
  email: 'sangjun@naver.com',
  password: 'tkdwns12',
};

const GRAPHQL_ENDPOINT = '/graphql';

describe('UserModule (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    // 테스트 끝나기 전 데이터베이스 drop, 앱 닫기
    await getConnection().dropDatabase();
    app.close();
  });

  describe('createAccount', () => {
    it('계정 생성', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `mutation {
          createAccount(input:{
            email: "${testUser.email}",
            password: "${testUser.password}",
            role:Client
          }) {
            ok
            error
          }
        }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createAccount.ok).toBe(true);
          expect(res.body.data.createAccount.error).toBe(null);
        });
    });
    it('이미 계정이 있어서 생성 실패하는 경우', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `mutation {
          createAccount(input:{
            email: "${testUser.email}",
            password: "${testUser.password}",
            role:Client
          }) {
            ok
            error
          }
        }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createAccount.ok).toBe(false);
          expect(res.body.data.createAccount.error).toEqual(
            '같은 이메일이 이미 존재합니다.',
          );
        });
    });
  });

  describe('login', () => {
    it('적합한 로그인인 경우', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `mutation {
          login(input: {
            email: "${testUser.email}",
            password: "${testUser.password}"
          }) {
            ok
            error
            token
          }
        }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.login.ok).toBe(true);
          expect(res.body.data.login.error).toBe(null);
          expect(res.body.data.login.token).toEqual(expect.any(String));
          jwtToken = res.body.data.login.token;
        });
    });

    it('적합하지 않은 로그인인 경우', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `mutation {
          login(input: {
            email: "${testUser.email}",
            password: "xxx"
          }) {
            ok
            error
            token
          }
        }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.login.ok).toBe(false);
          expect(res.body.data.login.error).toBe(
            '비밀번호가 일치하지 않습니다.',
          );
          expect(res.body.data.login.token).toBe(null);
        });
    });
  });
  it.todo('userProfile');
  it.todo('me');
  it.todo('verifyEmail');
  it.todo('editProfile');
});
