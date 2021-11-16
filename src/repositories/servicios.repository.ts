import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Servicios, ServiciosRelations, Encomienda, Cliente} from '../models';
import {EncomiendaRepository} from './encomienda.repository';
import {ClienteRepository} from './cliente.repository';

export class ServiciosRepository extends DefaultCrudRepository<
  Servicios,
  typeof Servicios.prototype.id,
  ServiciosRelations
> {

  public readonly encomiendafk: BelongsToAccessor<Encomienda, typeof Servicios.prototype.id>;

  public readonly origenfk: BelongsToAccessor<Cliente, typeof Servicios.prototype.id>;

  public readonly destinofk: BelongsToAccessor<Cliente, typeof Servicios.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('EncomiendaRepository') protected encomiendaRepositoryGetter: Getter<EncomiendaRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Servicios, dataSource);
    this.destinofk = this.createBelongsToAccessorFor('destinofk', clienteRepositoryGetter,);
    this.registerInclusionResolver('destinofk', this.destinofk.inclusionResolver);
    this.origenfk = this.createBelongsToAccessorFor('origenfk', clienteRepositoryGetter,);
    this.registerInclusionResolver('origenfk', this.origenfk.inclusionResolver);
    this.encomiendafk = this.createBelongsToAccessorFor('encomiendafk', encomiendaRepositoryGetter,);
    this.registerInclusionResolver('encomiendafk', this.encomiendafk.inclusionResolver);

  }
}
