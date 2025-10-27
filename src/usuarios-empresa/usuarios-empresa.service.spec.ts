import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosEmpresaService } from './usuarios-empresa.service';

describe('UsuariosEmpresaService', () => {
  let service: UsuariosEmpresaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosEmpresaService],
    }).compile();

    service = module.get<UsuariosEmpresaService>(UsuariosEmpresaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
