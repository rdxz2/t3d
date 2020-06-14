import PgHome from '../pages/pgHome';
import PgAccount from '../pages/pgAccount';
import PgProject from '../pages/pgProject';

const PAGE = [
  {
    path: '/home',
    name: 'Home',
    component: PgHome,
  },
  {
    path: '/account',
    name: 'Account',
    component: PgAccount,
  },
  {
    path: '/project/:projectCode',
    name: 'Project',
    component: PgProject,
  },
];

export default PAGE;
