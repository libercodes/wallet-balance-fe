import {
  Avatar,
  Box,
  Card,
  Typography,
  styled
} from '@mui/material'
import { DisplayTokenData } from '../../../../types/types'

interface Props {
  displayValue: DisplayTokenData
  title: string
  thumbnail: string
  symbol: string
}
export const CurrencyBalanceItem = ({
  displayValue,
  title,
  thumbnail,
  symbol
}: Props) => (
  <Card
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      p: '1rem',
      width: '90%'
    }}
  >
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1
    }}>
      {
        thumbnail ? <Img
          src={thumbnail}
          width={50}
          height={50}
        />
          : <Avatar>{symbol.substring(0, 2)}</Avatar>
      }

      <Typography>{title}</Typography>
    </Box>

    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1
    }}>
      <Typography>{displayValue.value}</Typography>
      {
        displayValue.thumbnail && displayValue.thumbnail !== ''
        && <Img
          src={displayValue.thumbnail}
          width={50}
          height={50}
        />
      }

    </Box>
  </Card>
)

const Img = styled('img')``
