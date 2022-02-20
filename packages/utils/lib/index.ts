import data from '@yideng/core';
import { assign, createMachine, interpret } from 'xstate';
console.log('data 数据🐻 --> ', data);
//基础Promise任务
type DemoData = {
  userId: number;
  user: string;
  error: null | Error;
};
const normalTask = new Promise<DemoData>((resolve, reject) => {
  setTimeout(() => {
    if (data == 'laoyuan') {
      // resolve(data + '🐻utils任务初始化成功');
      resolve({ userId: 42, user: 'laoyuan', error: null });
    } else {
      reject({ userId: 0, user: '', error: new Error('测试') });
    }
  }, 300);
});
const fetchCuteAnimals = () => {
  return normalTask;
};
//状态机
const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        TOGGLE: {
          target: 'active',
        },
      },
    },
    active: {
      on: { TOGGLE: 'inactive' },
    },
  },
});
// const toggleMachine = createMachine({
//   id: 'user',
//   initial: 'idle',
//   context: {} as DemoData,
//   states: {
//     idle: {
//       on: {
//         FETCH: { target: 'loading' },
//       },
//     },
//     loading: {
//       invoke: {
//         id: 'getUser',
//         src: fetchCuteAnimals,
//         onDone: {
//           target: 'success',
//           actions: assign({ user: (_context, event) => event.data }),
//         },
//         onError: {
//           target: 'failure',
//           actions: assign({ error: (_context, event) => event.data.error }),
//         },
//       },
//     },
//     success: { type: 'final' },
//     failure: {
//       on: {
//         RETRY: { target: 'loading' },
//       },
//     },
//   },
// });
const toggleService = interpret(toggleMachine).start();
toggleService.onTransition((state) => {
  console.log('🍊🍊🍊🍊🍊', state.value, state.context);
  const selectionFired = new CustomEvent('ctoggle', {
    detail: state.value,
  });
  //windows上的应用
  window.dispatchEvent(new Event('toggle'));
  window.dispatchEvent(selectionFired);
});
// toggleService.send('TOGGLE');
export { normalTask, DemoData, toggleService };
