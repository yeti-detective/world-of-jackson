import {
  Entry,
  EntryCollection
} from 'contentful'
import {
  contentful as c,
} from '~/db/utils'

interface IContentfulQueryOptions {
  content_type: string | Array<String>
}

interface IContentfulBackRelation {
  field: string
  foreignObject?: ContentfulObject<any>
  foreignField: string
}

interface IContentfulObjectConstructorParams {
  options: IContentfulQueryOptions,
  backRelations?: Array<IContentfulBackRelation>
}

export default class ContentfulObject<T> {
  private _options: IContentfulQueryOptions
  private _backRelations: Array<IContentfulBackRelation> = []
  private _entries: EntryCollection<T> = {
    total: 0,
    limit: 0,
    skip: 0,
    items: [],
    stringifySafe() { return '' },
    toPlainObject() { return {} }
  }

  constructor({ options, backRelations }: IContentfulObjectConstructorParams) {
    this._options = options
    if (backRelations) this._backRelations = backRelations
    this._fetch()
  }

  get all(): Array<Entry<T>> { return this._entries.items }

  findById(id: string): Entry<T> | undefined {
    return this._entries.items.find((x: Entry<T>) => x.sys.id===id )
  }

  findRelated(id: string, field: string): Array<Entry<T>> {
    const firstWithRelation: Entry<any> | undefined =
      this._entries.items.find((x: Entry<any>) => x.fields[field])
    if (!firstWithRelation) return []

    return this._entries.items.filter((x: Entry<any>) =>
      Array.isArray(firstWithRelation.fields[field])
        ? x.fields[field].any((y: Entry<any>) => y.sys.id===id)
        : x.fields[field].sys.id===id
    )
  }

  private async _fetch(): Promise<void> {
    this._entries = await c.getEntries<T>(this._options)
    this._backRelate()
  }

  private _backRelate(): void {
    this._backRelations.forEach(({ field, foreignObject, foreignField }) =>
      this._entries && this._entries.items.forEach((entry: Entry<any>) => {
        const obj = foreignObject || this
        entry.fields[field] = obj.findRelated(entry.sys.id, foreignField)
      })
    )
  }
}
