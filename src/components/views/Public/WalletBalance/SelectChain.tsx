import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import { chainsToNativeSymbols, listOfChains } from '../../../../config/blockchain'

interface Props {
  blockchain: string,
  setBlockchain: (value: string) => void
}
export const SelectChain = ({
  blockchain,
  setBlockchain
}: Props) => (
  <FormControl fullWidth>
    <InputLabel>Blockchain</InputLabel>
    <Select
      value={blockchain}
      label="Blockchain"
      onChange={(e) => setBlockchain(e.target.value)}
    >
      {
        listOfChains.map((x) => (
          <MenuItem value={x} key={x}>{(chainsToNativeSymbols as any)[x]}</MenuItem>
        ))
      }
    </Select>
  </FormControl>
)
