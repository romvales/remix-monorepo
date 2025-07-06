import { aggregate, readItems } from '@directus/sdk'
import { directus as client } from '@romvales/core.server/client'

type GetCompaniesOptions = {
  statsOnly?: boolean
  page?: number
  offset?: number
  limit?: number
}

export async function getCompanies({
  statsOnly, page, offset, limit,
}: GetCompaniesOptions = {
  page: 1, offset: 0, limit: 10,
}) {

  const aggReq = client.request(
    aggregate('companies', {
      query: {
        filter: {
          tags: {
            tags_id: {
              name: { _eq: 'romvales.com/job' },
            },
          },
        },
      },
      aggregate: {
        count: '*',
      },
    })
  ).then(
    res => res.at(0)!
  )
  
  if (statsOnly) {
    const [result] = await Promise.all([ aggReq ])
    const itemCount = Number(result.count)

    return {
      totalPage: Math.ceil(itemCount/limit!),
      itemCount,
      offset,
      limit,
      items: [],
      statsOnly: true,
    }
  }

  const itemsReq = client.request(
    readItems('companies', {
      filter: {
        tags: {
          tags_id: {
            name: { _eq: 'romvales.com/job' },
          },
        },
      },

      page,
      offset,
      limit,

      fields: [ '*' ],
      sort: [ '-created' ],
    })
  )

  const [items, result] = await Promise.all([ itemsReq, aggReq ])
  const itemCount = Number(result.count)

  return {
    totalPage: Math.ceil(itemCount/limit!),
    itemCount,
    offset,
    limit,
    items,
  }
}