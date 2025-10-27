import { Module } from '@nestjs/common';
import { UsuariosEmpresaService } from './usuarios-empresa.service';
import { UsuariosEmpresaController } from './usuarios-empresa.controller';

@Module({
  providers: [UsuariosEmpresaService],
  controllers: [UsuariosEmpresaController]
})
export class UsuariosEmpresaModule {}
