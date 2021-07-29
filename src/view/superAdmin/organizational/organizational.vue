<template>
  <div>
    <div class="searchTop clearflex">

      <el-col :span="18">
        <el-form
          :inline="true"
          :model="form"
          class="demo-form-inline"
        >
          <div>
            <el-form-item label="组织编号">
              <el-input
                v-model="form.id"
                placeholder="请输入组织编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="组织名称">
              <el-input
                v-model="form.name"
                placeholder="请输入组织名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="组织类型">
              <el-select
                v-model="form.type"
                placeholder="请选择组织类型"
              >
                <el-option
                  label="机构"
                  value="ganmao"
                ></el-option>
                <el-option
                  label="部门"
                  value="fashao"
                ></el-option>
                <el-option
                  label="组"
                  value="waiguan"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <transition
            :duration="{ enter: 800, leave: 100 }"
            mode="out-in"
            name="el-fade-in-linear"
          >
            <div
              class="selectMode"
              v-if="!isUpDown"
            >

              <el-form-item label="申请时间">
                <el-date-picker
                  v-model="form.time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </div>
          </transition>
        </el-form>
      </el-col>
      <el-col
        :span="6"
        style="text-align:center"
      >
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-search"
          @click="onSubmit"
        >查询</el-button>
        <el-button
          size="medium"
          type="primary"
          :icon="isUpDown?'el-icon-arrow-up':'el-icon-arrow-down'"
          @click="onUpDown"
        >高级查询</el-button>
      </el-col>
    </div>
    <div style="padding: 10px 0;text-align: left;">
      <el-button
        type="primary"
        @click="drawerOpen('add')"
      >新增</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="编号"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="机构名称"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="update"
          label="申请时间"
          width="200"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="drawerOpen('addChild')"
            >添加下级</el-button>
            <el-button
              type="text"
              size="small"
              @click="drawerOpen('edit')"
            >编辑</el-button>
            <template>
              <el-dropdown>
                <span class="el-dropdown-link">
                  下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>启用</el-dropdown-item>
                  <el-dropdown-item>禁用</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page"
        :page-size="pageSize"
        :page-sizes="[10, 30, 50, 100]"
        :style="{float:'right',padding:'20px'}"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
      <el-drawer
        :title="title"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          style="width:90%"
        >
          <el-form-item
            label="父级机构"
            prop="name"
            v-if="title == '添加下级'"
          >
            <el-input
              v-model="ruleForm.Fname"
              placeholder="请输入组织名称"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="组织名称"
            prop="name"
          >
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入组织名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="所属行政区"
            prop="name"
          >
            <template>
              <el-select
                v-model="ruleForm.area"
                placeholder="请选择所属行政区"
              >
                <el-option
                  v-for="item in option"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item
            label="组织类型"
            prop="name"
          >
            <template>
              <el-select
                v-model="ruleForm.area"
                placeholder="请选择组织类型"
              >
                <el-option
                  v-for="item in option"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item
            label="负责人"
            prop="name"
          >
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入负责人"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="联系人"
            prop="name"
          >
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入联系人"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="联系电话"
            prop="name"
          >
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入联系电话"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="联系地址"
            prop="name"
          >
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入联系地址"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      page: 1,
      pageSize: 10,
      total: 10,
      isUpDown: true,
      drawer: false,
      title: '新增机构',
      form: {},
      tableData: [
        {
          id: '202107221',
          name: '测试1',
          type: '发明',
          update: '2021-07-01',
          details: '测试1的简单的组织详情'
        }
      ],
      option: [

      ],
      ruleForm: {
        Fname: '测试1'
      }
    }
  },
  methods: {
    onSubmit () { },
    onUpDown () {
      this.isUpDown = !this.isUpDown
    },
    handleCurrentChange () { },
    handleSizeChange () { },
    drawerOpen (e) {
      this.drawer = true
      this.title = e == 'add' ? '新增机构' : e == 'addChild' ? '添加下级' : '编辑机构'
    }
  },
}
</script>

<style lang="less">
.searchTop {
  width: 100%;
}
.el-dropdown {
  margin-left: 10px;
}
.el-dropdown-link {
  font-size: 12px;
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>