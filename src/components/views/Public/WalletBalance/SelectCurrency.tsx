import {
  Autocomplete,
  AutocompleteRenderInputParams,
  InputAdornment,
  TextField,
  createFilterOptions,
  styled
} from '@mui/material'
import { SetStateAction } from 'react'
import { CurrencyDetail } from '../../../../types/types'

interface Props {
  isLoading: boolean
  thumbnail?: string
  setDisplayValueCurrency: React.Dispatch<SetStateAction<CurrencyDetail | null>>
  displayValueCurrency: CurrencyDetail | null
  data: CurrencyDetail[]
}

const filterOptions = createFilterOptions<CurrencyDetail>({
  ignoreCase: true,
  matchFrom: 'start',
  limit: 20,
})

export const SelectCurrency = ({
  isLoading,
  thumbnail,
  displayValueCurrency,
  setDisplayValueCurrency,
  data
}: Props) => (
  <Autocomplete
    filterOptions={filterOptions}
    loading={isLoading}
    fullWidth
    id="combo-box-currencies"
    options={data}
    getOptionLabel={(option: CurrencyDetail) => `${option.symbol} ${option.name}`}
    renderInput={
      (params: AutocompleteRenderInputParams) => <TextField
        {...params}
        label="Display value in"
        fullWidth
        placeholder='USD'
        margin="normal"
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            <InputAdornment position='start'>
              {
                thumbnail
                && <Img
                  width={30}
                  height={30}
                  src={thumbnail}
                />
              }
            </InputAdornment>
          )
        }}
      />
    }
    onChange={(e: any, value: CurrencyDetail | null) => setDisplayValueCurrency(value)}
    value={displayValueCurrency}
  />
)

const Img = styled('img')``
