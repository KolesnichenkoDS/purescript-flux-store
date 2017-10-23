# purescript-flux-store

Minimal Redux-like store for PureScript applications.

## Example

```haskell
module Main where

import Prelude

import Control.Monad.Eff
import Control.Monad.Eff.Console
import Data.Store

type State = Int

initialState :: State
initialState = 0

data Action = Inc | Dec

type Counter = Store Action State

reducer :: Reducer Action State
reducer s Inc = s + 1
reducer s Dec = s - 1

main :: forall e. Eff (console :: CONSOLE, store :: STORE | e) Unit
main = do
  store <- createStore reducer initialState
  subscribe store $ \x -> log $ "new state: " <> show x
  dispatch store Inc
  dispatch store Inc
  dispatch store Dec
  x <- getState store
  log $ "final state: " <> show x
```

## TODO

- Make unsubscribing possible.
- Write tests.
