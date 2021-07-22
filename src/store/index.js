import Vue from 'vue'
import Vuex from 'vuex'
import { asyncRouterHandle } from '@/utils/asyncRouter' // 模块引入方法
import { asyncMenu } from '@/api/menu'  // 获取当前用户的菜单信息
import { login } from '@/api/user'
// import { setUserInfo } from '@/api/user' 
import router from '@/router'

const routerList = []
const formatRouter = (routes) => {
  routes && routes.map(item => {
    if ((!item.children || item.children.every(ch => ch.hidden)) && item.name !== '404') {
      routerList.push({ label: item.meta.title, value: item.name })
    }
    if (item.children && item.children.length > 0) {
      formatRouter(item.children)
    }
  })
}
//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
export const store = new Vuex.Store({
  state: {
    //存放的键值对就是所要管理的状态
    user: {
      uuid: '',
      nickName: '测试账号',
      headerImg: 'http://qmplusimg.henrongyi.top/gva_header.jpg',
      authority: '',
      ID: ''
    },
    token: '',
    routerList: routerList,
    defaultRouter: 'authority',
    asyncRouters: [{
      path: '/layout',
      name: 'layout',
      component: 'view/layout/index.vue',
      meta: {
        title: '底层layout'
      },
      children: [
        {
          "ID": 3,
          "CreatedAt": "2021-06-15T15:06:25+08:00",
          "UpdatedAt": "2021-06-15T15:06:25+08:00",
          "parentId": "0",
          "path": "admin",
          "name": "superAdmin",
          "hidden": false,
          "component": "view/superAdmin/index.vue",
          "sort": 3,
          "meta": {
            "keepAlive": false,
            "defaultMenu": false,
            "title": "管理平台",
            "icon": "user-solid",
            "closeTab": false
          },
          "authoritys": null,
          "menuId": "3",
          "children": [
            {
              "ID": 4,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "3",
              "path": "authority",
              "name": "authority",
              "hidden": false,
              "component": "view/superAdmin/authority/authority.vue",
              "sort": 1,
              "meta": {
                "keepAlive": false,
                "defaultMenu": false,
                "title": "角色管理",
                "icon": "s-custom",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "4",
              "children": null,
              "parameters": [

              ]
            },
            {
              "ID": 19,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "3",
              "path": "dictionaryDetail/:id",
              "name": "dictionaryDetail",
              "hidden": true,
              "component": "view/superAdmin/dictionary/sysDictionaryDetail.vue",
              "sort": 1,
              "meta": {
                "keepAlive": false,
                "defaultMenu": false,
                "title": "字典详情",
                "icon": "s-order",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "19",
              "children": null,
              "parameters": [

              ]
            },
            {
              "ID": 5,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "3",
              "path": "menu",
              "name": "menu",
              "hidden": false,
              "component": "view/superAdmin/menu/menu.vue",
              "sort": 2,
              "meta": {
                "keepAlive": true,
                "defaultMenu": false,
                "title": "菜单管理",
                "icon": "s-order",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "5",
              "children": null,
              "parameters": [

              ]
            },
            {
              "ID": 6,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "3",
              "path": "api",
              "name": "api",
              "hidden": false,
              "component": "view/superAdmin/api/api.vue",
              "sort": 3,
              "meta": {
                "keepAlive": true,
                "defaultMenu": false,
                "title": "api管理",
                "icon": "s-platform",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "6",
              "children": null,
              "parameters": [

              ]
            },
            {
              "ID": 7,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "3",
              "path": "user",
              "name": "user",
              "hidden": false,
              "component": "view/superAdmin/user/user.vue",
              "sort": 4,
              "meta": {
                "keepAlive": false,
                "defaultMenu": false,
                "title": "用户管理",
                "icon": "coordinate",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "7",
              "children": null,
              "parameters": [

              ]
            },
            {
              "ID": 18,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "3",
              "path": "dictionary",
              "name": "dictionary",
              "hidden": false,
              "component": "view/superAdmin/dictionary/sysDictionary.vue",
              "sort": 5,
              "meta": {
                "keepAlive": false,
                "defaultMenu": false,
                "title": "字典管理",
                "icon": "notebook-2",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "18",
              "children": null,
              "parameters": [

              ]
            },
            {
              "ID": 20,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "3",
              "path": "operation",
              "name": "operation",
              "hidden": false,
              "component": "view/superAdmin/operation/sysOperationRecord.vue",
              "sort": 6,
              "meta": {
                "keepAlive": false,
                "defaultMenu": false,
                "title": "操作历史",
                "icon": "time",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "20",
              "children": null,
              "parameters": [

              ]
            }
          ],
          "parameters": [

          ]
        },
        {
          "ID": 9,
          "CreatedAt": "2021-06-15T15:06:25+08:00",
          "UpdatedAt": "2021-06-15T15:06:25+08:00",
          "parentId": "0",
          "path": "subject",
          "name": "subject",
          "hidden": false,
          "component": "view/subject/index.vue",
          "sort": 6,
          "meta": {
            "keepAlive": false,
            "defaultMenu": false,
            "title": "科研项目管理",
            "icon": "s-management",
            "closeTab": false
          },
          "authoritys": null,
          "menuId": "9",
          "children": [
            {
              "ID": 10,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "9",
              "path": "management",
              "name": "management",
              "hidden": false,
              "component": () => import("@/view/subject/management/management.vue"),
              "sort": 4,
              "meta": {
                "keepAlive": false,
                "defaultMenu": false,
                "title": "项目管理",
                "icon": "s-marketing",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "10",
              "children": null,
              "parameters": [

              ]
            },
            {
              "ID": 11,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "9",
              "path": "progress",
              "name": "progress",
              "hidden": false,
              "component": () => import("@/view/subject/progress/progress.vue"),
              "sort": 5,
              "meta": {
                "keepAlive": false,
                "defaultMenu": false,
                "title": "质量管理",
                "icon": "upload",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "11",
              "children": null,
              "parameters": [

              ]
            },
            {
              "ID": 12,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "9",
              "path": "document",
              "name": "document",
              "hidden": false,
              "component": () => import("@/view/subject/document/document.vue"),
              "sort": 6,
              "meta": {
                "keepAlive": false,
                "defaultMenu": false,
                "title": "成果管理",
                "icon": "upload",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "12",
              "children": null,
              "parameters": [

              ]
            },
            {
              "ID": 21,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "9",
              "path": "statistical",
              "name": "statistical",
              "hidden": false,
              "component": () => import("@/view/subject/statistical/statistical.vue"),
              "sort": 6,
              "meta": {
                "keepAlive": false,
                "defaultMenu": false,
                "title": "用户视图",
                "icon": "upload",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "21",
              "children": null,
              "parameters": [

              ]
            },
            {
              "ID": 13,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "9",
              "path": "GRFeditor",
              "name": "GRFeditor",
              "hidden": false,
              "component": () => import("@/view/subject/GRFeditor/GRFeditor.vue"),
              "sort": 7,
              "meta": {
                "keepAlive": false,
                "defaultMenu": false,
                "title": "药品管理",
                "icon": "s-custom",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "13",
              "children": null,
              "parameters": [

              ]
            },
            {
              "ID": 15,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "14",
              "path": "planEdit",
              "name": "planEdit",
              "hidden": false,
              "component": () => import("@/view/subject/planEdit/planEdit.vue"),
              "sort": 1,
              "meta": {
                "keepAlive": true,
                "defaultMenu": false,
                "title": "TMF管理",
                "icon": "cpu",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "15",
              "children": null,
              "parameters": [

              ]
            },
            // {
            //   "ID": 16,
            //   "CreatedAt": "2021-06-15T15:06:25+08:00",
            //   "UpdatedAt": "2021-06-15T15:06:25+08:00",
            //   "parentId": "14",
            //   "path": "centerManagement",
            //   "name": "centerManagement",
            //   "hidden": false,
            //   "component": () => import("@/view/subject/centerManagement/centerManagement.vue"),
            //   "sort": 2,
            //   "meta": {
            //     "keepAlive": true,
            //     "defaultMenu": false,
            //     "title": "中心管理",
            //     "icon": "magic-stick",
            //     "closeTab": false
            //   },
            //   "authoritys": null,
            //   "menuId": "16",
            //   "children": null,
            //   "parameters": [

            //   ]
            // }
          ],
          "parameters": [

          ]
        },
        {
          "ID": 23,
          "CreatedAt": "2021-06-15T15:06:25+08:00",
          "UpdatedAt": "2021-06-15T15:06:25+08:00",
          "parentId": "0",
          "path": "dataExtraction",
          "name": "dataExtraction",
          "hidden": false,
          "component": "view/dataExtraction/state.vue",
          "sort": 6,
          "meta": {
            "keepAlive": false,
            "defaultMenu": false,
            "title": "数据抽取",
            "icon": "cloudy",
            "closeTab": false
          },
          "authoritys": null,
          "menuId": "23",
          "children": null,
          "parameters": [

          ]
        },
        {
          "ID": 2,
          "CreatedAt": "2021-06-15T15:06:25+08:00",
          "UpdatedAt": "2021-06-15T15:06:25+08:00",
          "parentId": "0",
          "path": "database",
          "name": "database",
          "hidden": false,
          "component": "view/database/index.vue",
          "sort": 7,
          "meta": {
            "keepAlive": false,
            "defaultMenu": false,
            "title": "知识库",
            "icon": "info",
            "closeTab": false
          },
          "authoritys": null,
          "menuId": "2",
          "children": [
            {
              "ID": 16,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "14",
              "path": "retrieve",
              "name": "retrieve",
              "hidden": false,
              "component": () => import("@/view/database/retrieve/retrieve.vue"),
              "sort": 2,
              "meta": {
                "keepAlive": true,
                "defaultMenu": false,
                "title": "智能检索",
                "icon": "search",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "16",
              "children": null,
              "parameters": [
  
              ]
            },
            {
              "ID": 16,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "14",
              "path": "knowledgeMenu",
              "name": "knowledgeMenu",
              "hidden": false,
              "component": () => import("@/view/database/knowledgeMenu/knowledgeMenu.vue"),
              "sort": 2,
              "meta": {
                "keepAlive": true,
                "defaultMenu": false,
                "title": "知识目录",
                "icon": "notebook-1",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "16",
              "children": null,
              "parameters": [
  
              ]
            },
            {
              "ID": 16,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "14",
              "path": "dataEngine",
              "name": "dataEngine",
              "hidden": false,
              "component": () => import("@/view/database/dataEngine/dataEngine.vue"),
              "sort": 2,
              "meta": {
                "keepAlive": true,
                "defaultMenu": false,
                "title": "数据引擎",
                "icon": "cpu",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "16",
              "children": null,
              "parameters": [
  
              ]
            }
          ],
          "parameters": [

          ]
        },
        {
          "ID": 21,
          "CreatedAt": "2021-06-15T15:06:25+08:00",
          "UpdatedAt": "2021-06-15T15:06:25+08:00",
          "parentId": "0",
          "path": "clinicalCollect",
          "name": "clinicalCollect",
          "hidden": false,
          "component": () => import("@/view/clinicalCollect/index.vue"),
          "sort": 4,
          "meta": {
            "keepAlive": false,
            "defaultMenu": false,
            "title": "临床试验数据采集",
            "icon": "s-data",
            "closeTab": false
          },
          "authoritys": null,
          "menuId": "21",
          "children": [
            {
              "ID": 16,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "14",
              "path": "dataEntry",
              "name": "dataEntry",
              "hidden": false,
              "component": () => import("@/view/clinicalCollect/dataEntry/dataEntry.vue"),
              "sort": 2,
              "meta": {
                "keepAlive": false,
                "defaultMenu": false,
                "title": "数据录入",
                "icon": "document",
                "closeTab": false
              },
              "authoritys": null,
              "menuId": "16",
              "children": null,
              "parameters": [
  
              ]
            },
          ],
          "parameters": [
  
          ]
        },
        {
          "ID": 8,
          "CreatedAt": "2021-06-15T15:06:25+08:00",
          "UpdatedAt": "2021-06-15T15:06:25+08:00",
          "parentId": "0",
          "path": "person",
          "name": "person",
          "hidden": true,
          "component": "view/person/person.vue",
          "sort": 4,
          "meta": {
            "keepAlive": false,
            "defaultMenu": false,
            "title": "个人信息",
            "icon": "message-solid",
            "closeTab": false
          },
          "authoritys": null,
          "menuId": "8",
          "children": null,
          "parameters": [

          ]
        }
      ]
    }]
  },
  getters: {
    userInfo (state) {
      return state.user
    },
    token (state) {
      return state.token
    },
    // 获取动态路由
    asyncRouters (state) {
      return state.asyncRouters
    },
    routerList (state) {
      return state.routerList
    },
    defaultRouter (state) {
      return state.defaultRouter
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.user = userInfo
    },
    setToken (state, token) {
      state.token = token
    },
    userOut (state) {
      state.user = {}
      token = ''
      sessionStorage.clear()
      router.push({ name: 'Login', replace: true })
      window.location.reload()
    },
    setAsyncRouters (state, asyncRouters) {
      state.asyncRouters = asyncRouters
    },
    setRouterList (state, routerList) {
      state.routerList = routerList
    }
  },
  actions: {
    async loginIn ({ commit, dispatch, getters }, loginFoem) {
      const res = await login(loginFoem)
      if (res.code === 0) {
        commit('setUserInfo', res.user)
        commit('setToken', res.token)
        await dispatch('SetAsyncRouter', {}, { root: true })
        const asyncRouters = getters.asyncRouters
        router.addRoutes(asyncRouters)
        router.push({ name: getters['userInfo'].authority.defaultRouter })
        return true
      }
    },
    async SetAsyncRouter ({ commit }) {
      const baseRouter = [{
        path: '/layout',
        name: 'layout',
        component: 'view/layout/index.vue',
        meta: {
          title: '底层layout'
        },
        children: []
      }]
      const asyncRouterRes = await asyncMenu() // 获取当前登登录用户的菜单信息
      if (asyncRouterRes.code !== 0) {
        return
      }
      const asyncRouter = asyncRouterRes.data && asyncRouterRes.data.menus
      asyncRouter.push({
        path: '404',
        name: '404',
        hidden: true,
        meta: {
          title: '迷路了*。*'
        },
        component: 'view/error/index.vue'
      })
      formatRouter(asyncRouter) //遍历路由选项，供select使用
      baseRouter[0].children = asyncRouter  // 将后台返回的路由放入baseRouter的children中

      asyncRouterHandle(baseRouter) //将后台返回的路由模块转化为系统地址
      commit('setAsyncRouter', baseRouter)
      commit('setRouterList', routerList)
      return true
    }
  }
})

export default store