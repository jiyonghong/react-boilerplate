import React from 'react';

import loadable from 'loadable-components';
import Loading from 'app/components/common/Loading';

import delay from 'delay';


const delayLoad = (func, ms = 200) => {
  if (typeof window === 'undefined') return func;
  return () => Promise.all([func, delay(ms)])
    .then(val => val[0]());
};


const getAsyncComponent = (asyncModule, webpackModule) => loadable(
  delayLoad(asyncModule), {
    modules: [webpackModule],
    LoadingComponent: () => <Loading />,
  },
);


const routes = [
  {
    name: 'Home',
    path: '/',
    component: getAsyncComponent(() => import('./Home'), './Home'),
    exact: true,
  },
  {
    name: 'Other',
    path: '/other',
    component: getAsyncComponent(() => import('./Other'), './Other'),
  },
];


export default routes;
