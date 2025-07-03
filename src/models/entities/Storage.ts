import { AbstractModel } from './AbstractModel'

export class Storage extends AbstractModel {
  used?: number
  remaining?: number
  deleted?: number
  total?: number
  state?: string

  constructor(entity?: Partial<Storage>) {
    super(entity?.id, entity?.created_at)
    Object.assign(this, entity)
  }
}
