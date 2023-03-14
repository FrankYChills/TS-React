import {
  useCallback,
  useReducer,
  ChangeEvent,
  createContext,
  ReactElement,
  useContext,
} from "react";

type StateType = {
  count: number;
  text: string;
};

const initState: StateType = { count: 0, text: "" };

const enum ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_ENTRY,
}
// action will have two props that are type and payload so
type ActionProps = {
  type: ACTION_TYPE;
  payload?: string;
};

// define reducer function that updates the state by checking the args
const reducer = (state: StateType, action: ActionProps): StateType => {
  switch (action.type) {
    case ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ACTION_TYPE.NEW_ENTRY:
      return { ...state, text: action.payload ?? "" };
    default:
      throw new Error();
  }
};

// define reducer(state,dispatch etc) to update the state and return the actions so that they can be accessed from outside
const useCounterContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const increment = useCallback(
    () => dispatch({ type: ACTION_TYPE.INCREMENT }),
    []
  );
  const decrement = useCallback(
    () => dispatch({ type: ACTION_TYPE.DECREMENT }),
    []
  );
  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ACTION_TYPE.NEW_ENTRY, payload: e.target.value });
  }, []);

  return { state, increment, decrement, handleInput };
};

// type for initState
type UseCounterContextType = ReturnType<typeof useCounterContext>;

// create context state with state var values and update functions
const initContextState: UseCounterContextType = {
  state: initState,
  increment: () => {},
  decrement: () => {},
  handleInput: (e: ChangeEvent<HTMLInputElement>) => {},
};

//now create context with the init state
export const CounterContext =
  createContext<UseCounterContextType>(initContextState);

// define children type
type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

// define provider which encapsulates children to provide them state which is value here
export const CounterProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CounterContext.Provider value={useCounterContext(initState)}>
      {children}
    </CounterContext.Provider>
  );
};

// custom hook type
type UseCounterHookType = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

// custom counter hook to update the state (count here) in the context
export const useCounter = (): UseCounterHookType => {
  const {
    state: { count },
    increment,
    decrement,
  } = useContext(CounterContext);
  return { count, increment, decrement };
};

// custom hook type
type UseCounterTextHookType = {
  text: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
};
// custom hook to update the state (text here) in the context
export const useCounterText = () => {
  const {
    state: { text },
    handleInput,
  } = useContext(CounterContext);
  return { text, handleInput };
};
