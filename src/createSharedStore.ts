import {useCallback,useMemo} from 'react'
import create from 'zustand'
import shallow from 'zustand/shallow'
import {produce} from 'immer'


import {
  State,
  Reducer,
  Selector,
  DispatchArgs,
} from './store.interface'

/**
 * ```ts
 * Example Usage
 * const [useStore,useDispatch]  = createSharedStore(
 *   {
 *     count: 0,
 *   },
 *   {
 *     increment(state, action: Action<number>) {
 *       const number = action.payload + 1
 *       state.count += number
 *     },
 *     decrement(state, action: Action<number>) {
 *       state.count -= action.payload || 1
 *     },
 *   },
 * )
 * ```
 * @param initialState
 * @param reducer
 */
export function createSharedStore<
  S extends State,
  R extends Reducer<S>,
>(initialState: S, reducer: R) {
  const useStore = create(() => initialState)
  const actions = Object.keys(reducer).reduce(
    (acc, key) => ({
      ...acc,
      [key]: key,
    }),
    {},
  ) as {
    [K in keyof R]: K
  }


  function dispatchAction<A extends keyof typeof actions>(
    ...[action, payload]: DispatchArgs<A, S, R[A]>
  ) {
    useStore.setState((prev) => {
      const handler = reducer[action]

      if (!handler) {
        const message = `Action (${String(
          action,
        )}) is not handled by any case in the reducer!`
          throw new Error(message)
      }

      return produce(prev, (draftState: S) => {
        reducer[action](draftState, {type: action, payload})
      }) as S
    })
  }

  function reset() {
    useStore.setState(initialState, true)
  }

  function useGlobalDispatch(): {
    readonly dispatch: typeof dispatch
    readonly reset: () => void
    readonly actions: {[K in keyof R]: K}
  } {



    const dispatch = useCallback(
      <A extends keyof typeof actions>(...args: DispatchArgs<A, S, R[A]>) => {
        return dispatchAction(...args)
      },
      [],
    )

    return useMemo(
      () =>
        ({
          dispatch,
          reset,
          actions,
        } as const),
      [dispatch],
    )
  }

  function useGlobalStore<SelectedState>(
    selector: Selector<S, SelectedState>,
  ): SelectedState {
    const state = useStore(selector, shallow)

    return useMemo(() => state, [state])
  }

  useGlobalStore.getState = () => useStore.getState()
  type UseStore = typeof useGlobalStore & {readonly brand: 'UseStore'}
  type UseDispatch = typeof useGlobalDispatch & {readonly brand: 'UseDispatch'}

  return [useGlobalStore as UseStore, useGlobalDispatch as UseDispatch] as const
}
