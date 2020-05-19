import { ContentfulObject } from '~/db/classes'
import {
  IProject,
  IProjectFields
} from '~/types/db/contentful'
import { Project } from '~/db'

export interface IProjectFieldsBackrelated extends IProjectFields {
  parents?: Array<IProject>
}

export default new ContentfulObject<IProjectFields>({
  content_type: 'project'
},
{
  backRelations: [
    {
      field: 'parentProjects'
      foreignField: 'projects'
    }
  ]
})
