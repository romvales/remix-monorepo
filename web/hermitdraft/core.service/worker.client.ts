import { SQLocalMessageType } from '@hermitdraft/core.worker/enum'
import Worker from '@hermitdraft/core.worker?worker'
import PromiseWorker from 'promise-worker'

export const mainWorker = new Worker({ name: 'hermitdraft.worker1' })
export const worker = new PromiseWorker(mainWorker)

export const mainServiceWorker = await getServiceWorker()
export const serviceWorker = new PromiseWorker(mainServiceWorker)

await worker.postMessage({
  type: SQLocalMessageType.initialize,
  payload: {},
})

function getServiceWorker() {
  return new Promise<Worker>((resolve) => {
    if (navigator.serviceWorker.controller) {
      resolve(navigator.serviceWorker as unknown as Worker)
      return
    }
  
    const onChange = () => {
      navigator.serviceWorker.removeEventListener('controllerchange', onChange)
      resolve(navigator.serviceWorker as unknown as Worker)
    }
  
    navigator.serviceWorker.addEventListener('controllerchange', onChange)
  })
}

// Check if site's storage has been marked as persistent
if (navigator.storage && navigator.storage.persist!) {
  const isPersisted = await navigator.storage.persisted();
  console.log(`Persisted storage granted: ${isPersisted}`);
}