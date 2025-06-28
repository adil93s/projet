export abstract class AbstractModel {
  id?: string
  created_at?: Date
  updated_at?: Date

  protected constructor(id?: string, createdAt?: Date) {
    this.id = id
    this.created_at = createdAt
  }
}
