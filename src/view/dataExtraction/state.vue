<template>
  <div>
    <div class="searchFrom clearflex">
      <el-col :span="18">
        <el-form :inline="true"
                 :model="searchInfo"
                 class="demo-form-inline">

          <el-form-item label="类别">
            <el-select v-model="searchInfo.category"
                       placeholder="请选择任务类别">
              <el-option v-for="item in categoryOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="searchInfo.name"
                      placeholder="名称" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="searchInfo.description"
                      placeholder="描述" />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-button size="medium"
                   type="primary"
                   icon="el-icon-search"
                   @click="onSubmit">查询</el-button>
        <el-button size="medium"
                   type="primary"
                   icon="el-icon-plus"
                   @click="openDialog('add')">新增</el-button>

      </el-col>
    </div>
    <el-table :data="tableData"
              :stripe="true"
              :border="true"
              style="width: 100%">
      <el-table-column prop="ID"
                       label="ID"
                       width="100">
      </el-table-column>
      <el-table-column prop="name"
                       label="任务名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="category"
                       label="任务类型"
                       width="180">
      </el-table-column>
      <el-table-column prop="description"
                       label="任务描述"
                       min-width="180">
      </el-table-column>
      <el-table-column label="操作"
                       width="370">
        <template slot-scope="scope">
          <el-button size="small"
                     type="primary"
                     icon="el-icon-edit"
                     @click="editApi(scope.row)">编辑</el-button>
          <el-button size="small"
                     type="danger"
                     icon="el-icon-delete"
                     @click="deleteApi(scope.row)">删除</el-button>
          <el-button size="small"
                     type="warning"
                     icon="el-icon-close"
                     @click="disableApi(scope.row)">禁用</el-button>
          <el-button size="small"
                     type="success"
                     icon="el-icon-close"
                     @click="recordApi(scope.row)">记录</el-button>
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
    <el-dialog :before-close="closeDialog"
               :title="dialogTitle"
               :visible.sync="dialogFormVisible">
      <el-form ref="stateForm"
               :model="form"
               :rules="rules"
               label-width="80px">
        <!-- :inline="true" -->
        <el-row type="flex"
                justify="center">
          <el-col :span="12">
            <el-form-item label="任务名称"
                          prop="name">
              <el-input v-model="form.name"
                        placeholder="请输入任务名称"
                        style="width:200px"
                        autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务类别"
                          prop="category">
              <el-select v-model="form.category"
                         placeholder="请选择任务类别">
                <el-option v-for="item in categoryOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="任务描述"
                      prop="description">
          <el-input v-model="form.description"
                    type="textarea"
                    placeholder="请输入任务描述"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item :label="'配置'+count"
                      v-for="count in num"
                      :key="count"
                      :prop="'configuration'+count">
          <el-input v-model="form['configuration'+count]"
                    type="textarea"
                    placeholder="请输入配置"
                    autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="delConfig">减少配置</el-button>
          <el-button type="primary"
                     @click="addConfig">新增配置</el-button>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary"
                   @click="enterDialog">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :before-close="closeDialog1"
               :title="selectForm.name"
               :visible.sync="dialogFormVisible1">
      <!-- <h2>任务名称：{{selectForm.name}}</h2> -->
      <el-table :data="selectForm.selecData"
                :stripe="true"
                :border="true"
                style="width: 100%">
        <el-table-column prop="taskTime"
                         label="使用时间"
                         min-width="90">
        </el-table-column>
        <el-table-column prop="taskDetails"
                         label="任务详情"
                         min-width="180">
        </el-table-column>
      </el-table>
      <!-- <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogFormVisible1 = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'state',
  data () {
    return {
      page: 1,
      pageSize: 10,
      total: 10,
      searchInfo: {},
      form: {},
      num: 2,
      type: 'add',
      selectForm: {},
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogTitle: '',
      tableData: [
        {
          ID: '1',
          name: '任务1',
          category: 'PACS系统',
          description: 'PACS系统抽取数据',
          configuration1: '任务1配置1',
          configuration2: '任务1配置2',
          selecData: [
            {
              taskTime: '2021-03-04 14:07:35',
              taskDetails: '记录任务1详情1'
            },
            {
              taskTime: '2021-03-06 14:07:35',
              taskDetails: '记录任务1详情2'
            },
            {
              taskTime: '2021-03-09 14:07:35',
              taskDetails: '记录任务1详情3'
            },
            {
              taskTime: '2021-03-12 14:07:35',
              taskDetails: '记录任务1详情4'
            }
          ]
        },
        {
          ID: '2',
          name: '任务2',
          category: 'EMR系统',
          description: 'EMR系统抽取数据',
          configuration1: '任务2配置1',
          configuration2: '任务2配置2',
          selecData: [
            {
              taskTime: '2021-04-04 14:07:35',
              taskDetails: '记录任务2详情1'
            },
            {
              taskTime: '2021-04-06 14:07:35',
              taskDetails: '记录任务2详情2'
            },
            {
              taskTime: '2021-04-09 14:07:35',
              taskDetails: '记录任务2详情3'
            },
            {
              taskTime: '2021-04-12 14:07:35',
              taskDetails: '记录任务2详情4'
            }
          ]
        },
        {
          ID: '3',
          name: '任务3',
          category: '集成系统',
          description: '集成系统抽取数据',
          configuration1: '任务3配置1',
          configuration2: '任务3配置2',
          selecData: [
            {
              taskTime: '2021-05-04 14:07:35',
              taskDetails: '记录任务3详情1'
            },
            {
              taskTime: '2021-05-06 14:07:35',
              taskDetails: '记录任务3详情2'
            },
            {
              taskTime: '2021-05-09 14:07:35',
              taskDetails: '记录任务3详情3'
            },
            {
              taskTime: '2021-05-12 14:07:35',
              taskDetails: '记录任务3详情4'
            }
          ]
        },
        {
          ID: '4',
          name: '任务4',
          category: 'LIS系统',
          description: 'LIS系统抽取数据',
          configuration1: '任务4配置1',
          configuration2: '任务4配置2',
          selecData: [
            {
              taskTime: '2021-06-04 14:07:35',
              taskDetails: '记录任务4详情1'
            },
            {
              taskTime: '2021-06-06 14:07:35',
              taskDetails: '记录任务4详情2'
            },
            {
              taskTime: '2021-06-09 14:07:35',
              taskDetails: '记录任务4详情3'
            },
            {
              taskTime: '2021-06-12 14:07:35',
              taskDetails: '记录任务4详情4'
            }
          ]
        },
        {
          ID: '5',
          name: '任务5',
          category: '数据接口',
          description: '通过数据接口抽取数据',
          configuration1: '任务5配置1',
          configuration2: '任务5配置2',
          selecData: [
            {
              taskTime: '2021-03-04 14:07:35',
              taskDetails: '记录任务详情1'
            },
            {
              taskTime: '2021-03-06 14:07:35',
              taskDetails: '记录任务详情2'
            },
            {
              taskTime: '2021-03-09 14:07:35',
              taskDetails: '记录任务详情3'
            },
            {
              taskTime: '2021-03-12 14:07:35',
              taskDetails: '记录任务详情4'
            }
          ]
        }
      ],
      rules: {
        name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        category: [
          { required: true, message: '请选择任务类别', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入任务描述', trigger: 'blur' }
        ],
        configuration1: [
          { required: true, message: '请输入任务配置', trigger: 'blur' }
        ],
        configuration2: [
          { required: true, message: '请输入任务配置', trigger: 'blur' }
        ]
      },
      categoryOptions: [
        {
          label: '数据接口',
          value: '1'
        },
        {
          label: '集成系统',
          value: '2'
        },
        {
          label: 'PACS系统',
          value: '3'
        },
        {
          label: 'LIS系统',
          value: '4'
        },
        {
          label: '历史数据',
          value: '5'
        },
        {
          label: 'EMR系统',
          value: '6'
        }
      ]
    }
  },
  methods: {
    handleCurrentChange () { },
    handleSizeChange () { },
    openDialog (type) {
      switch (type) {
        case 'add':
          this.dialogTitle = '新增抽取任务'
          break
        case 'edit':
          this.dialogTitle = '编辑抽取任务'
          break
        default:
          break
      }
      this.type = type
      this.dialogFormVisible = true
    },

    initForm () {
      this.$refs.stateForm.resetFields()
      this.form = {
        path: '',
        apiGroup: '',
        method: '',
        description: ''
      }
    },
    async editApi (row) {
      this.openDialog('edit')
      this.form = row
    },
    closeDialog () {
      this.initForm()
      this.dialogFormVisible = false
    },
    addConfig () {
      this.num++
      this.rules['configuration' + this.num] = [
        { required: true, message: '请输入任务配置', trigger: 'blur' }
      ]
    },
    delConfig () {
      if (this.num < 3) {
        this.$message.info('配置项至少为两项')
        return false
      }
      this.num--
    },
    async deleteApi (row) {
      this.$confirm('此操作将删除任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then()
    },
    async disableApi (row) {
      this.$confirm('此操作将禁用任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then()
    },
    enterDialog () {
      if (this.type == 'add') {
        this.$refs.stateForm.validate(async valid => {
          if (valid) {
            this.form.ID = this.tableData.length + 1
            this.tableData.push(this.form)
            this.closeDialog()
          }
        })
      }
      // console.log(this.form);
      // if (this.type == 'add') {
      //   // console.log(this.form);
      //   this.tableData.push(this.form)
      // }
      // this.closeDialog()
    },
    onSubmit () { },
    recordApi (row) {
      this.dialogFormVisible1 = true
      this.selectForm = row
    },
    closeDialog1 () {
      this.dialogFormVisible1 = false
    }
  }
}
</script>

<style lang="less">
.searchFrom {
  text-align: left;
}
.el-dialog {
  .el-table {
    height: 400px;
    overflow-y: auto;
  }
}
</style>