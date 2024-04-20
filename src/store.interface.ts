export type State = Record<string | number | symbol, unknown>

export type Action<P, T = unknown> = {
  type: T
} & ([P] extends never
  ? {
      payload?: never
    }
  : {
      payload: P
    })

export type AnyAction = Action<any> & {
  [extraProps: string]: unknown
}

export type CaseReducer<
  StoreState extends State,
  A extends AnyAction = AnyAction,
> = (state: StoreState, action: A) => void

export type Reducer<StoreState extends State> = {
  [K: string]: CaseReducer<StoreState>
}

export type Selector<StoreState extends State, SelectedState> = (
  state: StoreState,
) => SelectedState

export type DispatchArgs<
  A,
  StoreState extends State,
  ReducerCase extends CaseReducer<StoreState>,
> = Parameters<ReducerCase> extends [State, Action<infer Payload>]
  ? Payload extends undefined
    ? [A]
    : [A, Payload]
  : [A]
