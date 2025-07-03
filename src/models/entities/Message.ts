import { AbstractModel } from './AbstractModel'

export class Message extends AbstractModel {
  subject?: string
  bodyPreview?: string
  from?: any
  toRecipients?: any[]
  ccRecipients?: any[]
  isRead?: boolean
  receivedDateTime?: string
  attachmentsCount?: number

  constructor(entity?: Partial<Message>) {
    super(entity?.id, entity?.created_at)
    Object.assign(this, entity)
  }
}
