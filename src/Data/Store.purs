module Data.Store
    ( Store
    , STORE
    , Reducer
    , createStore
    , subscribe
    , dispatch
    , getState
    ) where

import Prelude (Unit)

import Control.Monad.Eff (Eff, kind Effect)

type Reducer action state = state -> action -> state

foreign import data Store :: Type -> Type -> Type

foreign import data STORE :: Effect

foreign import createStore
    :: forall eff action state. Reducer action state
    -> state
    -> Eff (store :: STORE | eff) (Store action state)

foreign import subscribe
    :: forall eff action state. Store action state
    -> (state -> Eff eff Unit)
    -> Eff (store :: STORE | eff) Unit

foreign import dispatch
    :: forall eff action state. Store action state
    -> action
    -> Eff (store :: STORE | eff) Unit

foreign import getState
    :: forall eff action state. Store action state
    -> Eff (store :: STORE | eff) state
