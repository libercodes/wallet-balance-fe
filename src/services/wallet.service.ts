import API from '../config/axios.config'
import { Res } from '../types/response.types'
import { CurrencyDetail, GetTokenBalanceRes } from '../types/types'

const path = '/user/wallet'
const getTokensBalance = async (wallet: string, blockchain: string): Promise<GetTokenBalanceRes> => {
  const res = await API.get<Res<GetTokenBalanceRes>>(`${path}/tokens`, {
    params: {
      wallet,
      blockchain
    }
  })
  return res.data.data
}

const getTokenPrice = async (token_contract: string, blockchain: string): Promise<string> => {
  const res = await API.get<Res<string>>(`${path}/token/price`, {
    params: {
      token_contract,
      blockchain
    }
  })
  return res.data.data
}

const getCurrencies = async (blockchain: string): Promise<CurrencyDetail[]> => {
  const res = await API.get<Res<CurrencyDetail[]>>(`${path}/currencies/${blockchain}`)
  return res.data.data
}

const UserWalletService = {
  getTokensBalance,
  getTokenPrice,
  getCurrencies
}

export default UserWalletService
