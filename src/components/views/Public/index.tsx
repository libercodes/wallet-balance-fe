import { Route, Switch } from 'react-router-dom'
import { WalletBalance } from './WalletBalance'

export const PublicRoutes = () => (
  <Switch>
    <Route
      path={'/'}
      component={WalletBalance}
      exact
    />
  </Switch>
)
