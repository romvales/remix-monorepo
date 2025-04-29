import { ResortoCoreWorkerMessageChannel } from '@resorto/core.worker/message'
import { BaseWorkerService } from './BaseWorkerService'


export class InternalWorkerService extends BaseWorkerService {

  constructor({ db }: ServiceHandleWorkerEvent['context']) {
    super(db)
  }

  static handleWorkerEvent(ev: ServiceHandleWorkerEvent<
    ResortoCoreWorkerMessageChannel.WORKER_CREATE |
    ResortoCoreWorkerMessageChannel.WORKER_DELETE |
    ResortoCoreWorkerMessageChannel.WORKER_SAVE |
    ResortoCoreWorkerMessageChannel.TASK_CREATE |
    ResortoCoreWorkerMessageChannel.TASK_DELETE |
    ResortoCoreWorkerMessageChannel.TASK_SAVE
  >) {
    const { context, chan, payload } = ev
    const svc = new InternalWorkerService(context)
    return svc.actions[chan].bind(svc).call(payload)
  }

  private actions = {}

}