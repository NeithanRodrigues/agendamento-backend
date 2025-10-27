import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { UsuariosEmpresaModule } from './usuarios-empresa/usuarios-empresa.module';
import { ComerciosModule } from './comercios/comercios.module';
import { ServicosModule } from './servicos/servicos.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { HorariosModule } from './horarios/horarios.module';
import { AvaliacoesModule } from './avaliacoes/avaliacoes.module';

@Module({
  imports: [AuthModule, ClientesModule, UsuariosEmpresaModule, ComerciosModule, ServicosModule, FuncionariosModule, AgendamentosModule, HorariosModule, AvaliacoesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
