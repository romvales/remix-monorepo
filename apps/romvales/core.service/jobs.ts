import { aggregate, readItem, readItems, updateItem } from '@directus/sdk'
import { LoaderFunctionArgs } from '@remix-run/node'
import { directus as client } from '@romvales/core.server/client'
import { userSession } from '@romvales/session'

type GetLatestOpenJobsOptions = {
  page: number
  offset: number
  limit: number
}

export async function getOpenJobs(args: LoaderFunctionArgs, { 
  page, offset, limit,
}: GetLatestOpenJobsOptions = { 
  page: 1, offset: 0, limit: 12,
}) {
  const session = await userSession.getSession(args.request.headers.get('Cookie'))
  const config = session.get('config')

  const { search, country } = config?.jobs?.query ?? {}

  const itemsReq = client.request(
    readItems('jobs', {
      filter: {
        status: { _eq: 'published' },

        // locationCountry: { 
        //   _eq: country,
        // },
        
        _or: [
          

          ...(search?.length ? [
            {
              jobTitle: {
                _icontains: search,
              },
            },
            {
              tags: {
                tags_id: {
                  name: {
                    _icontains: search,
                  },
                },  
              },
            },
          ] : []),
        ],
      },
      
      page,
      offset,
      limit,

      // @ts-ignore
      fields: [ '*', 'company.*', 'industries.industries_id.name' ],
      sort: [ '-created' ],
    })
  )

  const aggReq = client.request(
    aggregate('jobs', {
      aggregate: {
        count: '*',
      },
    })
  ).then(
    res => res.at(0)!
  )

  const [items, result] = await Promise.all([ itemsReq, aggReq ])
  const itemCount = Number(result.count)
  
  return {
    totalPage: Math.ceil(itemCount/limit),
    itemCount,
    offset,
    limit,
    items,
  }
}

export async function getJob(id: string) {
  const job = await client.request(
    readItem('jobs', id, {
      // @ts-ignore
      fields: [ '*', 'company.*', 'industries.industries_id.name' ],
    })
  )

  return { job }
}

export async function updateJob(job: RomTypes.DirectusSchema['jobs'][number]) {
  return client.request(updateItem('jobs', job.id, job))
}