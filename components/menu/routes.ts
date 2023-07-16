import { RxDashboard } from 'react-icons/rx';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { FiUsers } from 'react-icons/fi';
import { SlScreenSmartphone } from 'react-icons/sl';
import { TbReportAnalytics } from 'react-icons/tb';
import { IoSettingsOutline } from 'react-icons/io5';
import { RouteWithCollapse } from './menu.types';


const routes: RouteWithCollapse[] = [
  {
    type: 'menu',
    name: 'Dashboard',
    key: 'Dashboard',
    route: '/Dashboard',
    icon: RxDashboard,
  },
  {
    type: 'menu',
    name: 'Users',
    key: 'Users',
    route: '/Users',
    icon: FiUsers,
    collapse: [
      {
        type: 'sub-menu',
        name: 'Users list',
        key: 'Users-list',
        route: '/users',
      },
      {
        type: 'sub-menu',
        name: 'Add new',
        key: 'Add-new',
        route: '/users/addNew',
      },
    ],
  },
  {
    type: 'menu',
    name: 'Questionnaire',
    key: 'Questionnaire',
    route: '/questionnaire',
    icon: RiQuestionnaireLine,
    collapse: [
      {
        type: 'sub-menu',
        name: 'Questions List',
        key: 'questions-list',
        route: '/questionnaire/questions-list',
      },
      {
        type: 'sub-menu',
        name: 'Meta settings',
        key: 'Meta-settings',
        route: '/meta-settings',
      },
      {
        type: 'sub-menu',
        name: 'Add new',
        key: 'add-new',
        route: '/questionnaire/add-new',
      },
    ],
  },
  {
    type: 'menu',
    name: 'App screens',
    key: 'App-screens',
    route: '/App-screens',
    icon: SlScreenSmartphone,
    collapse: [
      {
        type: 'sub-menu',
        name: 'Screens list',
        key: 'screens-list',
        route: '/screens-list',
      },
      {
        type: 'sub-menu',
        name: 'Meta settings',
        key: 'Meta-settings',
        route: '/meta-settings',
      },
    ],
  },
  {
    type: 'menu',
    name: 'Reports',
    key: 'Reports',
    route: '/Reports',
    icon: TbReportAnalytics,
    collapse: [
      {
        type: 'sub-menu',
        name: 'usage',
        key: 'usage',
        route: '/usage',
      },
    ],
  },
  {
    type: 'menu',
    name: 'Settings',
    key: 'Settings',
    route: '/Settings',
    icon: IoSettingsOutline,
  },
];

export default routes;
