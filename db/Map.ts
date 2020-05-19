import { ContentfulObject } from '~/db/classes'
import { IMapFields } from '~/types/db/contentful'

export default new ContentfulObject<IMapFields>({
  content_type: 'map'
})
