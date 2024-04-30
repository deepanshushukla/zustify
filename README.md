## Introduction

Zustify is a lightweight (~5.5 kb) state management library for React applications, offering a more straightforward and type-safe alternative to Zustand and Redux. If you appreciate the simplicity of Redux APIs but seek a more lightweight and intuitive solution, Zustify is an excellent choice.

### Why Zustify?

Zustify combines the best of both worlds from Zustand and Redux. It provides the familiar APIs of Redux for defining actions and managing state but with the simplicity and flexibility of Zustand. With Zustify, you get a type-safe state management solution that is easy to set up, understand, and use in your React projects.

Whether you're a fan of Redux APIs or looking for a more modern approach to state management, Zustify offers a compelling solution.
It allows you to define your state and actions with ease,
ensuring type safety throughout your application. 
If you value simplicity, type safety, and the power of Redux-like APIs, Zustify is the state management library for you.

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

const [useStore, useDispatch] =  createSharedStore(
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
            //update the state directly zustify will take care of the rerendering 
            state.count += number;
        },
        decrement(state, action: Action<number>) {
            state.count -= action.payload || 1;
        },
    },
)
```

#### The createSharedStore function returns an array with two hooks:

### useStore: Allows reading the state by passing a selector.
```ts
const count = useStore(state=>state.count)
```

### useDispatch: Provides functions to update or reset the state. actions contains all defined reducers.

```ts
const {dispatch,reset,actions}  = useDispatch()
```
### reset: 
The reset function provided by useDispatch allows you to reset the
state to its initial values. It's particularly useful when you need to revert the state to its original state or clear out any modifications made during runtime.

### dispatch:
The dispatch function provided by useDispatch is used to trigger actions defined in the reducer.
It takes the action reducer name as its first argument, followed by any payload required by that action.
This function is central to updating the state based on predefined actions. 
Importantly, dispatch ensures type safety by only allowing actions that are explicitly defined in the reducer to be dispatched.

### actions:
In Zustify, the action object provided by useDispatch serves
as a convenient reference to all the reducer method names.
It's essentially an object containing references to each action defined in the reducer.
This allows for easy access to the actions within your components without the need to manually reference each one. 
By providing a centralized object with all action names, 
Zustify enhances code readability and maintainability. Additionally, it ensures type safety by restricting dispatch calls to only those actions listed within the action object, preventing accidental typos or misuse.

# Example Usage
```javascript

function Mycomponent() {
  const count = useStore((state) => state.count);
  const { dispatch, actions, reset } = useDispatch();

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

### Working example:
[CodeSandBox Example](https://codesandbox.io/p/sandbox/a-simple-react-counter-forked-3xx8zg)





