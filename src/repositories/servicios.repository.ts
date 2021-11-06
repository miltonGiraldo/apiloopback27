import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Servicios, ServiciosRelations, Encomienda} from '../models';
import {EncomiendaRepository} from './encomienda.repository';

export class ServiciosRepository extends DefaultCrudRepository<
  Servicios,
  typeof Servicios.prototype.id,
  ServiciosRelations
> {

  public readonly encomienda: BelongsToAccessor<Encomienda, typeof Servicios.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('EncomiendaRepository') protected encomiendaRepositoryGetter: Getter<EncomiendaRepository>,
  ) {
    super(Servicios, dataSource);
    this.encomienda = this.createBelongsToAccessorFor('encomienda', encomiendaRepositoryGetter,);
    this.registerInclusionResolver('encomienda', this.encomienda.inclusionResolver);
  }
}
