import { Card, Typography } from '@mui/material'
import { formatUsdValue } from '../../../../utils/blockchain.helper'

interface Props {
  value?: string
}
export const TotalBalance = ({ value }: Props) => (
  <>
    {
      value && <Card sx={{
        padding: '1rem',
        bgcolor: 'secondary.main'
      }}>
        <Typography color='white' fontSize={'1.5rem'}>
          Total balance in USD {formatUsdValue(value)}
        </Typography>
      </Card>
    }
  </>
)
