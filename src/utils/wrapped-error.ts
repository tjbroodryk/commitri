export class WrappedError extends Error {
  public readonly originalError: Error
  public readonly originalStack?: string

  constructor(message: string, error: any){
    super(message)
    this.name = this.constructor.name
    this.originalError = error
    this.originalStack = super.stack
    const message_lines =  (this.message.match(/\n/g)||[]).length + 1
    this.stack = super.stack?.split('\n').slice(0, message_lines+1).join('\n') + '\n' + error.stack
  }
}