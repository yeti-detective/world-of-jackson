import { ContentfulObject } from '~/db/classes'
import { ILotFields } from '~/types/db/contentful'

export default new ContentfulObject<ILotFields>({
  content_type: 'lot'
})
