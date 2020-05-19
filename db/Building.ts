import { ContentfulObject } from '~/db/classes'
import { IBuildingFields } from '~/types/db/contentful'

export default new ContentfulObject<IBuildingFields>({
  content_type: 'building'
})
