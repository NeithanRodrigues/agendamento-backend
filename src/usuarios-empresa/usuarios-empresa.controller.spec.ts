import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosEmpresaController } from './usuarios-empresa.controller';

describe('UsuariosEmpresaController', () => {
  let controller: UsuariosEmpresaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosEmpresaController],
    }).compile();

    controller = module.get<UsuariosEmpresaController>(UsuariosEmpresaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
