import { Test, TestingModule } from '@nestjs/testing';
import { RecoController } from './reco.controller';

describe('RecoController', () => {
  let controller: RecoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecoController],
    }).compile();

    controller = module.get<RecoController>(RecoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
