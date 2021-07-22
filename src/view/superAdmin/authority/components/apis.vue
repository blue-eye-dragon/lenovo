<template>
  <div>
    <div class="clearflex">
      <el-button class="fl-right"
                 size="small"
                 type="primary"
                 @click="authApiEnter">确 定</el-button>
    </div>
    <el-tree ref="apiTree"
             :data="apiTreeData"
             :default-checked-keys="apiTreeIds"
             :props="apiDefaultProps"
             default-expand-all
             highlight-current
             node-key="onlyId"
             show-checkbox
             @check="nodeChange" />
  </div>
</template>

<script>
// import { getAllApis } from '@/api/api'
// import { UpdateCasbin, getPolicyPathByAuthorityId } from '@/api/casbin'
export default {
  name: 'Apis',
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
      apiTreeData: [],
      apiTreeIds: [],
      needConfirm: false,
      apiDefaultProps: {
        children: 'children',
        label: 'description'
      }
    }
  },
  async created () {
    // 获取api并整理成树结构
    const res2 = [
      {
        "ID": 1,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/base/login",
        "description": "用户登录",
        "apiGroup": "base",
        "method": "POST"
      },
      {
        "ID": 2,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/user/register",
        "description": "用户注册",
        "apiGroup": "user",
        "method": "POST"
      },
      {
        "ID": 3,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/api/createApi",
        "description": "创建api",
        "apiGroup": "api",
        "method": "POST"
      },
      {
        "ID": 4,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/api/getApiList",
        "description": "获取api列表",
        "apiGroup": "api",
        "method": "POST"
      },
      {
        "ID": 5,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/api/getApiById",
        "description": "获取api详细信息",
        "apiGroup": "api",
        "method": "POST"
      },
      {
        "ID": 6,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/api/deleteApi",
        "description": "删除Api",
        "apiGroup": "api",
        "method": "POST"
      },
      {
        "ID": 7,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/api/updateApi",
        "description": "更新Api",
        "apiGroup": "api",
        "method": "POST"
      },
      {
        "ID": 8,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/api/getAllApis",
        "description": "获取所有api",
        "apiGroup": "api",
        "method": "POST"
      },
      {
        "ID": 9,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/authority/createAuthority",
        "description": "创建角色",
        "apiGroup": "authority",
        "method": "POST"
      },
      {
        "ID": 10,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/authority/deleteAuthority",
        "description": "删除角色",
        "apiGroup": "authority",
        "method": "POST"
      },
      {
        "ID": 11,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/authority/getAuthorityList",
        "description": "获取角色列表",
        "apiGroup": "authority",
        "method": "POST"
      },
      {
        "ID": 12,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/menu/getMenu",
        "description": "获取菜单树",
        "apiGroup": "menu",
        "method": "POST"
      },
      {
        "ID": 13,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/menu/getMenuList",
        "description": "分页获取基础menu列表",
        "apiGroup": "menu",
        "method": "POST"
      },
      {
        "ID": 14,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/menu/addBaseMenu",
        "description": "新增菜单",
        "apiGroup": "menu",
        "method": "POST"
      },
      {
        "ID": 15,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/menu/getBaseMenuTree",
        "description": "获取用户动态路由",
        "apiGroup": "menu",
        "method": "POST"
      },
      {
        "ID": 16,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/menu/addMenuAuthority",
        "description": "增加menu和角色关联关系",
        "apiGroup": "menu",
        "method": "POST"
      },
      {
        "ID": 17,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/menu/getMenuAuthority",
        "description": "获取指定角色menu",
        "apiGroup": "menu",
        "method": "POST"
      },
      {
        "ID": 18,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/menu/deleteBaseMenu",
        "description": "删除菜单",
        "apiGroup": "menu",
        "method": "POST"
      },
      {
        "ID": 19,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/menu/updateBaseMenu",
        "description": "更新菜单",
        "apiGroup": "menu",
        "method": "POST"
      },
      {
        "ID": 20,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/menu/getBaseMenuById",
        "description": "根据id获取菜单",
        "apiGroup": "menu",
        "method": "POST"
      },
      {
        "ID": 21,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/user/changePassword",
        "description": "修改密码",
        "apiGroup": "user",
        "method": "POST"
      },
      {
        "ID": 23,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/user/getUserList",
        "description": "获取用户列表",
        "apiGroup": "user",
        "method": "POST"
      },
      {
        "ID": 24,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/user/setUserAuthority",
        "description": "修改用户角色",
        "apiGroup": "user",
        "method": "POST"
      },
      {
        "ID": 25,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/fileUploadAndDownload/upload",
        "description": "文件上传示例",
        "apiGroup": "fileUploadAndDownload",
        "method": "POST"
      },
      {
        "ID": 26,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/fileUploadAndDownload/getFileList",
        "description": "获取上传文件列表",
        "apiGroup": "fileUploadAndDownload",
        "method": "POST"
      },
      {
        "ID": 27,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/casbin/updateCasbin",
        "description": "更改角色api权限",
        "apiGroup": "casbin",
        "method": "POST"
      },
      {
        "ID": 28,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/casbin/getPolicyPathByAuthorityId",
        "description": "获取权限列表",
        "apiGroup": "casbin",
        "method": "POST"
      },
      {
        "ID": 29,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/fileUploadAndDownload/deleteFile",
        "description": "删除文件",
        "apiGroup": "fileUploadAndDownload",
        "method": "POST"
      },
      {
        "ID": 30,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/jwt/jsonInBlacklist",
        "description": "jwt加入黑名单(退出)",
        "apiGroup": "jwt",
        "method": "POST"
      },
      {
        "ID": 31,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/authority/setDataAuthority",
        "description": "设置角色资源权限",
        "apiGroup": "authority",
        "method": "POST"
      },
      {
        "ID": 32,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/system/getSystemConfig",
        "description": "获取配置文件内容",
        "apiGroup": "system",
        "method": "POST"
      },
      {
        "ID": 33,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/system/setSystemConfig",
        "description": "设置配置文件内容",
        "apiGroup": "system",
        "method": "POST"
      },
      {
        "ID": 34,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/customer/customer",
        "description": "创建客户",
        "apiGroup": "customer",
        "method": "POST"
      },
      {
        "ID": 35,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/customer/customer",
        "description": "更新客户",
        "apiGroup": "customer",
        "method": "PUT"
      },
      {
        "ID": 36,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/customer/customer",
        "description": "删除客户",
        "apiGroup": "customer",
        "method": "DELETE"
      },
      {
        "ID": 37,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/customer/customer",
        "description": "获取单一客户",
        "apiGroup": "customer",
        "method": "GET"
      },
      {
        "ID": 38,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/customer/customerList",
        "description": "获取客户列表",
        "apiGroup": "customer",
        "method": "GET"
      },
      {
        "ID": 39,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/casbin/casbinTest/:pathParam",
        "description": "RESTFUL模式测试",
        "apiGroup": "casbin",
        "method": "GET"
      },
      {
        "ID": 40,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/autoCode/createTemp",
        "description": "自动化代码",
        "apiGroup": "autoCode",
        "method": "POST"
      },
      {
        "ID": 41,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/authority/updateAuthority",
        "description": "更新角色信息",
        "apiGroup": "authority",
        "method": "PUT"
      },
      {
        "ID": 42,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/authority/copyAuthority",
        "description": "拷贝角色",
        "apiGroup": "authority",
        "method": "POST"
      },
      {
        "ID": 43,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/user/deleteUser",
        "description": "删除用户",
        "apiGroup": "user",
        "method": "DELETE"
      },
      {
        "ID": 44,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/sysDictionaryDetail/createSysDictionaryDetail",
        "description": "新增字典内容",
        "apiGroup": "sysDictionaryDetail",
        "method": "POST"
      },
      {
        "ID": 45,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/sysDictionaryDetail/deleteSysDictionaryDetail",
        "description": "删除字典内容",
        "apiGroup": "sysDictionaryDetail",
        "method": "DELETE"
      },
      {
        "ID": 46,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/sysDictionaryDetail/updateSysDictionaryDetail",
        "description": "更新字典内容",
        "apiGroup": "sysDictionaryDetail",
        "method": "PUT"
      },
      {
        "ID": 47,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/sysDictionaryDetail/findSysDictionaryDetail",
        "description": "根据ID获取字典内容",
        "apiGroup": "sysDictionaryDetail",
        "method": "GET"
      },
      {
        "ID": 48,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/sysDictionaryDetail/getSysDictionaryDetailList",
        "description": "获取字典内容列表",
        "apiGroup": "sysDictionaryDetail",
        "method": "GET"
      },
      {
        "ID": 49,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/sysDictionary/createSysDictionary",
        "description": "新增字典",
        "apiGroup": "sysDictionary",
        "method": "POST"
      },
      {
        "ID": 50,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/sysDictionary/deleteSysDictionary",
        "description": "删除字典",
        "apiGroup": "sysDictionary",
        "method": "DELETE"
      },
      {
        "ID": 51,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/sysDictionary/updateSysDictionary",
        "description": "更新字典",
        "apiGroup": "sysDictionary",
        "method": "PUT"
      },
      {
        "ID": 52,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/sysDictionary/findSysDictionary",
        "description": "根据ID获取字典",
        "apiGroup": "sysDictionary",
        "method": "GET"
      },
      {
        "ID": 53,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/sysDictionary/getSysDictionaryList",
        "description": "获取字典列表",
        "apiGroup": "sysDictionary",
        "method": "GET"
      },
      {
        "ID": 54,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/sysOperationRecord/createSysOperationRecord",
        "description": "新增操作记录",
        "apiGroup": "sysOperationRecord",
        "method": "POST"
      },
      {
        "ID": 55,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/sysOperationRecord/deleteSysOperationRecord",
        "description": "删除操作记录",
        "apiGroup": "sysOperationRecord",
        "method": "DELETE"
      },
      {
        "ID": 56,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/sysOperationRecord/findSysOperationRecord",
        "description": "根据ID获取操作记录",
        "apiGroup": "sysOperationRecord",
        "method": "GET"
      },
      {
        "ID": 57,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/sysOperationRecord/getSysOperationRecordList",
        "description": "获取操作记录列表",
        "apiGroup": "sysOperationRecord",
        "method": "GET"
      },
      {
        "ID": 58,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/autoCode/getTables",
        "description": "获取数据库表",
        "apiGroup": "autoCode",
        "method": "GET"
      },
      {
        "ID": 59,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/autoCode/getDB",
        "description": "获取所有数据库",
        "apiGroup": "autoCode",
        "method": "GET"
      },
      {
        "ID": 60,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/autoCode/getColumn",
        "description": "获取所选table的所有字段",
        "apiGroup": "autoCode",
        "method": "GET"
      },
      {
        "ID": 61,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/sysOperationRecord/deleteSysOperationRecordByIds",
        "description": "批量删除操作历史",
        "apiGroup": "sysOperationRecord",
        "method": "DELETE"
      },
      {
        "ID": 62,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/simpleUploader/upload",
        "description": "插件版分片上传",
        "apiGroup": "simpleUploader",
        "method": "POST"
      },
      {
        "ID": 63,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/simpleUploader/checkFileMd5",
        "description": "文件完整度验证",
        "apiGroup": "simpleUploader",
        "method": "GET"
      },
      {
        "ID": 64,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/simpleUploader/mergeFileMd5",
        "description": "上传完成合并文件",
        "apiGroup": "simpleUploader",
        "method": "GET"
      },
      {
        "ID": 65,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/user/setUserInfo",
        "description": "设置用户信息",
        "apiGroup": "user",
        "method": "PUT"
      },
      {
        "ID": 66,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/system/getServerInfo",
        "description": "获取服务器信息",
        "apiGroup": "system",
        "method": "POST"
      },
      {
        "ID": 67,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/email/emailTest",
        "description": "发送测试邮件",
        "apiGroup": "email",
        "method": "POST"
      },
      {
        "ID": 80,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/autoCode/preview",
        "description": "预览自动化代码",
        "apiGroup": "autoCode",
        "method": "POST"
      },
      {
        "ID": 81,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/excel/importExcel",
        "description": "导入excel",
        "apiGroup": "excel",
        "method": "POST"
      },
      {
        "ID": 82,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/excel/loadExcel",
        "description": "下载excel",
        "apiGroup": "excel",
        "method": "GET"
      },
      {
        "ID": 83,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/excel/exportExcel",
        "description": "导出excel",
        "apiGroup": "excel",
        "method": "POST"
      },
      {
        "ID": 84,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/excel/downloadTemplate",
        "description": "下载excel模板",
        "apiGroup": "excel",
        "method": "GET"
      },
      {
        "ID": 85,
        "CreatedAt": "2021-06-15T15:06:25+08:00",
        "UpdatedAt": "2021-06-15T15:06:25+08:00",
        "path": "/api/deleteApisByIds",
        "description": "批量删除api",
        "apiGroup": "api",
        "method": "DELETE"
      }
    ]
    const apis = res2

    this.apiTreeData = this.buildApiTree(apis)
    const res = await getPolicyPathByAuthorityId({
      authorityId: this.row.authorityId
    })
    this.activeUserId = this.row.authorityId
    this.apiTreeIds = []
    res.data.paths && res.data.paths.map(item => {
      this.apiTreeIds.push('p:' + item.path + 'm:' + item.method)
    })
  },
  methods: {
    nodeChange () {
      this.needConfirm = true
    },
    // 暴露给外层使用的切换拦截统一方法
    enterAndNext () {
      this.authApiEnter()
    },
    // 创建api树方法
    buildApiTree (apis) {
      const apiObj = {}
      apis &&
        apis.map(item => {
          item.onlyId = 'p:' + item.path + 'm:' + item.method
          if (Object.prototype.hasOwnProperty.call(apiObj, item.apiGroup)) {
            apiObj[item.apiGroup].push(item)
          } else {
            Object.assign(apiObj, { [item.apiGroup]: [item] })
          }
        })
      const apiTree = []
      for (const key in apiObj) {
        const treeNode = {
          ID: key,
          description: key + '组',
          children: apiObj[key]
        }
        apiTree.push(treeNode)
      }
      return apiTree
    },
    // 关联关系确定
    async authApiEnter () {
      const checkArr = this.$refs.apiTree.getCheckedNodes(true)
      var casbinInfos = []
      checkArr && checkArr.map(item => {
        var casbinInfo = {
          path: item.path,
          method: item.method
        }
        casbinInfos.push(casbinInfo)
      })
      const res = await UpdateCasbin({
        authorityId: this.activeUserId,
        casbinInfos
      })
      if (res.code === 0) {
        this.$message({ type: 'success', message: 'api设置成功' })
      }
    }
  }
}
</script>
