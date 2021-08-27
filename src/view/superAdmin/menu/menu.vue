<template>
  <div>
    <div class="button-box clearflex">
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="addMenu('0')"
      >新增根菜单</el-button>
    </div>

    <!-- 由于此处菜单跟左侧列表一一对应所以不需要分页 pageSize默认999 -->
    <el-table
      :data="tableData"
      border
      row-key="ID"
      stripe
    >
      <el-table-column
        label="ID"
        min-width="100"
        prop="ID"
      />
      <el-table-column
        label="路由Name"
        min-width="160"
        prop="name"
      />
      <el-table-column
        label="路由Path"
        min-width="160"
        prop="path"
      />
      <el-table-column
        label="是否隐藏"
        min-width="100"
        prop="hidden"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.hidden?"隐藏":"显示" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="父节点"
        min-width="90"
        prop="parentId"
      />
      <el-table-column
        label="排序"
        min-width="70"
        prop="sort"
      />
      <el-table-column
        label="文件路径"
        min-width="360"
        prop="component"
      />
      <el-table-column
        label="展示名称"
        min-width="120"
        prop="authorityName"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.meta.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="图标"
        min-width="140"
        prop="authorityName"
      >
        <template slot-scope="scope">
          <i :class="`el-icon-${scope.row.meta.icon}`" />
          <span>{{ scope.row.meta.icon }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="350"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="addMenu(scope.row.ID)"
          >添加子菜单</el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="editMenu(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteMenu(scope.row.ID)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :before-close="handleClose"
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="menuForm"
        :inline="true"
        :model="form"
        :rules="rules"
        label-position="top"
        label-width="85px"
      >
        <el-form-item
          label="路由name"
          prop="path"
          style="width:30%"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="唯一英文字符串"
            @change="changeName"
          />
        </el-form-item>
        <el-form-item
          prop="path"
          style="width:30%"
        >
          <div
            slot="label"
            style="display:inline-block"
          >
            路由path
            <el-checkbox
              v-model="checkFlag"
              style="float:right;margin-left:20px;"
            >添加参数</el-checkbox>
          </div>
          <el-input
            v-model="form.path"
            :disabled="!checkFlag"
            autocomplete="off"
            placeholder="建议只在后方拼接参数"
          />
        </el-form-item>
        <el-form-item
          label="是否隐藏"
          style="width:30%"
        >
          <el-select
            v-model="form.hidden"
            placeholder="是否在列表隐藏"
          >
            <el-option
              :value="false"
              label="否"
            />
            <el-option
              :value="true"
              label="是"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="父节点Id"
          style="width:30%"
        >
          <el-cascader
            v-model="form.parentId"
            :disabled="!isEdit"
            :options="menuOption"
            :props="{ checkStrictly: true,label:'title',value:'ID',disabled:'disabled',emitPath:false}"
            :show-all-levels="false"
            filterable
          />
        </el-form-item>
        <el-form-item
          label="文件路径"
          prop="component"
          style="width:60%"
        >
          <el-input
            v-model="form.component"
            autocomplete="off"
          />
          <span style="font-size:12px;margin-right:12px;">如果菜单包含子菜单，请创建router-view二级路由页面或者</span>
          <el-button
            size="mini"
            @click="form.component = 'view/routerHolder.vue'"
          >点我设置</el-button>
        </el-form-item>
        <el-form-item
          label="展示名称"
          prop="meta.title"
          style="width:30%"
        >
          <el-input
            v-model="form.meta.title"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="图标"
          prop="meta.icon"
          style="width:30%"
        >
          <icon :meta="form.meta">
            <template slot="prepend">el-icon-</template>
          </icon>
        </el-form-item>
        <el-form-item
          label="排序标记"
          prop="sort"
          style="width:30%"
        >
          <el-input
            v-model.number="form.sort"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="keepAlive"
          prop="meta.keepAlive"
          style="width:30%"
        >
          <el-select
            v-model="form.meta.keepAlive"
            placeholder="是否keepAlive缓存页面"
          >
            <el-option
              :value="false"
              label="否"
            />
            <el-option
              :value="true"
              label="是"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="closeTab"
          prop="meta.closeTab"
          style="width:30%"
        >
          <el-select
            v-model="form.meta.closeTab"
            placeholder="是否自动关闭tab"
          >
            <el-option
              :value="false"
              label="否"
            />
            <el-option
              :value="true"
              label="是"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <!-- <div class="warning">新增菜单需要在角色管理内配置权限才可使用</div> -->
      <div>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-edit"
          @click="addParameter(form)"
        >新增菜单参数</el-button>
        <el-table
          :data="form.parameters"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="type"
            label="参数类型"
            width="180"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.type"
                placeholder="请选择"
              >
                <el-option
                  key="query"
                  value="query"
                  label="query"
                />
                <el-option
                  key="params"
                  value="params"
                  label="params"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="key"
            label="参数key"
            width="180"
          >
            <template slot-scope="scope">
              <div>
                <el-input v-model="scope.row.key" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="value"
            label="参数值"
          >
            <template slot-scope="scope">
              <div>
                <el-input v-model="scope.row.value" />
              </div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div>
                <el-button
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  @click="deleteParameter(form.parameters,scope.$index)"
                >删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="closeDialog">取 消</el-button>
        <el-button
          type="primary"
          @click="enterDialog"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 获取列表内容封装在mixins内部  getTableData方法 初始化已封装完成

// import {
//   updateBaseMenu,
//   getMenuList,
//   addBaseMenu,
//   deleteBaseMenu,
//   getBaseMenuById
// } from '@/api/menu'
// import infoList from '@/mixins/infoList'
import icon from '@/view/superAdmin/menu/icon'
export default {
  name: 'Menus',
  components: {
    icon
  },
  // mixins: [infoList],
  data () {
    return {
      checkFlag: false,
      // listApi: getMenuList,
      dialogFormVisible: false,
      dialogTitle: '新增菜单',
      menuOption: [
        {
          ID: '0',
          title: '根菜单'
        }
      ],
      form: {
        ID: 0,
        path: '',
        name: '',
        hidden: '',
        parentId: '',
        component: '',
        meta: {
          title: '',
          icon: '',
          defaultMenu: false,
          closeTab: false,
          keepAlive: false
        },
        parameters: []
      },
      rules: {
        path: [{ required: true, message: '请输入菜单name', trigger: 'blur' }],
        component: [
          { required: true, message: '请输入文件路径', trigger: 'blur' }
        ],
        'meta.title': [
          { required: true, message: '请输入菜单展示名称', trigger: 'blur' }
        ]
      },
      isEdit: false,
      test: '',
      tableData: [
        {
          "ID": 22,
          "CreatedAt": "2021-06-15T15:06:25+08:00",
          "UpdatedAt": "2021-06-15T15:06:25+08:00",
          "parentId": "0",
          "path": "https://www.gin-vue-admin.com",
          "name": "https://www.gin-vue-admin.com",
          "hidden": false,
          "component": "/",
          "sort": 0,
          "meta": {
            "keepAlive": false,
            "defaultMenu": false,
            "title": "官方网站",
            "icon": "s-home",
            "closeTab": false
          },
          "authoritys": null,
          "children": null,
          "parameters": [

          ]
        },
        {
          "ID": 1,
          "CreatedAt": "2021-06-15T15:06:25+08:00",
          "UpdatedAt": "2021-06-15T15:06:25+08:00",
          "parentId": "0",
          "path": "dashboard",
          "name": "dashboard",
          "hidden": false,
          "component": "view/dashboard/index.vue",
          "sort": 1,
          "meta": {
            "keepAlive": false,
            "defaultMenu": false,
            "title": "仪表盘",
            "icon": "setting",
            "closeTab": false
          },
          "authoritys": null,
          "children": null,
          "parameters": [

          ]
        },
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
            //   "children": null,
            //   "parameters": [

            //   ]
            // }
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
          "children": null,
          "parameters": [

          ]
        },
        {
          "ID": 14,
          "CreatedAt": "2021-06-15T15:06:25+08:00",
          "UpdatedAt": "2021-06-15T15:06:25+08:00",
          "parentId": "0",
          "path": "systemTools",
          "name": "systemTools",
          "hidden": false,
          "component": "view/systemTools/index.vue",
          "sort": 5,
          "meta": {
            "keepAlive": false,
            "defaultMenu": false,
            "title": "系统工具",
            "icon": "s-cooperation",
            "closeTab": false
          },
          "authoritys": null,
          "children": [
            {
              "ID": 15,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "14",
              "path": "autoCode",
              "name": "autoCode",
              "hidden": false,
              "component": "view/systemTools/autoCode/index.vue",
              "sort": 1,
              "meta": {
                "keepAlive": true,
                "defaultMenu": false,
                "title": "代码生成器",
                "icon": "cpu",
                "closeTab": false
              },
              "authoritys": null,
              "children": null,
              "parameters": [

              ]
            },
            {
              "ID": 16,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "14",
              "path": "formCreate",
              "name": "formCreate",
              "hidden": false,
              "component": "view/systemTools/formCreate/index.vue",
              "sort": 2,
              "meta": {
                "keepAlive": true,
                "defaultMenu": false,
                "title": "表单生成器",
                "icon": "magic-stick",
                "closeTab": false
              },
              "authoritys": null,
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
          "path": "example",
          "name": "example",
          "hidden": false,
          "component": "view/example/index.vue",
          "sort": 6,
          "meta": {
            "keepAlive": false,
            "defaultMenu": false,
            "title": "示例文件",
            "icon": "s-management",
            "closeTab": false
          },
          "authoritys": null,
          "children": [
            {
              "ID": 10,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "9",
              "path": "excel",
              "name": "excel",
              "hidden": false,
              "component": "view/example/excel/excel.vue",
              "sort": 4,
              "meta": {
                "keepAlive": false,
                "defaultMenu": false,
                "title": "excel导入导出",
                "icon": "s-marketing",
                "closeTab": false
              },
              "authoritys": null,
              "children": null,
              "parameters": [

              ]
            },
            {
              "ID": 11,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "9",
              "path": "upload",
              "name": "upload",
              "hidden": false,
              "component": "view/example/upload/upload.vue",
              "sort": 5,
              "meta": {
                "keepAlive": false,
                "defaultMenu": false,
                "title": "媒体库（上传下载）",
                "icon": "upload",
                "closeTab": false
              },
              "authoritys": null,
              "children": null,
              "parameters": [

              ]
            },
            {
              "ID": 12,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "9",
              "path": "breakpoint",
              "name": "breakpoint",
              "hidden": false,
              "component": "view/example/breakpoint/breakpoint.vue",
              "sort": 6,
              "meta": {
                "keepAlive": false,
                "defaultMenu": false,
                "title": "断点续传",
                "icon": "upload",
                "closeTab": false
              },
              "authoritys": null,
              "children": null,
              "parameters": [

              ]
            },
            {
              "ID": 21,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "9",
              "path": "simpleUploader",
              "name": "simpleUploader",
              "hidden": false,
              "component": "view/example/simpleUploader/simpleUploader",
              "sort": 6,
              "meta": {
                "keepAlive": false,
                "defaultMenu": false,
                "title": "断点续传（插件版）",
                "icon": "upload",
                "closeTab": false
              },
              "authoritys": null,
              "children": null,
              "parameters": [

              ]
            },
            {
              "ID": 13,
              "CreatedAt": "2021-06-15T15:06:25+08:00",
              "UpdatedAt": "2021-06-15T15:06:25+08:00",
              "parentId": "9",
              "path": "customer",
              "name": "customer",
              "hidden": false,
              "component": "view/example/customer/customer.vue",
              "sort": 7,
              "meta": {
                "keepAlive": false,
                "defaultMenu": false,
                "title": "客户列表（资源示例）",
                "icon": "s-custom",
                "closeTab": false
              },
              "authoritys": null,
              "children": null,
              "parameters": [

              ]
            }
          ],
          "parameters": [

          ]
        },
        {
          "ID": 23,
          "CreatedAt": "2021-06-15T15:06:25+08:00",
          "UpdatedAt": "2021-06-15T15:06:25+08:00",
          "parentId": "0",
          "path": "state",
          "name": "state",
          "hidden": false,
          "component": "view/system/state.vue",
          "sort": 6,
          "meta": {
            "keepAlive": false,
            "defaultMenu": false,
            "title": "服务器状态",
            "icon": "cloudy",
            "closeTab": false
          },
          "authoritys": null,
          "children": null,
          "parameters": [

          ]
        },
        {
          "ID": 2,
          "CreatedAt": "2021-06-15T15:06:25+08:00",
          "UpdatedAt": "2021-06-15T15:06:25+08:00",
          "parentId": "0",
          "path": "about",
          "name": "about",
          "hidden": false,
          "component": "view/about/index.vue",
          "sort": 7,
          "meta": {
            "keepAlive": false,
            "defaultMenu": false,
            "title": "关于我们",
            "icon": "info",
            "closeTab": false
          },
          "authoritys": null,
          "children": null,
          "parameters": [

          ]
        }
      ]
    }
  },
  async created () {
    this.pageSize = 999
    await this.getTableData()
  },
  methods: {
    addParameter (form) {
      if (!form.parameters) {
        this.$set(form, 'parameters', [])
      }
      form.parameters.push({
        type: 'query',
        key: '',
        value: ''
      })
    },
    deleteParameter (parameters, index) {
      parameters.splice(index, 1)
    },
    changeName () {
      this.form.path = this.form.name
    },
    setOptions () {
      this.menuOption = [
        {
          ID: '0',
          title: '根目录'
        }
      ]
      this.setMenuOptions(this.tableData, this.menuOption, false)
    },
    setMenuOptions (menuData, optionsData, disabled) {
      menuData &&
        menuData.map(item => {
          if (item.children && item.children.length) {
            const option = {
              title: item.meta.title,
              ID: String(item.ID),
              disabled: disabled || item.ID === this.form.ID,
              children: []
            }
            this.setMenuOptions(
              item.children,
              option.children,
              disabled || item.ID === this.form.ID
            )
            optionsData.push(option)
          } else {
            const option = {
              title: item.meta.title,
              ID: String(item.ID),
              disabled: disabled || item.ID === this.form.ID
            }
            optionsData.push(option)
          }
        })
    },
    handleClose (done) {
      this.initForm()
      done()
    },
    // 懒加载子菜单
    load (tree, treeNode, resolve) {
      resolve([
        {
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }
      ])
    },
    // 删除菜单
    deleteMenu (ID) {
      this.$confirm('此操作将永久删除所有角色下该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await deleteBaseMenu({ ID })
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            if (this.tableData.length === 1 && this.page > 1) {
              this.page--
            }
            this.getTableData()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 初始化弹窗内表格方法
    initForm () {
      this.checkFlag = false
      this.$refs.menuForm.resetFields()
      this.form = {
        ID: 0,
        path: '',
        name: '',
        hidden: '',
        parentId: '',
        component: '',
        meta: {
          title: '',
          icon: '',
          defaultMenu: false,
          keepAlive: ''
        }
      }
    },
    // 关闭弹窗
    closeDialog () {
      this.initForm()
      this.dialogFormVisible = false
    },
    // 添加menu
    async enterDialog () {
      this.$refs.menuForm.validate(async valid => {
        if (valid) {
          let res
          if (this.isEdit) {
            res = await updateBaseMenu(this.form)
          } else {
            res = await addBaseMenu(this.form)
          }
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: this.isEdit ? '编辑成功' : '添加成功!'
            })
            this.getTableData()
          }
          this.initForm()
          this.dialogFormVisible = false
        }
      })
    },
    // 添加菜单方法，id为 0则为添加根菜单
    addMenu (id) {
      this.dialogTitle = '新增菜单'
      this.form.parentId = String(id)
      this.isEdit = false
      this.setOptions()
      this.dialogFormVisible = true
    },
    // 修改菜单方法
    async editMenu (row) {
      this.dialogTitle = '编辑菜单'
      // const res = await getBaseMenuById({ id })
      this.form = row
      this.isEdit = true
      this.setOptions()
      this.dialogFormVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
.button-box {
  padding: 10px 20px;
  .el-button {
    float: right;
  }
}
.warning {
  color: #dc143c;
}
</style>
