import { ResortoCoreWorkerMessageChannel } from '@resorto/core.worker/message'
import { BaseWorkerService } from './BaseWorkerService'

export class SecurityWorkerService extends BaseWorkerService {

  constructor({ db }: ServiceHandleWorkerEvent['context']) {
    super(db)
  }

  login() {

  }

  signup() {

  }

  logout() {

  }

  static handleWorkerEvent(ev: ServiceHandleWorkerEvent<
    ResortoCoreWorkerMessageChannel.CREATE_ACCOUNT |
    ResortoCoreWorkerMessageChannel.LOGIN_ACCOUNT |
    ResortoCoreWorkerMessageChannel.LOGOUT |
    ResortoCoreWorkerMessageChannel.DEVICE_INFO |
    ResortoCoreWorkerMessageChannel.GET_DEVICES
  >) {
    const { context, chan, payload } = ev
    const svc = new SecurityWorkerService(context)
    return svc.actions[chan].bind(svc).call(payload)
  }

  private actions = {
    [ResortoCoreWorkerMessageChannel.CREATE_ACCOUNT]: () => {
      
    },
    
    [ResortoCoreWorkerMessageChannel.LOGIN_ACCOUNT]: () => {
      
    },

    [ResortoCoreWorkerMessageChannel.LOGOUT]: () => {
      
    },

    [ResortoCoreWorkerMessageChannel.GET_DEVICES]: () => {

    },

    [ResortoCoreWorkerMessageChannel.DEVICE_INFO]: () => {
      
    },
  }
  
}