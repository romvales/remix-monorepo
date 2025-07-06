import { fetchJobApplicationsState, reportJobPosting } from '@romvales/core.actions/jobs'
import { ActionFunctionArgs, replace } from '@vercel/remix'
import geoip from 'fast-geoip'

export const action = async (args: ActionFunctionArgs) => {
  const url = new URL(args.request.url)
  
  try {
    switch (url.searchParams.get('action')) {
    case 'getJobApplications': return fetchJobApplicationsState(args)
    case 'getGeoIp': 
      const ip = url.searchParams.get('ip')!
      return { geo: await geoip.lookup(ip) }
    case 'reportJobPosting':
      return reportJobPosting(args)
    }
  } catch {
    return replace(url.toString())
  }

  return {}
}