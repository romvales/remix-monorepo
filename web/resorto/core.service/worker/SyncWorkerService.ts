import { BaseWorkerService } from './BaseWorkerService'

export class SyncWorkerService extends BaseWorkerService {

  constructor({ db }: ServiceHandleWorkerEvent['context']) {
    super(db)
  }

  static handleWorkerEvent(ev: ServiceHandleWorkerEvent) {
    const { context, chan, payload } = ev
    const svc = new SyncWorkerService(context)

  }

  private actions = {}

}