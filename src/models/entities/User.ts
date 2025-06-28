import { AbstractModel } from './AbstractModel'

export class User extends AbstractModel {
  name?: string
  email?: string
  phone_number?: string
  token?: string
  token_graph?: string
  photo_url?: string

  constructor(entity?: Partial<User>) {
    super(entity?.id, entity?.created_at)
    Object.assign(this, entity)
  }

  get initials(): string | null {
    return this.name?.[0] ?? null
  }
}
