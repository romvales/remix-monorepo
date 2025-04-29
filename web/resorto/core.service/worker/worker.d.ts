
type ResortoDrizzleDatabase = import('@resorto/core.db/browser.client').ResortoDrizzleDatabase
type _ResortoCoreWorkerMessageChannel = import('@resorto/core.worker/message').ResortoCoreWorkerMessageChannel

declare type ServiceHandleWorkerEvent<
  WorkerEventChannel = _ResortoCoreWorkerMessageChannel, 
  Payload = any,
> = {
  context: { db: ResortoDrizzleDatabase },
  chan: WorkerEventChannel,
  payload: Payload,
}