import { Test } from '@nestjs/testing';
import { CONFIG_OPTIONS } from 'src/common/common.constant';
import { JwtService } from './jwt.service';

const TEST_KEY = 'testKey';

describe('JWT Service', () => {
  let service: JwtService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtService,
        {
          provide: CONFIG_OPTIONS,
          useValue: { privateKey: TEST_KEY },
        },
      ],
    }).compile();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    service = module.get<JwtService>(JwtService);
  });
  it('정의가 되는가', () => {
    expect(service).toBeDefined();
  });
  it.todo('sign');
  it.todo('verify');
});
