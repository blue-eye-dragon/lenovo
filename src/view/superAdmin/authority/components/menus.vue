<template>
  <div>
    <div class="clearflex">
      <el-button
        class="fl-right"
        size="small"
        type="primary"
        @click="relation"
      >确 定</el-button>
    </div>
    <el-tree
      ref="menuTree"
      :data="menuTreeData"
      :default-checked-keys="menuTreeIds"
      :props="menuDefaultProps"
      default-expand-all
      highlight-current
      node-key="ID"
      show-checkbox
      @check="nodeChange"
    >
      <span
        slot-scope="{ node , data }"
        class="custom-tree-node"
      >
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            :style="{color:row.defaultRouter === data.name?'#E6A23C':'#85ce61'}"
            :disabled="!node.checked"
            @click="() => setDefault(data)"
          >
            {{ row.defaultRouter === data.name?"首页":"设为首页" }}
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
// import { getBaseMenuTree, getMenuAuthority, addMenuAuthority } from '@/api/menu'
// import {
//   updateAuthority
// } from '@/api/authority'
export default {
  name: 'Menus',
  props: {
    row: {
      default: function () {
        return {}
      },
      type: Object
    }
  },
  data () {
    return {
      menuTreeData: [],
      menuTreeIds: [],
      needConfirm: false,
      menuDefaultProps: {
        children: 'children',
        label: function (data) {
          return data.meta.title
        }
      }
    }
  },
  async created () {
    // 获取所有菜单树
    const res = [
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
            "ID": 8,
            "CreatedAt": "2021-06-15T15:06:25+08:00",
            "UpdatedAt": "2021-06-15T15:06:25+08:00",
            "parentId": "3",
            "path": "organizational",
            "name": "organizational",
            "hidden": false,
            "component": () => import("@/view/superAdmin/organizational/organizational.vue"),
            "sort": 6,
            "meta": {
              "keepAlive": false,
              "defaultMenu": false,
              "title": "机构管理",
              "icon": "notebook-2",
              "closeTab": false
            },
            "authoritys": null,
            "menuId": "8",
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
          // {
          //   "ID": 20,
          //   "CreatedAt": "2021-06-15T15:06:25+08:00",
          //   "UpdatedAt": "2021-06-15T15:06:25+08:00",
          //   "parentId": "3",
          //   "path": "operation",
          //   "name": "operation",
          //   "hidden": false,
          //   "component": "view/superAdmin/operation/sysOperationRecord.vue",
          //   "sort": 6,
          //   "meta": {
          //     "keepAlive": false,
          //     "defaultMenu": false,
          //     "title": "操作历史",
          //     "icon": "time",
          //     "closeTab": false
          //   },
          //   "authoritys": null,
          //   "menuId": "20",
          //   "children": null,
          //   "parameters": [

          //   ]
          // }
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
            "path": "medicinesManage",
            "name": "medicinesManage",
            "hidden": false,
            "component": () => import("@/view/subject/medicinesManage/index.vue"),
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
            "children": [
              {
                "ID": 15,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "0",
                "path": "drugList",
                "name": "drugList",
                "hidden": false,
                "component": () => import("@/view/subject/medicinesManage/drugList/index.vue"),
                "sort": 1,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "药品列表",
                  "icon": "message-solid",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "15",
                "children": null,
                "parameters": [
                ]
              },
              {
                "ID": 16,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "0",
                "path": "drugUsing",
                "name": "drugUsing",
                "hidden": false,
                "component": () => import("@/view/subject/medicinesManage/drugUsing/index.vue"),
                "sort": 2,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "药品使用",
                  "icon": "message-solid",
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
                "parentId": "0",
                "path": "manageAndRecord",
                "name": "manageAndRecord",
                "hidden": false,
                "component": () => import("@/view/subject/medicinesManage/manageAndRecord/index.vue"),
                "sort": 3,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "药品记录",
                  "icon": "message-solid",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "17",
                "children": null,
                "parameters": [
                ]
              },
              {
                "ID": 21,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "0",
                "path": "manageSpecification",
                "name": "manageSpecification",
                "hidden": true,
                "component": () => import("@/view/subject/medicinesManage/manageSpecification/index.vue"),
                "sort": 4,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "管理规范",
                  "icon": "message-solid",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "21",
                "children": null,
                "parameters": [

                ]
              },
              {
                "ID": 22,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "0",
                "path": "instructions",
                "name": "instructions",
                "hidden": true,
                "component": () => import("@/view/subject/medicinesManage/instructions/index.vue"),
                "sort": 4,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "说明书",
                  "icon": "message-solid",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "22",
                "children": null,
                "parameters": [

                ]
              },
              {
                "ID": 23,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "0",
                "path": "recordInformation",
                "name": "recordInformation",
                "hidden": true,
                "component": () => import("@/view/subject/medicinesManage/recordInformation/index.vue"),
                "sort": 4,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "记录信息",
                  "icon": "message-solid",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "23",
                "children": null,
                "parameters": [

                ]
              }
            ],
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
          "title": "科研库",
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
    this.menuTreeData = res

    const res1 = [
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
            "ID": 8,
            "CreatedAt": "2021-06-15T15:06:25+08:00",
            "UpdatedAt": "2021-06-15T15:06:25+08:00",
            "parentId": "3",
            "path": "organizational",
            "name": "organizational",
            "hidden": false,
            "component": () => import("@/view/superAdmin/organizational/organizational.vue"),
            "sort": 6,
            "meta": {
              "keepAlive": false,
              "defaultMenu": false,
              "title": "机构管理",
              "icon": "notebook-2",
              "closeTab": false
            },
            "authoritys": null,
            "menuId": "8",
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
          // {
          //   "ID": 20,
          //   "CreatedAt": "2021-06-15T15:06:25+08:00",
          //   "UpdatedAt": "2021-06-15T15:06:25+08:00",
          //   "parentId": "3",
          //   "path": "operation",
          //   "name": "operation",
          //   "hidden": false,
          //   "component": "view/superAdmin/operation/sysOperationRecord.vue",
          //   "sort": 6,
          //   "meta": {
          //     "keepAlive": false,
          //     "defaultMenu": false,
          //     "title": "操作历史",
          //     "icon": "time",
          //     "closeTab": false
          //   },
          //   "authoritys": null,
          //   "menuId": "20",
          //   "children": null,
          //   "parameters": [

          //   ]
          // }
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
            "path": "medicinesManage",
            "name": "medicinesManage",
            "hidden": false,
            "component": () => import("@/view/subject/medicinesManage/index.vue"),
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
            "children": [
              {
                "ID": 15,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "0",
                "path": "drugList",
                "name": "drugList",
                "hidden": false,
                "component": () => import("@/view/subject/medicinesManage/drugList/index.vue"),
                "sort": 1,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "药品列表",
                  "icon": "message-solid",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "15",
                "children": null,
                "parameters": [
                ]
              },
              {
                "ID": 16,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "0",
                "path": "drugUsing",
                "name": "drugUsing",
                "hidden": false,
                "component": () => import("@/view/subject/medicinesManage/drugUsing/index.vue"),
                "sort": 2,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "药品使用",
                  "icon": "message-solid",
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
                "parentId": "0",
                "path": "manageAndRecord",
                "name": "manageAndRecord",
                "hidden": false,
                "component": () => import("@/view/subject/medicinesManage/manageAndRecord/index.vue"),
                "sort": 3,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "药品记录",
                  "icon": "message-solid",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "17",
                "children": null,
                "parameters": [
                ]
              },
              {
                "ID": 21,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "0",
                "path": "manageSpecification",
                "name": "manageSpecification",
                "hidden": true,
                "component": () => import("@/view/subject/medicinesManage/manageSpecification/index.vue"),
                "sort": 4,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "管理规范",
                  "icon": "message-solid",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "21",
                "children": null,
                "parameters": [

                ]
              },
              {
                "ID": 22,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "0",
                "path": "instructions",
                "name": "instructions",
                "hidden": true,
                "component": () => import("@/view/subject/medicinesManage/instructions/index.vue"),
                "sort": 4,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "说明书",
                  "icon": "message-solid",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "22",
                "children": null,
                "parameters": [

                ]
              },
              {
                "ID": 23,
                "CreatedAt": "2021-06-15T15:06:25+08:00",
                "UpdatedAt": "2021-06-15T15:06:25+08:00",
                "parentId": "0",
                "path": "recordInformation",
                "name": "recordInformation",
                "hidden": true,
                "component": () => import("@/view/subject/medicinesManage/recordInformation/index.vue"),
                "sort": 4,
                "meta": {
                  "keepAlive": false,
                  "defaultMenu": false,
                  "title": "记录信息",
                  "icon": "message-solid",
                  "closeTab": false
                },
                "authoritys": null,
                "menuId": "23",
                "children": null,
                "parameters": [

                ]
              }
            ],
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
          "title": "科研库",
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
    const menus = res1
    const arr = []
    menus.map(item => {
      // 防止直接选中父级造成全选
      if (!menus.some(same => same.parentId === item.menuId)) {
        arr.push(Number(item.menuId))
      }
    })
    this.menuTreeIds = arr
  },
  methods: {
    async setDefault (data) {
      const res = await updateAuthority({ authorityId: this.row.authorityId, AuthorityName: this.row.authorityName, parentId: this.row.parentId, defaultRouter: data.name })
      if (res.code === 0) {
        this.$message({ type: 'success', message: '设置成功' })
        this.row.defaultRouter = res.data.authority.defaultRouter
      }
    },
    nodeChange () {
      this.needConfirm = true
    },
    // 暴露给外层使用的切换拦截统一方法
    enterAndNext () {
      this.relation()
    },
    // 关联树 确认方法
    async relation () {
      const checkArr = this.$refs.menuTree.getCheckedNodes(false, true)
      const res = await addMenuAuthority({
        menus: checkArr,
        authorityId: this.row.authorityId
      })
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '菜单设置成功!'
        })
      }
    }
  }
}
</script>
