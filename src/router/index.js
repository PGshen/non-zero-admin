import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      title: 'dashboard', icon: 'dashboard', noCache: true,
      meta: {
        url: '/dashboard/page'
      }
    }]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [{
      path: 'index',
      component: _import('documentation/index'),
      name: 'documentation',
      title: 'documentation', icon: 'documentation', noCache: true,
      meta: {
        url: '/documentation/page'
      }
    }]
  },

  {
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: _import('svg-icons/index'),
      name: 'icons',
      title: 'icons', icon: 'icon', noCache: true,
      meta: {
        url: '/icons/page'
      }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    roles: ['admin'], // you can set roles in root nav
    children: [{
      path: 'index',
      component: _import('permission/index'),
      name: 'permission',

      title: 'permission',
      icon: 'lock',
      roles: ['admin'] // or you can only set roles in sub nav

    }]
  },

  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component',

    title: 'components',
    icon: 'component',
    children: [
      { path: 'tinymce', component: _import('components-demo/tinymce'), name: 'tinymce', title: 'tinymce' },
      { path: 'markdown', component: _import('components-demo/markdown'), name: 'markdown', title: 'markdown' },
      {
        path: 'json-editor',
        component: _import('components-demo/jsonEditor'),
        name: 'jsonEditor',
        title: 'jsonEditor'
      },
      { path: 'dnd-list', component: _import('components-demo/dndList'), name: 'dndList', title: 'dndList' },
      { path: 'splitpane', component: _import('components-demo/splitpane'), name: 'splitpane', title: 'splitPane' },
      {
        path: 'avatar-upload',
        component: _import('components-demo/avatarUpload'),
        name: 'avatarUpload',
        title: 'avatarUpload'
      },
      { path: 'dropzone', component: _import('components-demo/dropzone'), name: 'dropzone', title: 'dropzone' },
      { path: 'sticky', component: _import('components-demo/sticky'), name: 'sticky', title: 'sticky' },
      { path: 'count-to', component: _import('components-demo/countTo'), name: 'countTo', title: 'countTo' },
      {
        path: 'mixin',
        component: _import('components-demo/mixin'),
        name: 'componentMixin',
        title: 'componentMixin'
      },
      { path: 'back-to-top', component: _import('components-demo/backToTop'), name: 'backToTop', title: 'backToTop' }
    ]
  },

  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',

    title: 'charts',
    icon: 'chart',
    children: [
      {
        path: 'keyboard',
        component: _import('charts/keyboard'),
        name: 'keyboardChart',
        title: 'keyboardChart',
        noCache: true
      },
      { path: 'line', component: _import('charts/line'), name: 'lineChart', title: 'lineChart', noCache: true },
      { path: 'mixchart', component: _import('charts/mixChart'), name: 'mixChart', title: 'mixChart', noCache: true }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table/complex-table',
    name: 'example',

    title: 'example',
    icon: 'example',
    children: [
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/complex-table',
        name: 'Table',

        title: 'Table',
        icon: 'table',
        children: [
          {
            path: 'dynamic-table',
            component: _import('example/table/dynamicTable/index'),
            name: 'dynamicTable',
            title: 'dynamicTable'
          },
          { path: 'drag-table', component: _import('example/table/dragTable'), name: 'dragTable', title: 'dragTable' },
          {
            path: 'inline-edit-table',
            component: _import('example/table/inlineEditTable'),
            name: 'inlineEditTable',
            title: 'inlineEditTable'
          },
          {
            path: 'tree-table',
            component: _import('example/table/treeTable/treeTable'),
            name: 'treeTable',
            title: 'treeTable'
          },
          {
            path: 'custom-tree-table',
            component: _import('example/table/treeTable/customTreeTable'),
            name: 'customTreeTable',
            title: 'customTreeTable'
          },
          {
            path: 'complex-table',
            component: _import('example/table/complexTable'),
            name: 'complexTable',
            title: 'complexTable'
          }
        ]
      },
      { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'tab', title: 'tab' }
    ]
  },

  {
    path: '/form',
    component: Layout,
    redirect: 'noredirect',
    name: 'form',

    title: 'form',
    icon: 'form',
    children: [
      { path: 'create-form', component: _import('form/create'), name: 'createForm', title: 'createForm', icon: 'table' },
      { path: 'edit-form', component: _import('form/edit'), name: 'editForm', title: 'editForm', icon: 'table' }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',

    title: 'errorPages',
    icon: '404',
    children: [
      { path: '401', component: _import('errorPage/401'), name: 'page401', title: 'page401', noCache: true },
      { path: '404', component: _import('errorPage/404'), name: 'page404', title: 'page404', noCache: true }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'log', component: _import('errorLog/index'), name: 'errorLog', title: 'errorLog', icon: 'bug' }]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'excel',

    title: 'excel',
    icon: 'excel',
    children: [
      { path: 'export-excel', component: _import('excel/exportExcel'), name: 'exportExcel', title: 'exportExcel' },
      {
        path: 'export-selected-excel',
        component: _import('excel/selectExcel'),
        name: 'selectExcel',
        title: 'selectExcel'
      },
      { path: 'upload-excel', component: _import('excel/uploadExcel'), name: 'uploadExcel', title: 'uploadExcel' }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    title: 'zip', icon: 'zip',
    children: [{ path: 'download', component: _import('zip/index'), name: 'exportZip', title: 'exportZip' }]
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'index', component: _import('theme/index'), name: 'theme', title: 'theme', icon: 'theme' }]
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [{
      path: 'index',
      component: _import('clipboard/index'),
      name: 'clipboardDemo',
      title: 'clipboardDemo',
      icon: 'clipboard'
    }]
  },

  {
    path: '/i18n',
    component: Layout,
    children: [{
      path: 'index',
      component: _import('i18n-demo/index'),
      name: 'i18n',
      title: 'i18n',
      icon: 'international'
    }]
  },

  {
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    name: 'system',
    icon: 'component',
    title: 'system',
    children: [
      { path: 'menu', component: _import('system/menus'), name: 'menu', icon: '', title: 'menu' },
      { path: 'org', component: _import('system/orgs'), name: 'org', icon: '', title: 'org' },
      { path: 'role', component: _import('system/roles'), name: 'role', icon: '', title: 'role' },
      // { path: 'auth', component: _import('system/auths'), name: '', icon: '', title: '授权管理' },
      { path: 'user', component: _import('system/users'), name: 'user', icon: '', title: 'user' },
      { path: 'visit', component: _import('system/visits'), name: 'visit', icon: '', title: 'visit' },
      { path: 'opt', component: _import('system/opts'), name: 'opt', icon: '', title: 'opt' }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
