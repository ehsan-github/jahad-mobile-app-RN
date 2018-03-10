import { getApiF, postApiF, path } from './utils'

// export const getEntityTypeName = listId => getApiF(
//     `/_api/lists(guid'${listId}')/listItemEntityTypeFullName`
// )
//     .chain(path(r => r.ListItemEntityTypeFullName))

export const getSpItems0 = spName => postApiF(
    'http://79.127.32.69:6161/service.aspx/getSpData',
    { spName }
)

export const getSpItems = spName => fetch(
    'http://79.127.32.69:6161/service.aspx/getSpData',
    {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ spName })
    }
)
    .then(res => res.json())
    .then(x => x.d)
    .then(x => JSON.parse(x))
