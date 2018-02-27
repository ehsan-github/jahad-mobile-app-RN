import { getApiF, postApiF, path } from './utils'

export const getEntityTypeName = listId => getApiF(
    `/_api/lists(guid'${listId}')/listItemEntityTypeFullName`
)
    .chain(path(r => r.ListItemEntityTypeFullName))

export const getFieldsList = (listId, itemId, contentTypeId) => postApiF(
    '/_Layouts/15/BaseSolution/Services.aspx/GetFieldsList',
    { listId, itemId, formType: 'New', contentTypeId }
)
