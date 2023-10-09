import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'

const sorting = {
  DESC: 'Price high to low',
  ASC: 'Price low to high',
}

interface Props {
  sort: string,
  setSort: (value: string) => void
}
export const SelectSort = ({
  sort,
  setSort
}: Props) => (
  <FormControl fullWidth>
    <InputLabel>Blockchain</InputLabel>
    <Select
      value={sort}
      label="Order by"
      onChange={(e) => setSort(e.target.value)}
    >
      <MenuItem value={'DESC'} key={'DESC'}>{sorting.DESC}</MenuItem>
      <MenuItem value={'ASC'} key={'ASC'}>{sorting.ASC}</MenuItem>
    </Select>
  </FormControl>
)
