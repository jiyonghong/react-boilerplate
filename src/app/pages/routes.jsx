import loadable from 'loadable-components';
import Loading from 'app/components/common/Loading';


const getAsyncComponent = moduleName => loadable(
  () => import(moduleName),
  {
    modules: [moduleName],
    LoadingComponent: Loading,
  },
);


const routes = [
  {
    name: 'Home',
    path: '/',
    // component: loadable(() => import('./Home')),
    component: getAsyncComponent('./Home'),
    exact: true,
  },
  {
    name: 'Other',
    path: '/other',
    // component: loadable(() => import('./Other')),
    component: getAsyncComponent('./Other'),
  },
];


export default routes;
