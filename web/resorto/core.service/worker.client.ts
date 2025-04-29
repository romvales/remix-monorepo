
import PromiseWorker from 'promise-worker'
import coreWorker from '../core.worker/core.worker?worker'
import { ResortoCoreWorkerMessageChannel } from '../core.worker/message'

export { core }

const core = new PromiseWorker(new coreWorker)

await core.postMessage({ chan: ResortoCoreWorkerMessageChannel.INITIALIZE })

// Check if site's storage has been marked as persistent
if (navigator.storage && navigator.storage.persist!) {
  const isPersisted = await navigator.storage.persisted()
  console.log(`Persisted storage granted: ${isPersisted}`)
}
