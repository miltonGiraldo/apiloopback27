import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Encomienda} from './encomienda.model';

@model()
export class Servicios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  origen: string;

  @property({
    type: 'string',
    required: true,
  })
  destino: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  hora: string;

  @property({
    type: 'string',
    required: true,
  })
  encomienda: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => Encomienda)
  encomiendaId: string;

  constructor(data?: Partial<Servicios>) {
    super(data);
  }
}

export interface ServiciosRelations {
  // describe navigational properties here
}

export type ServiciosWithRelations = Servicios & ServiciosRelations;
