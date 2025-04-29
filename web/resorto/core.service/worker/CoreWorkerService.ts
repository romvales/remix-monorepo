import { BaseWorkerService } from './BaseWorkerService'

export class CoreWorkerService extends BaseWorkerService {

  constructor({ db }: ServiceHandleWorkerEvent['context']) {
    super(db)
  }

  static handleWorkerEvent(ev: ServiceHandleWorkerEvent) {
    const { context, chan, payload } = ev
    const svc = new CoreWorkerService(context)

  }

  private actions = {}
  
}