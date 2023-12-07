import { Test, TestingModule } from '@nestjs/testing';
import { GangController } from './gang.controller';

describe('GangController', () => {
  let controller: GangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GangController],
    }).compile();

    controller = module.get<GangController>(GangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
