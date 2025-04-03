import AppWorker from '@hermitdraft/app.worker?worker'

const worker = new AppWorker({ name: 'hermitdraft' })

export function getAppWorker() {
  return worker
}