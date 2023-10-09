import {
  Box,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material'
import { useQuery } from 'react-query'
import { useState } from 'react'
import { RQueryKeys } from '../../../../types/react-query'
import UserWalletService from '../../../../services/wallet.service'
import {
  CurrencyDetail,
  DisplayTokenData,
  TokenBalance
} from '../../../../types/types'
import { CurrencyBalanceItem } from './CurrencyBalanceItem'
import { formatUsdValue } from '../../../../utils/blockchain.helper'
import { TotalBalance } from './TotalBalance'
import { SelectCurrency } from './SelectCurrency'
import { SelectChain } from './SelectChain'
import { SelectSort } from './SelectSort'

export const WalletBalance = () => {
  const [wallet, setWallet] = useState<string>('')
  const [blockchain, setBlockchain] = useState('eth')
  const [displayValueCurrency, setDisplayValueCurrency] = useState<CurrencyDetail | null>(null)
  const [sort, setSort] = useState('DESC')

  const balanceQuery = useQuery([RQueryKeys.WalletBalance, wallet, blockchain], async () => {
    if (!wallet) return undefined
    const res = await UserWalletService.getTokensBalance(wallet, blockchain)
    return res
  }, { staleTime: 1000 * 60 * 2 })

  const currenciesQuery = useQuery([RQueryKeys.Currencies, blockchain], async () => {
    if (!blockchain) return undefined
    const res = await UserWalletService.getCurrencies(blockchain)
    return res
  }, { staleTime: 1000 * 60 * 20 })

  const tokenPriceQuery = useQuery(
    [RQueryKeys.TokenPrice, blockchain, displayValueCurrency?.address],
    async () => {
      if (!displayValueCurrency) return undefined
      const res = UserWalletService.getTokenPrice(displayValueCurrency.address!, blockchain)
      return res
    },
    { staleTime: 1000 * 60 * 20 }
  )

  // eslint-disable-next-line arrow-body-style
  const handleSort = (a: TokenBalance, b: TokenBalance): number => {
    return sort === 'ASC'
      ? +a.balanceUsd - +b.balanceUsd
      : +b.balanceUsd - +a.balanceUsd
  }

  const handleChangeChain = (value: string) => {
    setDisplayValueCurrency(null)
    setBlockchain(value)
  }

  const displayValue = (tokenBalance: TokenBalance): DisplayTokenData => {
    const tokenPriceInUsd = tokenPriceQuery.data

    if (!tokenPriceInUsd || !displayValueCurrency) {
      return {
        value: `USD ${formatUsdValue(tokenBalance.balanceUsd)}`,
        symbol: 'USD',
      }
    }

    console.log(`thumbnail: ${displayValueCurrency.thumbnail}`)
    const balance = +tokenBalance.balanceUsd / +tokenPriceInUsd
    return {
      value: `${balance}`,
      thumbnail: displayValueCurrency.thumbnail || undefined,
      symbol: displayValueCurrency.symbol
    }
  }

  return (
    <Box sx={{
      width: '100%',
      height: '100%'
    }}>
      <Container maxWidth='md'>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <Typography variant='h1' fontSize={'2rem'}>Wallet D3</Typography>
          <TextField
            value={wallet}
            label='Wallet address'
            onChange={(e) => setWallet(e.target.value)}
            variant='filled'
            fullWidth
          />

          <SelectChain
            blockchain={blockchain}
            setBlockchain={handleChangeChain}
          />

          {
            currenciesQuery.data
            && <SelectCurrency
              data={currenciesQuery.data || []}
              setDisplayValueCurrency={setDisplayValueCurrency}
              displayValueCurrency={displayValueCurrency}
              isLoading={currenciesQuery.isFetching}
              thumbnail={displayValueCurrency?.thumbnail}
            />
          }

          <SelectSort
            sort={sort}
            setSort={setSort}
          />

          <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 2
          }}>
            <TotalBalance value={balanceQuery.data?.totalBalanceUsd} />
            {
              balanceQuery.isFetching
              && <Box>
                <CircularProgress size={'4rem'} />
              </Box>
            }
            {
              (!balanceQuery.data || balanceQuery.data.tokens.length === 0)
              && <Typography color='grey'>Wallet is empty</Typography>
            }
            {
              (balanceQuery.data?.tokens || [])
                .toSorted(handleSort)
                .map((tokenBalance) => (
                  <CurrencyBalanceItem
                    key={`${tokenBalance.contractAddress}-${blockchain}`}
                    displayValue={displayValue(tokenBalance)}
                    title={`${tokenBalance.token.symbol} ${tokenBalance.balance}`}
                    thumbnail={tokenBalance.token.thumbnail}
                    symbol={tokenBalance.token.symbol}
                  />
                ))
            }
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
