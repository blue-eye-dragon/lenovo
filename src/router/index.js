import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 获取原型对象上的push函数
const originalPush = Router.prototype.push
// 修改原型对象中的push方法
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const baseRouters = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/init',
    name: 'Init',
    component: () => import('@/view/init/index')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/view/login/index')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/view/layout/index.vue'),
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
        "component": () => import('@/view/superAdmin/index.vue'),
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
            "component": () => import("@/view/superAdmin/authority/authority.vue"),
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
            "component": () => import("@/view/superAdmin/dictionary/sysDictionaryDetail.vue"),
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
            "component": () => import("@/view/superAdmin/menu/menu.vue"),
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
            "component": () => import("@/view/superAdmin/api/api.vue"),
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
            "component": () => import("@/view/superAdmin/user/user.vue"),
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
            "component": () => import("@/view/superAdmin/dictionary/sysDictionary.vue"),
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
            "component": () => import("@/view/superAdmin/operation/sysOperationRecord.vue"),
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
        "component": () => import("@/view/subject/index.vue"),
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
            "component": () => import("@/view/subject/management/index.vue"),
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
            "children": [
              {
                "ID": 11,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "9",
                "path": "project",
                "name": "project",
                "hidden": false,
                "component": () => import("@/view/subject/management/project/project.vue"),
                "sort": 1,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "课题管理",
                  "icon": "s-marketing",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "11",
                "children": [],
                "parameters": []
              },
              {
                "ID": 12,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "9",
                "path": "performance",
                "name": "performance",
                "hidden": false,
                "component": () => import("@/view/subject/management/performance/performance.vue"),
                "sort": 2,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "绩效管理",
                  "icon": "s-marketing",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "12",
                "children": [],
                "parameters": []
              },
              {
                "ID": 13,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "9",
                "path": "contract",
                "name": "contract",
                "hidden": false,
                "component": () => import("@/view/subject/management/contract/contract.vue"),
                "sort": 3,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "科研合同管理",
                  "icon": "s-marketing",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "13",
                "children": [],
                "parameters": []
              },
              {
                "ID": 14,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "9",
                "path": "funding",
                "name": "funding",
                "hidden": false,
                "component": () => import("@/view/subject/management/funding/funding.vue"),
                "sort": 4,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "科研经费管理",
                  "icon": "s-marketing",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "14",
                "children": [],
                "parameters": []
              },
            ],
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
            "path": "achievement",
            "name": "achievement",
            "hidden": false,
            "component": () => import("@/view/subject/achievement/index.vue"),
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
            "children": [
              {
                "ID": 11,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "9",
                "path": "monopolization",
                "name": "monopolization",
                "hidden": false,
                "component": () => import("@/view/subject/achievement/monopolization/monopolization.vue"),
                "sort": 1,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "专利管理",
                  "icon": "s-marketing",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "11",
                "children": [],
                "parameters": []
              },
              {
                "ID": 12,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "9",
                "path": "thesis",
                "name": "thesis",
                "hidden": false,
                "component": () => import("@/view/subject/achievement/thesis/thesis.vue"),
                "sort": 2,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "论文管理",
                  "icon": "s-marketing",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "12",
                "children": [],
                "parameters": []
              },
              {
                "ID": 13,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "9",
                "path": "winning",
                "name": "winning",
                "hidden": false,
                "component": () => import("@/view/subject/achievement/winning/winning.vue"),
                "sort": 3,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "获奖管理",
                  "icon": "s-marketing",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "13",
                "children": [],
                "parameters": []
              },
              {
                "ID": 14,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "9",
                "path": "academicWork",
                "name": "academicWork",
                "hidden": false,
                "component": () => import("@/view/subject/achievement/academicWork/academicWork.vue"),
                "sort": 4,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "学术著作",
                  "icon": "s-marketing",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "14",
                "children": [],
                "parameters": []
              },
              {
                "ID": 15,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "9",
                "path": "achievementsAppraisal",
                "name": "achievementsAppraisal",
                "hidden": false,
                "component": () => import("@/view/subject/achievement/achievementsAppraisal/achievementsAppraisal.vue"),
                "sort": 5,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "成果鉴定",
                  "icon": "s-marketing",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "15",
                "children": [],
                "parameters": []
              },
              {
                "ID": 16,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "9",
                "path": "achievementsTransformation",
                "name": "achievementsTransformation",
                "hidden": false,
                "component": () => import("@/view/subject/achievement/achievementsTransformation/achievementsTransformation.vue"),
                "sort": 6,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "成果转化",
                  "icon": "s-marketing",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "16",
                "children": [],
                "parameters": []
              },
            ],
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
            "component": () => import("@/view/subject/GRFeditor/index.vue"),
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
            "path": "TMF",
            "name": "TMF",
            "hidden": false,
            "component": () => import("@/view/subject/TMF/index.vue"),
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
            "children": [
              {
                "ID": 11,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "9",
                "path": "TMFmanage",
                "name": "TMFmanage",
                "hidden": false,
                "component": () => import("@/view/subject/TMF/TMFmanage/TMFmanage.vue"),
                "sort": 1,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "TMF管理",
                  "icon": "s-marketing",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "11",
                "children": [],
                "parameters": []
              },
              {
                "ID": 12,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "9",
                "path": "template",
                "name": "template",
                "hidden": false,
                "component": () => import("@/view/subject/TMF/template/template.vue"),
                "sort": 2,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "模板管理",
                  "icon": "s-marketing",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "12",
                "children": [],
                "parameters": []
              },
              {
                "ID": 13,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "9",
                "path": "quality",
                "name": "quality",
                "hidden": false,
                "component": () => import("@/view/subject/TMF/quality/quality.vue"),
                "sort": 3,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "质量管理",
                  "icon": "s-marketing",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "13",
                "children": [],
                "parameters": []
              },
              {
                "ID": 14,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "9",
                "path": "specification",
                "name": "specification",
                "hidden": false,
                "component": () => import("@/view/subject/TMF/specification/specification.vue"),
                "sort": 4,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "规范说明",
                  "icon": "s-marketing",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "14",
                "children": [],
                "parameters": []
              },
            ],
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
          //   "component": () => import("@/view/subject/centerManagement/centerindex.vue"),
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
        "component": () => import("@/view/dataExtraction/state.vue"),
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
        "component": () => import("@/view/database/index.vue"),
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
          {
            "ID": 17,
            "CreatedAt": "2021-06-15T15:06:25+08:00",
            "UpdatedAt": "2021-06-15T15:06:25+08:00",
            "parentId": "14",
            "path": "editCheck",
            "name": "editCheck",
            "hidden": false,
            "component": () => import("@/view/clinicalCollect/editCheck/editCheck.vue"),
            "sort": 3,
            "meta": {
              "keepAlive": false,
              "defaultMenu": false,
              "title": "编辑检查",
              "icon": "edit",
              "closeTab": false
            },
            "authoritys": null,
            "menuId": "17",
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
        "component": () => import("@/view/person/person.vue"),
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
  }
]

// 需要通过后台数据来生成的组件

const createRouter = () => new Router({
  routes: baseRouters
})

const router = createRouter()

export default router
