import { getApiF, postApiF, path } from './utils'

// export const getEntityTypeName = listId => getApiF(
//     `/_api/lists(guid'${listId}')/listItemEntityTypeFullName`
// )
//     .chain(path(r => r.ListItemEntityTypeFullName))

export const getSpItems = spName => postApiF(
    '/_layouts/15/reporting/service.aspx/getspdata',
    { spName }
)
