## Introduction

Zustify is a state management library for React applications, offering a more straightforward and type-safe alternative to Zustand and Redux. If you appreciate the simplicity of Redux APIs but seek a more lightweight and intuitive solution, Zustify is an excellent choice.

### Why Zustify?

Zustify combines the best of both worlds from Zustand and Redux. It provides the familiar APIs of Redux for defining actions and managing state but with the simplicity and flexibility of Zustand. With Zustify, you get a type-safe state management solution that is easy to set up, understand, and use in your React projects.

Whether you're a fan of Redux APIs or looking for a more modern approach to state management, Zustify offers a compelling solution. It allows you to define your state and actions with ease, ensuring type safety throughout your application. If you value simplicity, type safety, and the power of Redux-like APIs, Zustify is the state management library for you.

## Installation 

### Install via yarn
```ts
yarn add zustify
```
### Install via npm
```ts
npm install zustify
```

## Usage Typescript
### Create your store 
```ts
import {createSharedStore, Action} from 'zustify' 

const [useCountStore, useCountDispatch] =  createSharedStore(
    // This is your state
    {
        count: 0,
        firstName: 'test',
        lastName: 'test lastname',
    },
    // This is your reducer where you can provide actions
    {
        increment(state, action: Action<number>) {
            const number = action.payload;
            //update the state traditional  zustify will take care of the rerendering
            state.count += number;
        },
        decrement(state, action: Action<number>) {
            state.count -= action.payload || 1;
        },
    },
)
```

#### The createSharedStore function returns an array with two hooks:

### useCountStore: Allows reading the state by passing a selector.
```ts
const count = useStore(state=>state.count)
```

### useCountDispatch: Provides functions to update or reset the state. actions contains all defined reducers.

```ts
const {dispatch,reset,actions}  = useDispatch()
```

# Example Usage
```javascript

function Mycomponent() {
  // useCounter takes a selector as a parameter just like zustand does
  const count = useCountStore((state) => state.count);
  const { dispatch, actions, reset } = useCountDispatch();

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => { dispatch(actions.increment, 1) }}>Increment</button>
      <button onClick={() => { dispatch(actions.decrement, 1) }}>Decrement</button>
    </div>
  );
}
```


For using state in a non-reactive way:

```javascript
const completeState = useCountStore.getState();

```


