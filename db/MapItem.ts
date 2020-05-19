import {
  Zone,
  Lot,
  Building
} from '~/db'

export const all = async (): Promise<Array<any>> => [
  ...Zone.all(),
  ...Lot.all(),
  ...Building.all()
]

export default {
  all
}
