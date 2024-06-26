import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
        path: '/dashboard',
        title: 'Dashboard',
        // icon:'<mat-icon>help_outline</mat-icon>,
        class: '',
        extralink: false,
        submenu: []
  },
  {
    path: '/question',
    title: 'Question',

    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/session',
    title: 'Session',

    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/Section',
    title: 'Section',

    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/cv',
    title: 'Ciriclum vitae',
    class: '',
    extralink: false,
    submenu: []
  }
  ,

  {
    path: '/Paramétrage',
    title: 'Paramétrage',
    // icon:'<mat-icon>help_outline</mat-icon>,
  class: '',
  extralink: false,
  collapsed: true , // Initialize collapsed state
  submenu: [
    {

    path: '/Langue',
    title: 'Langue',
    // icon: string;
    class: '',
    extralink: false,
    submenu: []
    }
    ,

    {
      
      
      
      path: '/etude',
      title: 'Niveau d\'etude ',
      // icon: string;
      class: '',
      extralink: false,
      submenu: []
      
      }
      
  ]

 },
 {
  path: '/dashboard',
  title: 'Dashboard',
  // icon:'<mat-icon>help_outline</mat-icon>,
  class: '',
    extralink: false,
    submenu: []
}


];
