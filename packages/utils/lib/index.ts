import data from '@yideng/core';
import { createMachine, interpret } from 'xstate';
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
const toggleService = interpret(toggleMachine).start();
toggleService.onTransition((state) => {
  console.log('🍊🍊🍊🍊🍊', state.value);
  //windows上的应用
  window.dispatchEvent(new Event('toggle'));
});
// toggleService.send('TOGGLE');
export { normalTask, DemoData, toggleService };
