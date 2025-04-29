import { BaseWorkerService } from './BaseWorkerService'

export class PaymentWorkerService extends BaseWorkerService {

  constructor({ db }: ServiceHandleWorkerEvent['context']) {
    super(db)
  }

  static handleWorkerEvent(ev: ServiceHandleWorkerEvent) {
    const { context, chan, payload } = ev
    const svc = new PaymentWorkerService(context)
    return svc.actions[chan].bind(svc).call(payload)
  }

  private actions = {}

}