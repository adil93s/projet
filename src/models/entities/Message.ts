import { AbstractModel } from './AbstractModel'

export class Message extends AbstractModel {
  subject?: string
  bodyPreview?: string
  from?: any
  toRecipients?: any[]
  ccRecipients?: any[]
  isRead?: boolean
  receivedDateTime?: string
  sentDateTime?: string
  flag?: any
  attachmentsCount?: number

  constructor(entity?: Partial<Message>) {
    super(entity?.id, entity?.created_at)
    Object.assign(this, entity)
  }
}
