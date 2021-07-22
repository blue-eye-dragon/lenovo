<template>
  <div>
    <div class="search-term">
      <el-form :inline="true"
               :model="searchInfo"
               class="demo-form-inline">
        <el-form-item label="请求方法">
          <el-input v-model="searchInfo.method"
                    placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="请求路径">
          <el-input v-model="searchInfo.path"
                    placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="结果状态码">
          <el-input v-model="searchInfo.status"
                    placeholder="搜索条件" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini"
                     type="primary"
                     icon="el-icon-search"
                     @click="onSubmit">查询</el-button>
          <el-popover v-model="deleteVisible"
                      placement="top"
                      width="160">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini"
                         type="text"
                         @click="deleteVisible = false">取消</el-button>
              <el-button size="mini"
                         type="primary"
                         @click="onDelete">确定</el-button>
            </div>
            <el-button slot="reference"
                       icon="el-icon-delete"
                       size="mini"
                       type="danger"
                       style="margin-left: 10px;">批量删除</el-button>
          </el-popover>
        </el-form-item>
      </el-form>
    </div>
    <el-table ref="multipleTable"
              :data="tableData"
              border
              stripe
              style="width: 100%"
              tooltip-effect="dark"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55" />
      <el-table-column label="操作人"
                       width="140">
        <template slot-scope="scope">
          <div>{{ scope.row.user.userName }}({{ scope.row.user.nickName }})</div>
        </template>
      </el-table-column>
      <el-table-column label="日期"
                       width="180">
        <template slot-scope="scope">{{ scope.row.CreatedAt|formatDate }}</template>
      </el-table-column>
      <el-table-column label="状态码"
                       prop="status"
                       width="120">
        <template slot-scope="scope">
          <div>
            <el-tag type="success">{{ scope.row.status }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="请求ip"
                       prop="ip"
                       width="120" />
      <el-table-column label="请求方法"
                       prop="method"
                       width="120" />
      <el-table-column label="请求路径"
                       prop="path"
                       width="240" />
      <el-table-column label="请求"
                       prop="path"
                       width="80">
        <template slot-scope="scope">
          <div>
            <el-popover v-if="scope.row.body"
                        placement="top-start"
                        trigger="hover">
              <div class="popover-box">
                <pre>{{ fmtBody(scope.row.body) }}</pre>
              </div>
              <i slot="reference"
                 class="el-icon-view" />
            </el-popover>

            <span v-else>无</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="响应"
                       prop="path"
                       width="80">
        <template slot-scope="scope">
          <div>
            <el-popover v-if="scope.row.resp"
                        placement="top-start"
                        trigger="hover">
              <div class="popover-box">
                <pre>{{ fmtBody(scope.row.resp) }}</pre>
              </div>
              <i slot="reference"
                 class="el-icon-view" />
            </el-popover>
            <span v-else>无</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="按钮组">
        <template slot-scope="scope">
          <el-popover v-model="scope.row.visible"
                      placement="top"
                      width="160">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini"
                         type="text"
                         @click="scope.row.visible = false">取消</el-button>
              <el-button size="mini"
                         type="primary"
                         @click="deleteSysOperationRecord(scope.row)">确定</el-button>
            </div>
            <el-button slot="reference"
                       icon="el-icon-delete"
                       size="mini"
                       type="danger">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="page"
                   :page-size="pageSize"
                   :page-sizes="[10, 30, 50, 100]"
                   :style="{float:'right',padding:'20px'}"
                   :total="total"
                   layout="total, sizes, prev, pager, next, jumper"
                   @current-change="handleCurrentChange"
                   @size-change="handleSizeChange" />
  </div>
</template>

<script>
// import {
//   deleteSysOperationRecord,
//   getSysOperationRecordList,
//   deleteSysOperationRecordByIds
// } from '@/api/sysOperationRecord' // 此处请自行替换地址
import { formatTimeToStr } from '@/utils/date'
import infoList from '@/mixins/infoList'

export default {
  name: 'SysOperationRecord',
  filters: {
    formatDate: function (time) {
      if (time !== null && time !== '') {
        var date = new Date(time)
        return formatTimeToStr(date, 'yyyy-MM-dd hh:mm:ss')
      } else {
        return ''
      }
    },
    formatBoolean: function (bool) {
      if (bool !== null) {
        return bool ? '是' : '否'
      } else {
        return ''
      }
    }
  },
  mixins: [infoList],
  data () {
    return {
      page: 1,
      total: 10,
      pageSize: 10,
      tableData: [
        {
          "ID": 10,
          "CreatedAt": "2021-07-08T16:25:15+08:00",
          "UpdatedAt": "2021-07-08T16:25:15+08:00",
          "ip": "111.205.43.229",
          "method": "POST",
          "path": "/menu/getMenu",
          "status": 200,
          "latency": 1555511,
          "agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36 SLBrowser/7.0.0.6241 SLBChan/30",
          "error_message": "",
          "body": "",
          "resp": "{\"code\":0,\"data\":{\"menus\":[{\"ID\":22,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"https://www.gin-vue-admin.com\",\"name\":\"https://www.gin-vue-admin.com\",\"hidden\":false,\"component\":\"/\",\"sort\":0,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"官方网站\",\"icon\":\"s-home\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"22\",\"children\":null,\"parameters\":[]},{\"ID\":1,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"dashboard\",\"name\":\"dashboard\",\"hidden\":false,\"component\":\"view/dashboard/index.vue\",\"sort\":1,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"仪表盘\",\"icon\":\"setting\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"1\",\"children\":null,\"parameters\":[]},{\"ID\":3,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"admin\",\"name\":\"superAdmin\",\"hidden\":false,\"component\":\"view/superAdmin/index.vue\",\"sort\":3,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"管理平台\",\"icon\":\"user-solid\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"3\",\"children\":[{\"ID\":4,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"authority\",\"name\":\"authority\",\"hidden\":false,\"component\":\"view/superAdmin/authority/authority.vue\",\"sort\":1,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"角色管理\",\"icon\":\"s-custom\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"4\",\"children\":null,\"parameters\":[]},{\"ID\":19,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"dictionaryDetail/:id\",\"name\":\"dictionaryDetail\",\"hidden\":true,\"component\":\"view/superAdmin/dictionary/sysDictionaryDetail.vue\",\"sort\":1,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"字典详情\",\"icon\":\"s-order\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"19\",\"children\":null,\"parameters\":[]},{\"ID\":5,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"menu\",\"name\":\"menu\",\"hidden\":false,\"component\":\"view/superAdmin/menu/menu.vue\",\"sort\":2,\"meta\":{\"keepAlive\":true,\"defaultMenu\":false,\"title\":\"菜单管理\",\"icon\":\"s-order\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"5\",\"children\":null,\"parameters\":[]},{\"ID\":6,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"api\",\"name\":\"api\",\"hidden\":false,\"component\":\"view/superAdmin/api/api.vue\",\"sort\":3,\"meta\":{\"keepAlive\":true,\"defaultMenu\":false,\"title\":\"api管理\",\"icon\":\"s-platform\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"6\",\"children\":null,\"parameters\":[]},{\"ID\":7,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"user\",\"name\":\"user\",\"hidden\":false,\"component\":\"view/superAdmin/user/user.vue\",\"sort\":4,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"用户管理\",\"icon\":\"coordinate\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"7\",\"children\":null,\"parameters\":[]},{\"ID\":18,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"dictionary\",\"name\":\"dictionary\",\"hidden\":false,\"component\":\"view/superAdmin/dictionary/sysDictionary.vue\",\"sort\":5,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"字典管理\",\"icon\":\"notebook-2\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"18\",\"children\":null,\"parameters\":[]},{\"ID\":20,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"operation\",\"name\":\"operation\",\"hidden\":false,\"component\":\"view/superAdmin/operation/sysOperationRecord.vue\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"操作历史\",\"icon\":\"time\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"20\",\"children\":null,\"parameters\":[]}],\"parameters\":[]},{\"ID\":8,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"person\",\"name\":\"person\",\"hidden\":true,\"component\":\"view/person/person.vue\",\"sort\":4,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"个人信息\",\"icon\":\"message-solid\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"8\",\"children\":null,\"parameters\":[]},{\"ID\":14,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"systemTools\",\"name\":\"systemTools\",\"hidden\":false,\"component\":\"view/systemTools/index.vue\",\"sort\":5,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"系统工具\",\"icon\":\"s-cooperation\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"14\",\"children\":[{\"ID\":15,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"14\",\"path\":\"autoCode\",\"name\":\"autoCode\",\"hidden\":false,\"component\":\"view/systemTools/autoCode/index.vue\",\"sort\":1,\"meta\":{\"keepAlive\":true,\"defaultMenu\":false,\"title\":\"代码生成器\",\"icon\":\"cpu\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"15\",\"children\":null,\"parameters\":[]},{\"ID\":16,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"14\",\"path\":\"formCreate\",\"name\":\"formCreate\",\"hidden\":false,\"component\":\"view/systemTools/formCreate/index.vue\",\"sort\":2,\"meta\":{\"keepAlive\":true,\"defaultMenu\":false,\"title\":\"表单生成器\",\"icon\":\"magic-stick\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"16\",\"children\":null,\"parameters\":[]}],\"parameters\":[]},{\"ID\":9,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"example\",\"name\":\"example\",\"hidden\":false,\"component\":\"view/example/index.vue\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"示例文件\",\"icon\":\"s-management\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"9\",\"children\":[{\"ID\":10,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"excel\",\"name\":\"excel\",\"hidden\":false,\"component\":\"view/example/excel/excel.vue\",\"sort\":4,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"excel导入导出\",\"icon\":\"s-marketing\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"10\",\"children\":null,\"parameters\":[]},{\"ID\":11,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"upload\",\"name\":\"upload\",\"hidden\":false,\"component\":\"view/example/upload/upload.vue\",\"sort\":5,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"媒体库（上传下载）\",\"icon\":\"upload\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"11\",\"children\":null,\"parameters\":[]},{\"ID\":12,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"breakpoint\",\"name\":\"breakpoint\",\"hidden\":false,\"component\":\"view/example/breakpoint/breakpoint.vue\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"断点续传\",\"icon\":\"upload\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"12\",\"children\":null,\"parameters\":[]},{\"ID\":21,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"simpleUploader\",\"name\":\"simpleUploader\",\"hidden\":false,\"component\":\"view/example/simpleUploader/simpleUploader\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"断点续传（插件版）\",\"icon\":\"upload\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"21\",\"children\":null,\"parameters\":[]},{\"ID\":13,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"customer\",\"name\":\"customer\",\"hidden\":false,\"component\":\"view/example/customer/customer.vue\",\"sort\":7,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"客户列表（资源示例）\",\"icon\":\"s-custom\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"13\",\"children\":null,\"parameters\":[]}],\"parameters\":[]},{\"ID\":23,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"state\",\"name\":\"state\",\"hidden\":false,\"component\":\"view/system/state.vue\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"服务器状态\",\"icon\":\"cloudy\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"23\",\"children\":null,\"parameters\":[]},{\"ID\":2,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"about\",\"name\":\"about\",\"hidden\":false,\"component\":\"view/about/index.vue\",\"sort\":7,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"关于我们\",\"icon\":\"info\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"2\",\"children\":null,\"parameters\":[]}]},\"msg\":\"获取成功\"}",
          "user_id": 1,
          "user": {
            "ID": 1,
            "CreatedAt": "2021-06-30T11:07:10+08:00",
            "UpdatedAt": "2021-06-30T11:08:03+08:00",
            "uuid": "712a010c-ab54-4768-bdb8-1105f75776b9",
            "userName": "admin",
            "nickName": "管理平台",
            "headerImg": "http://qmplusimg.henrongyi.top/gva_header.jpg",
            "authority": {
              "CreatedAt": "0001-01-01T00:00:00Z",
              "UpdatedAt": "0001-01-01T00:00:00Z",
              "DeletedAt": null,
              "authorityId": "",
              "authorityName": "",
              "parentId": "",
              "dataAuthorityId": null,
              "children": null,
              "menus": null,
              "defaultRouter": ""
            },
            "authorityId": "888",
            "sideMode": "dark",
            "activeColor": "#1890ff",
            "baseColor": "#fff"
          }
        },
        {
          "ID": 9,
          "CreatedAt": "2021-07-08T16:25:15+08:00",
          "UpdatedAt": "2021-07-08T16:25:15+08:00",
          "ip": "111.121.4.247",
          "method": "POST",
          "path": "/system/getServerInfo",
          "status": 200,
          "latency": 200802877,
          "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
          "error_message": "",
          "body": "",
          "resp": "{\"code\":0,\"data\":{\"server\":{\"os\":{\"goos\":\"linux\",\"numCpu\":2,\"compiler\":\"gc\",\"goVersion\":\"go1.16\",\"numGoroutine\":15},\"cpu\":{\"cpus\":[5.000000023283064,4.761904788302794],\"cores\":1},\"ram\":{\"usedMb\":2525,\"totalMb\":3577,\"usedPercent\":70},\"disk\":{\"usedMb\":20160,\"usedGb\":19,\"totalMb\":40188,\"totalGb\":39,\"usedPercent\":52}}},\"msg\":\"获取成功\"}",
          "user_id": 1,
          "user": {
            "ID": 1,
            "CreatedAt": "2021-06-30T11:07:10+08:00",
            "UpdatedAt": "2021-06-30T11:08:03+08:00",
            "uuid": "712a010c-ab54-4768-bdb8-1105f75776b9",
            "userName": "admin",
            "nickName": "管理平台",
            "headerImg": "http://qmplusimg.henrongyi.top/gva_header.jpg",
            "authority": {
              "CreatedAt": "0001-01-01T00:00:00Z",
              "UpdatedAt": "0001-01-01T00:00:00Z",
              "DeletedAt": null,
              "authorityId": "",
              "authorityName": "",
              "parentId": "",
              "dataAuthorityId": null,
              "children": null,
              "menus": null,
              "defaultRouter": ""
            },
            "authorityId": "888",
            "sideMode": "dark",
            "activeColor": "#1890ff",
            "baseColor": "#fff"
          }
        },
        {
          "ID": 8,
          "CreatedAt": "2021-07-08T16:25:14+08:00",
          "UpdatedAt": "2021-07-08T16:25:14+08:00",
          "ip": "115.199.177.157",
          "method": "POST",
          "path": "/system/getServerInfo",
          "status": 200,
          "latency": 200956198,
          "agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
          "error_message": "",
          "body": "",
          "resp": "{\"code\":0,\"data\":{\"server\":{\"os\":{\"goos\":\"linux\",\"numCpu\":2,\"compiler\":\"gc\",\"goVersion\":\"go1.16\",\"numGoroutine\":15},\"cpu\":{\"cpus\":[0,0],\"cores\":1},\"ram\":{\"usedMb\":2525,\"totalMb\":3577,\"usedPercent\":70},\"disk\":{\"usedMb\":20160,\"usedGb\":19,\"totalMb\":40188,\"totalGb\":39,\"usedPercent\":52}}},\"msg\":\"获取成功\"}",
          "user_id": 1,
          "user": {
            "ID": 1,
            "CreatedAt": "2021-06-30T11:07:10+08:00",
            "UpdatedAt": "2021-06-30T11:08:03+08:00",
            "uuid": "712a010c-ab54-4768-bdb8-1105f75776b9",
            "userName": "admin",
            "nickName": "管理平台",
            "headerImg": "http://qmplusimg.henrongyi.top/gva_header.jpg",
            "authority": {
              "CreatedAt": "0001-01-01T00:00:00Z",
              "UpdatedAt": "0001-01-01T00:00:00Z",
              "DeletedAt": null,
              "authorityId": "",
              "authorityName": "",
              "parentId": "",
              "dataAuthorityId": null,
              "children": null,
              "menus": null,
              "defaultRouter": ""
            },
            "authorityId": "888",
            "sideMode": "dark",
            "activeColor": "#1890ff",
            "baseColor": "#fff"
          }
        },
        {
          "ID": 7,
          "CreatedAt": "2021-07-08T16:25:10+08:00",
          "UpdatedAt": "2021-07-08T16:25:10+08:00",
          "ip": "193.176.211.41",
          "method": "POST",
          "path": "/system/getServerInfo",
          "status": 200,
          "latency": 201986455,
          "agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
          "error_message": "",
          "body": "",
          "resp": "{\"code\":0,\"data\":{\"server\":{\"os\":{\"goos\":\"linux\",\"numCpu\":2,\"compiler\":\"gc\",\"goVersion\":\"go1.16\",\"numGoroutine\":15},\"cpu\":{\"cpus\":[33.3333331808847,4.761904788302794],\"cores\":1},\"ram\":{\"usedMb\":2525,\"totalMb\":3577,\"usedPercent\":70},\"disk\":{\"usedMb\":20160,\"usedGb\":19,\"totalMb\":40188,\"totalGb\":39,\"usedPercent\":52}}},\"msg\":\"获取成功\"}",
          "user_id": 1,
          "user": {
            "ID": 1,
            "CreatedAt": "2021-06-30T11:07:10+08:00",
            "UpdatedAt": "2021-06-30T11:08:03+08:00",
            "uuid": "712a010c-ab54-4768-bdb8-1105f75776b9",
            "userName": "admin",
            "nickName": "管理平台",
            "headerImg": "http://qmplusimg.henrongyi.top/gva_header.jpg",
            "authority": {
              "CreatedAt": "0001-01-01T00:00:00Z",
              "UpdatedAt": "0001-01-01T00:00:00Z",
              "DeletedAt": null,
              "authorityId": "",
              "authorityName": "",
              "parentId": "",
              "dataAuthorityId": null,
              "children": null,
              "menus": null,
              "defaultRouter": ""
            },
            "authorityId": "888",
            "sideMode": "dark",
            "activeColor": "#1890ff",
            "baseColor": "#fff"
          }
        },
        {
          "ID": 6,
          "CreatedAt": "2021-07-08T16:25:05+08:00",
          "UpdatedAt": "2021-07-08T16:25:05+08:00",
          "ip": "111.121.4.247",
          "method": "POST",
          "path": "/system/getServerInfo",
          "status": 200,
          "latency": 200823410,
          "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
          "error_message": "",
          "body": "",
          "resp": "{\"code\":0,\"data\":{\"server\":{\"os\":{\"goos\":\"linux\",\"numCpu\":2,\"compiler\":\"gc\",\"goVersion\":\"go1.16\",\"numGoroutine\":15},\"cpu\":{\"cpus\":[0,4.761904774443828],\"cores\":1},\"ram\":{\"usedMb\":2525,\"totalMb\":3577,\"usedPercent\":70},\"disk\":{\"usedMb\":20160,\"usedGb\":19,\"totalMb\":40188,\"totalGb\":39,\"usedPercent\":52}}},\"msg\":\"获取成功\"}",
          "user_id": 1,
          "user": {
            "ID": 1,
            "CreatedAt": "2021-06-30T11:07:10+08:00",
            "UpdatedAt": "2021-06-30T11:08:03+08:00",
            "uuid": "712a010c-ab54-4768-bdb8-1105f75776b9",
            "userName": "admin",
            "nickName": "管理平台",
            "headerImg": "http://qmplusimg.henrongyi.top/gva_header.jpg",
            "authority": {
              "CreatedAt": "0001-01-01T00:00:00Z",
              "UpdatedAt": "0001-01-01T00:00:00Z",
              "DeletedAt": null,
              "authorityId": "",
              "authorityName": "",
              "parentId": "",
              "dataAuthorityId": null,
              "children": null,
              "menus": null,
              "defaultRouter": ""
            },
            "authorityId": "888",
            "sideMode": "dark",
            "activeColor": "#1890ff",
            "baseColor": "#fff"
          }
        },
        {
          "ID": 5,
          "CreatedAt": "2021-07-08T16:25:04+08:00",
          "UpdatedAt": "2021-07-08T16:25:04+08:00",
          "ip": "115.199.177.157",
          "method": "POST",
          "path": "/system/getServerInfo",
          "status": 200,
          "latency": 200815432,
          "agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
          "error_message": "",
          "body": "",
          "resp": "{\"code\":0,\"data\":{\"server\":{\"os\":{\"goos\":\"linux\",\"numCpu\":2,\"compiler\":\"gc\",\"goVersion\":\"go1.16\",\"numGoroutine\":15},\"cpu\":{\"cpus\":[5.263157847171025,0],\"cores\":1},\"ram\":{\"usedMb\":2525,\"totalMb\":3577,\"usedPercent\":70},\"disk\":{\"usedMb\":20160,\"usedGb\":19,\"totalMb\":40188,\"totalGb\":39,\"usedPercent\":52}}},\"msg\":\"获取成功\"}",
          "user_id": 1,
          "user": {
            "ID": 1,
            "CreatedAt": "2021-06-30T11:07:10+08:00",
            "UpdatedAt": "2021-06-30T11:08:03+08:00",
            "uuid": "712a010c-ab54-4768-bdb8-1105f75776b9",
            "userName": "admin",
            "nickName": "管理平台",
            "headerImg": "http://qmplusimg.henrongyi.top/gva_header.jpg",
            "authority": {
              "CreatedAt": "0001-01-01T00:00:00Z",
              "UpdatedAt": "0001-01-01T00:00:00Z",
              "DeletedAt": null,
              "authorityId": "",
              "authorityName": "",
              "parentId": "",
              "dataAuthorityId": null,
              "children": null,
              "menus": null,
              "defaultRouter": ""
            },
            "authorityId": "888",
            "sideMode": "dark",
            "activeColor": "#1890ff",
            "baseColor": "#fff"
          }
        },
        {
          "ID": 4,
          "CreatedAt": "2021-06-15T15:07:11+08:00",
          "UpdatedAt": "2021-06-15T15:07:11+08:00",
          "ip": "127.0.0.1",
          "method": "POST",
          "path": "/menu/getMenuList",
          "status": 200,
          "latency": 3648400,
          "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36",
          "error_message": "",
          "body": "{\"page\":1,\"pageSize\":999}",
          "resp": "{\"code\":0,\"data\":{\"list\":[{\"ID\":22,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"https://www.gin-vue-admin.com\",\"name\":\"https://www.gin-vue-admin.com\",\"hidden\":false,\"component\":\"/\",\"sort\":0,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"官方网站\",\"icon\":\"s-home\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":1,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"dashboard\",\"name\":\"dashboard\",\"hidden\":false,\"component\":\"view/dashboard/index.vue\",\"sort\":1,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"仪表盘\",\"icon\":\"setting\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":3,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"admin\",\"name\":\"superAdmin\",\"hidden\":false,\"component\":\"view/superAdmin/index.vue\",\"sort\":3,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"管理平台\",\"icon\":\"user-solid\",\"closeTab\":false},\"authoritys\":null,\"children\":[{\"ID\":4,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"authority\",\"name\":\"authority\",\"hidden\":false,\"component\":\"view/superAdmin/authority/authority.vue\",\"sort\":1,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"角色管理\",\"icon\":\"s-custom\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":19,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"dictionaryDetail/:id\",\"name\":\"dictionaryDetail\",\"hidden\":true,\"component\":\"view/superAdmin/dictionary/sysDictionaryDetail.vue\",\"sort\":1,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"字典详情\",\"icon\":\"s-order\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":5,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"menu\",\"name\":\"menu\",\"hidden\":false,\"component\":\"view/superAdmin/menu/menu.vue\",\"sort\":2,\"meta\":{\"keepAlive\":true,\"defaultMenu\":false,\"title\":\"菜单管理\",\"icon\":\"s-order\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":6,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"api\",\"name\":\"api\",\"hidden\":false,\"component\":\"view/superAdmin/api/api.vue\",\"sort\":3,\"meta\":{\"keepAlive\":true,\"defaultMenu\":false,\"title\":\"api管理\",\"icon\":\"s-platform\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":7,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"user\",\"name\":\"user\",\"hidden\":false,\"component\":\"view/superAdmin/user/user.vue\",\"sort\":4,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"用户管理\",\"icon\":\"coordinate\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":18,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"dictionary\",\"name\":\"dictionary\",\"hidden\":false,\"component\":\"view/superAdmin/dictionary/sysDictionary.vue\",\"sort\":5,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"字典管理\",\"icon\":\"notebook-2\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":20,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"operation\",\"name\":\"operation\",\"hidden\":false,\"component\":\"view/superAdmin/operation/sysOperationRecord.vue\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"操作历史\",\"icon\":\"time\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]}],\"parameters\":[]},{\"ID\":8,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"person\",\"name\":\"person\",\"hidden\":true,\"component\":\"view/person/person.vue\",\"sort\":4,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"个人信息\",\"icon\":\"message-solid\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":14,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"systemTools\",\"name\":\"systemTools\",\"hidden\":false,\"component\":\"view/systemTools/index.vue\",\"sort\":5,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"系统工具\",\"icon\":\"s-cooperation\",\"closeTab\":false},\"authoritys\":null,\"children\":[{\"ID\":15,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"14\",\"path\":\"autoCode\",\"name\":\"autoCode\",\"hidden\":false,\"component\":\"view/systemTools/autoCode/index.vue\",\"sort\":1,\"meta\":{\"keepAlive\":true,\"defaultMenu\":false,\"title\":\"代码生成器\",\"icon\":\"cpu\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":16,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"14\",\"path\":\"formCreate\",\"name\":\"formCreate\",\"hidden\":false,\"component\":\"view/systemTools/formCreate/index.vue\",\"sort\":2,\"meta\":{\"keepAlive\":true,\"defaultMenu\":false,\"title\":\"表单生成器\",\"icon\":\"magic-stick\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]}],\"parameters\":[]},{\"ID\":9,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"example\",\"name\":\"example\",\"hidden\":false,\"component\":\"view/example/index.vue\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"示例文件\",\"icon\":\"s-management\",\"closeTab\":false},\"authoritys\":null,\"children\":[{\"ID\":10,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"excel\",\"name\":\"excel\",\"hidden\":false,\"component\":\"view/example/excel/excel.vue\",\"sort\":4,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"excel导入导出\",\"icon\":\"s-marketing\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":11,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"upload\",\"name\":\"upload\",\"hidden\":false,\"component\":\"view/example/upload/upload.vue\",\"sort\":5,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"媒体库（上传下载）\",\"icon\":\"upload\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":12,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"breakpoint\",\"name\":\"breakpoint\",\"hidden\":false,\"component\":\"view/example/breakpoint/breakpoint.vue\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"断点续传\",\"icon\":\"upload\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":21,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"simpleUploader\",\"name\":\"simpleUploader\",\"hidden\":false,\"component\":\"view/example/simpleUploader/simpleUploader\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"断点续传（插件版）\",\"icon\":\"upload\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":13,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"customer\",\"name\":\"customer\",\"hidden\":false,\"component\":\"view/example/customer/customer.vue\",\"sort\":7,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"客户列表（资源示例）\",\"icon\":\"s-custom\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]}],\"parameters\":[]},{\"ID\":23,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"state\",\"name\":\"state\",\"hidden\":false,\"component\":\"view/system/state.vue\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"服务器状态\",\"icon\":\"cloudy\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":2,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"about\",\"name\":\"about\",\"hidden\":false,\"component\":\"view/about/index.vue\",\"sort\":7,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"关于我们\",\"icon\":\"info\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]}],\"total\":0,\"page\":1,\"pageSize\":999},\"msg\":\"获取成功\"}",
          "user_id": 1,
          "user": {
            "ID": 1,
            "CreatedAt": "2021-06-30T11:07:10+08:00",
            "UpdatedAt": "2021-06-30T11:08:03+08:00",
            "uuid": "712a010c-ab54-4768-bdb8-1105f75776b9",
            "userName": "admin",
            "nickName": "管理平台",
            "headerImg": "http://qmplusimg.henrongyi.top/gva_header.jpg",
            "authority": {
              "CreatedAt": "0001-01-01T00:00:00Z",
              "UpdatedAt": "0001-01-01T00:00:00Z",
              "DeletedAt": null,
              "authorityId": "",
              "authorityName": "",
              "parentId": "",
              "dataAuthorityId": null,
              "children": null,
              "menus": null,
              "defaultRouter": ""
            },
            "authorityId": "888",
            "sideMode": "dark",
            "activeColor": "#1890ff",
            "baseColor": "#fff"
          }
        },
        {
          "ID": 3,
          "CreatedAt": "2021-06-15T15:07:10+08:00",
          "UpdatedAt": "2021-06-15T15:07:10+08:00",
          "ip": "127.0.0.1",
          "method": "POST",
          "path": "/menu/deleteBaseMenu",
          "status": 200,
          "latency": 53009000,
          "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36",
          "error_message": "",
          "body": "{\"ID\":17}",
          "resp": "{\"code\":0,\"data\":{},\"msg\":\"删除成功\"}",
          "user_id": 1,
          "user": {
            "ID": 1,
            "CreatedAt": "2021-06-30T11:07:10+08:00",
            "UpdatedAt": "2021-06-30T11:08:03+08:00",
            "uuid": "712a010c-ab54-4768-bdb8-1105f75776b9",
            "userName": "admin",
            "nickName": "管理平台",
            "headerImg": "http://qmplusimg.henrongyi.top/gva_header.jpg",
            "authority": {
              "CreatedAt": "0001-01-01T00:00:00Z",
              "UpdatedAt": "0001-01-01T00:00:00Z",
              "DeletedAt": null,
              "authorityId": "",
              "authorityName": "",
              "parentId": "",
              "dataAuthorityId": null,
              "children": null,
              "menus": null,
              "defaultRouter": ""
            },
            "authorityId": "888",
            "sideMode": "dark",
            "activeColor": "#1890ff",
            "baseColor": "#fff"
          }
        },
        {
          "ID": 2,
          "CreatedAt": "2021-06-15T15:06:59+08:00",
          "UpdatedAt": "2021-06-15T15:06:59+08:00",
          "ip": "127.0.0.1",
          "method": "POST",
          "path": "/menu/getMenuList",
          "status": 200,
          "latency": 3765500,
          "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36",
          "error_message": "",
          "body": "{\"page\":1,\"pageSize\":999}",
          "resp": "{\"code\":0,\"data\":{\"list\":[{\"ID\":22,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"https://www.gin-vue-admin.com\",\"name\":\"https://www.gin-vue-admin.com\",\"hidden\":false,\"component\":\"/\",\"sort\":0,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"官方网站\",\"icon\":\"s-home\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":1,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"dashboard\",\"name\":\"dashboard\",\"hidden\":false,\"component\":\"view/dashboard/index.vue\",\"sort\":1,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"仪表盘\",\"icon\":\"setting\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":3,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"admin\",\"name\":\"superAdmin\",\"hidden\":false,\"component\":\"view/superAdmin/index.vue\",\"sort\":3,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"管理平台\",\"icon\":\"user-solid\",\"closeTab\":false},\"authoritys\":null,\"children\":[{\"ID\":4,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"authority\",\"name\":\"authority\",\"hidden\":false,\"component\":\"view/superAdmin/authority/authority.vue\",\"sort\":1,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"角色管理\",\"icon\":\"s-custom\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":19,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"dictionaryDetail/:id\",\"name\":\"dictionaryDetail\",\"hidden\":true,\"component\":\"view/superAdmin/dictionary/sysDictionaryDetail.vue\",\"sort\":1,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"字典详情\",\"icon\":\"s-order\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":5,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"menu\",\"name\":\"menu\",\"hidden\":false,\"component\":\"view/superAdmin/menu/menu.vue\",\"sort\":2,\"meta\":{\"keepAlive\":true,\"defaultMenu\":false,\"title\":\"菜单管理\",\"icon\":\"s-order\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":6,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"api\",\"name\":\"api\",\"hidden\":false,\"component\":\"view/superAdmin/api/api.vue\",\"sort\":3,\"meta\":{\"keepAlive\":true,\"defaultMenu\":false,\"title\":\"api管理\",\"icon\":\"s-platform\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":7,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"user\",\"name\":\"user\",\"hidden\":false,\"component\":\"view/superAdmin/user/user.vue\",\"sort\":4,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"用户管理\",\"icon\":\"coordinate\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":18,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"dictionary\",\"name\":\"dictionary\",\"hidden\":false,\"component\":\"view/superAdmin/dictionary/sysDictionary.vue\",\"sort\":5,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"字典管理\",\"icon\":\"notebook-2\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":20,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"operation\",\"name\":\"operation\",\"hidden\":false,\"component\":\"view/superAdmin/operation/sysOperationRecord.vue\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"操作历史\",\"icon\":\"time\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]}],\"parameters\":[]},{\"ID\":8,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"person\",\"name\":\"person\",\"hidden\":true,\"component\":\"view/person/person.vue\",\"sort\":4,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"个人信息\",\"icon\":\"message-solid\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":14,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"systemTools\",\"name\":\"systemTools\",\"hidden\":false,\"component\":\"view/systemTools/index.vue\",\"sort\":5,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"系统工具\",\"icon\":\"s-cooperation\",\"closeTab\":false},\"authoritys\":null,\"children\":[{\"ID\":15,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"14\",\"path\":\"autoCode\",\"name\":\"autoCode\",\"hidden\":false,\"component\":\"view/systemTools/autoCode/index.vue\",\"sort\":1,\"meta\":{\"keepAlive\":true,\"defaultMenu\":false,\"title\":\"代码生成器\",\"icon\":\"cpu\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":16,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"14\",\"path\":\"formCreate\",\"name\":\"formCreate\",\"hidden\":false,\"component\":\"view/systemTools/formCreate/index.vue\",\"sort\":2,\"meta\":{\"keepAlive\":true,\"defaultMenu\":false,\"title\":\"表单生成器\",\"icon\":\"magic-stick\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":17,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"14\",\"path\":\"system\",\"name\":\"system\",\"hidden\":false,\"component\":\"view/systemTools/system/system.vue\",\"sort\":3,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"系统配置\",\"icon\":\"s-operation\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]}],\"parameters\":[]},{\"ID\":9,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"example\",\"name\":\"example\",\"hidden\":false,\"component\":\"view/example/index.vue\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"示例文件\",\"icon\":\"s-management\",\"closeTab\":false},\"authoritys\":null,\"children\":[{\"ID\":10,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"excel\",\"name\":\"excel\",\"hidden\":false,\"component\":\"view/example/excel/excel.vue\",\"sort\":4,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"excel导入导出\",\"icon\":\"s-marketing\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":11,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"upload\",\"name\":\"upload\",\"hidden\":false,\"component\":\"view/example/upload/upload.vue\",\"sort\":5,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"媒体库（上传下载）\",\"icon\":\"upload\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":12,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"breakpoint\",\"name\":\"breakpoint\",\"hidden\":false,\"component\":\"view/example/breakpoint/breakpoint.vue\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"断点续传\",\"icon\":\"upload\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":21,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"simpleUploader\",\"name\":\"simpleUploader\",\"hidden\":false,\"component\":\"view/example/simpleUploader/simpleUploader\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"断点续传（插件版）\",\"icon\":\"upload\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":13,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"customer\",\"name\":\"customer\",\"hidden\":false,\"component\":\"view/example/customer/customer.vue\",\"sort\":7,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"客户列表（资源示例）\",\"icon\":\"s-custom\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]}],\"parameters\":[]},{\"ID\":23,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"state\",\"name\":\"state\",\"hidden\":false,\"component\":\"view/system/state.vue\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"服务器状态\",\"icon\":\"cloudy\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]},{\"ID\":2,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"about\",\"name\":\"about\",\"hidden\":false,\"component\":\"view/about/index.vue\",\"sort\":7,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"关于我们\",\"icon\":\"info\",\"closeTab\":false},\"authoritys\":null,\"children\":null,\"parameters\":[]}],\"total\":0,\"page\":1,\"pageSize\":999},\"msg\":\"获取成功\"}",
          "user_id": 1,
          "user": {
            "ID": 1,
            "CreatedAt": "2021-06-30T11:07:10+08:00",
            "UpdatedAt": "2021-06-30T11:08:03+08:00",
            "uuid": "712a010c-ab54-4768-bdb8-1105f75776b9",
            "userName": "admin",
            "nickName": "管理平台",
            "headerImg": "http://qmplusimg.henrongyi.top/gva_header.jpg",
            "authority": {
              "CreatedAt": "0001-01-01T00:00:00Z",
              "UpdatedAt": "0001-01-01T00:00:00Z",
              "DeletedAt": null,
              "authorityId": "",
              "authorityName": "",
              "parentId": "",
              "dataAuthorityId": null,
              "children": null,
              "menus": null,
              "defaultRouter": ""
            },
            "authorityId": "888",
            "sideMode": "dark",
            "activeColor": "#1890ff",
            "baseColor": "#fff"
          }
        },
        {
          "ID": 1,
          "CreatedAt": "2021-06-15T15:06:54+08:00",
          "UpdatedAt": "2021-06-15T15:06:54+08:00",
          "ip": "127.0.0.1",
          "method": "POST",
          "path": "/menu/getMenu",
          "status": 200,
          "latency": 22807700,
          "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36",
          "error_message": "",
          "body": "",
          "resp": "{\"code\":0,\"data\":{\"menus\":[{\"ID\":22,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"https://www.gin-vue-admin.com\",\"name\":\"https://www.gin-vue-admin.com\",\"hidden\":false,\"component\":\"/\",\"sort\":0,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"官方网站\",\"icon\":\"s-home\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"22\",\"children\":null,\"parameters\":[]},{\"ID\":1,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"dashboard\",\"name\":\"dashboard\",\"hidden\":false,\"component\":\"view/dashboard/index.vue\",\"sort\":1,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"仪表盘\",\"icon\":\"setting\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"1\",\"children\":null,\"parameters\":[]},{\"ID\":3,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"admin\",\"name\":\"superAdmin\",\"hidden\":false,\"component\":\"view/superAdmin/index.vue\",\"sort\":3,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"管理平台\",\"icon\":\"user-solid\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"3\",\"children\":[{\"ID\":4,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"authority\",\"name\":\"authority\",\"hidden\":false,\"component\":\"view/superAdmin/authority/authority.vue\",\"sort\":1,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"角色管理\",\"icon\":\"s-custom\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"4\",\"children\":null,\"parameters\":[]},{\"ID\":19,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"dictionaryDetail/:id\",\"name\":\"dictionaryDetail\",\"hidden\":true,\"component\":\"view/superAdmin/dictionary/sysDictionaryDetail.vue\",\"sort\":1,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"字典详情\",\"icon\":\"s-order\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"19\",\"children\":null,\"parameters\":[]},{\"ID\":5,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"menu\",\"name\":\"menu\",\"hidden\":false,\"component\":\"view/superAdmin/menu/menu.vue\",\"sort\":2,\"meta\":{\"keepAlive\":true,\"defaultMenu\":false,\"title\":\"菜单管理\",\"icon\":\"s-order\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"5\",\"children\":null,\"parameters\":[]},{\"ID\":6,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"api\",\"name\":\"api\",\"hidden\":false,\"component\":\"view/superAdmin/api/api.vue\",\"sort\":3,\"meta\":{\"keepAlive\":true,\"defaultMenu\":false,\"title\":\"api管理\",\"icon\":\"s-platform\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"6\",\"children\":null,\"parameters\":[]},{\"ID\":7,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"user\",\"name\":\"user\",\"hidden\":false,\"component\":\"view/superAdmin/user/user.vue\",\"sort\":4,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"用户管理\",\"icon\":\"coordinate\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"7\",\"children\":null,\"parameters\":[]},{\"ID\":18,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"dictionary\",\"name\":\"dictionary\",\"hidden\":false,\"component\":\"view/superAdmin/dictionary/sysDictionary.vue\",\"sort\":5,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"字典管理\",\"icon\":\"notebook-2\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"18\",\"children\":null,\"parameters\":[]},{\"ID\":20,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"3\",\"path\":\"operation\",\"name\":\"operation\",\"hidden\":false,\"component\":\"view/superAdmin/operation/sysOperationRecord.vue\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"操作历史\",\"icon\":\"time\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"20\",\"children\":null,\"parameters\":[]}],\"parameters\":[]},{\"ID\":8,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"person\",\"name\":\"person\",\"hidden\":true,\"component\":\"view/person/person.vue\",\"sort\":4,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"个人信息\",\"icon\":\"message-solid\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"8\",\"children\":null,\"parameters\":[]},{\"ID\":14,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"systemTools\",\"name\":\"systemTools\",\"hidden\":false,\"component\":\"view/systemTools/index.vue\",\"sort\":5,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"系统工具\",\"icon\":\"s-cooperation\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"14\",\"children\":[{\"ID\":15,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"14\",\"path\":\"autoCode\",\"name\":\"autoCode\",\"hidden\":false,\"component\":\"view/systemTools/autoCode/index.vue\",\"sort\":1,\"meta\":{\"keepAlive\":true,\"defaultMenu\":false,\"title\":\"代码生成器\",\"icon\":\"cpu\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"15\",\"children\":null,\"parameters\":[]},{\"ID\":16,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"14\",\"path\":\"formCreate\",\"name\":\"formCreate\",\"hidden\":false,\"component\":\"view/systemTools/formCreate/index.vue\",\"sort\":2,\"meta\":{\"keepAlive\":true,\"defaultMenu\":false,\"title\":\"表单生成器\",\"icon\":\"magic-stick\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"16\",\"children\":null,\"parameters\":[]},{\"ID\":17,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"14\",\"path\":\"system\",\"name\":\"system\",\"hidden\":false,\"component\":\"view/systemTools/system/system.vue\",\"sort\":3,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"系统配置\",\"icon\":\"s-operation\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"17\",\"children\":null,\"parameters\":[]}],\"parameters\":[]},{\"ID\":9,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"example\",\"name\":\"example\",\"hidden\":false,\"component\":\"view/example/index.vue\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"示例文件\",\"icon\":\"s-management\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"9\",\"children\":[{\"ID\":10,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"excel\",\"name\":\"excel\",\"hidden\":false,\"component\":\"view/example/excel/excel.vue\",\"sort\":4,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"excel导入导出\",\"icon\":\"s-marketing\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"10\",\"children\":null,\"parameters\":[]},{\"ID\":11,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"upload\",\"name\":\"upload\",\"hidden\":false,\"component\":\"view/example/upload/upload.vue\",\"sort\":5,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"媒体库（上传下载）\",\"icon\":\"upload\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"11\",\"children\":null,\"parameters\":[]},{\"ID\":12,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"breakpoint\",\"name\":\"breakpoint\",\"hidden\":false,\"component\":\"view/example/breakpoint/breakpoint.vue\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"断点续传\",\"icon\":\"upload\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"12\",\"children\":null,\"parameters\":[]},{\"ID\":21,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"simpleUploader\",\"name\":\"simpleUploader\",\"hidden\":false,\"component\":\"view/example/simpleUploader/simpleUploader\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"断点续传（插件版）\",\"icon\":\"upload\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"21\",\"children\":null,\"parameters\":[]},{\"ID\":13,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"9\",\"path\":\"customer\",\"name\":\"customer\",\"hidden\":false,\"component\":\"view/example/customer/customer.vue\",\"sort\":7,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"客户列表（资源示例）\",\"icon\":\"s-custom\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"13\",\"children\":null,\"parameters\":[]}],\"parameters\":[]},{\"ID\":23,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"state\",\"name\":\"state\",\"hidden\":false,\"component\":\"view/system/state.vue\",\"sort\":6,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"服务器状态\",\"icon\":\"cloudy\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"23\",\"children\":null,\"parameters\":[]},{\"ID\":2,\"CreatedAt\":\"2021-06-15T15:06:25+08:00\",\"UpdatedAt\":\"2021-06-15T15:06:25+08:00\",\"parentId\":\"0\",\"path\":\"about\",\"name\":\"about\",\"hidden\":false,\"component\":\"view/about/index.vue\",\"sort\":7,\"meta\":{\"keepAlive\":false,\"defaultMenu\":false,\"title\":\"关于我们\",\"icon\":\"info\",\"closeTab\":false},\"authoritys\":null,\"menuId\":\"2\",\"children\":null,\"parameters\":[]}]},\"msg\":\"获取成功\"}",
          "user_id": 1,
          "user": {
            "ID": 1,
            "CreatedAt": "2021-06-30T11:07:10+08:00",
            "UpdatedAt": "2021-06-30T11:08:03+08:00",
            "uuid": "712a010c-ab54-4768-bdb8-1105f75776b9",
            "userName": "admin",
            "nickName": "管理平台",
            "headerImg": "http://qmplusimg.henrongyi.top/gva_header.jpg",
            "authority": {
              "CreatedAt": "0001-01-01T00:00:00Z",
              "UpdatedAt": "0001-01-01T00:00:00Z",
              "DeletedAt": null,
              "authorityId": "",
              "authorityName": "",
              "parentId": "",
              "dataAuthorityId": null,
              "children": null,
              "menus": null,
              "defaultRouter": ""
            },
            "authorityId": "888",
            "sideMode": "dark",
            "activeColor": "#1890ff",
            "baseColor": "#fff"
          }
        }
      ],
      // listApi: getSysOperationRecordList,
      dialogFormVisible: false,
      type: '',
      deleteVisible: false,
      multipleSelection: [],
      formData: {
        ip: null,
        method: null,
        path: null,
        status: null,
        latency: null,
        agent: null,
        error_message: null,
        user_id: null
      }
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    // 条件搜索前端看此方法
    onSubmit () {
      this.page = 1
      this.pageSize = 10
      this.getTableData()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    async onDelete () {
      const ids = []
      this.multipleSelection &&
        this.multipleSelection.map(item => {
          ids.push(item.ID)
        })
      const res = await deleteSysOperationRecordByIds({ ids })
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        if (this.tableData.length === ids.length && this.page > 1) {
          this.page--
        }
        this.deleteVisible = false
        this.getTableData()
      }
    },
    async deleteSysOperationRecord (row) {
      row.visible = false
      const res = await deleteSysOperationRecord({ ID: row.ID })
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        if (this.tableData.length === 1 && this.page > 1) {
          this.page--
        }
        this.getTableData()
      }
    },
    fmtBody (value) {
      try {
        return JSON.parse(value)
      } catch (err) {
        return value
      }
    }
  }
}
</script>

<style lang="scss">
.table-expand {
  padding-left: 60px;
  font-size: 0;
  label {
    width: 90px;
    color: #99a9bf;
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
}
.popover-box {
  background: #112435;
  color: #f08047;
  height: 600px;
  width: 420px;
  overflow: auto;
}
.popover-box::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
