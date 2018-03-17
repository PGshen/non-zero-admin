const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  // role manager
  roleList: state => state.role.roles,
  // user manager
  userList: state => state.users.users,
  // menu manager
  menuTree: state => state.menu.menuTree,
  menuList: state => state.menu.menuList,
  // org manager
  orgTree: state => state.org.orgTree,
  orgList: state => state.org.orgTree
}
export default getters
