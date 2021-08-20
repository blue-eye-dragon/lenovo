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
            <el-form-item label="专利编号">
              <el-input
                v-model="form.id"
                placeholder="请输入专利编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="专利所属人">
              <el-input
                v-model="form.name"
                placeholder="请输入专利所属人"
              ></el-input>
            </el-form-item>
            <el-form-item label="专利类型">
              <el-select
                v-model="form.type"
                placeholder="请选择专利类型"
              >
                <el-option
                  label="发明"
                  value="ganmao"
                ></el-option>
                <el-option
                  label="实用新型"
                  value="fashao"
                ></el-option>
                <el-option
                  label="外观设计"
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
        class="sarchClass"
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
          class="highSearch"
        >高级查询</el-button>
      </el-col>
    </div>
    <div style="padding: 10px 0;text-align: left;">
      <el-button type="primary">新增</el-button>
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
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="所属人"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="update"
          label="申请时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="details"
          label="详情"
          width="300"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
            >查看</el-button>
            <el-button
              type="text"
              size="small"
            >下载</el-button>
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
      form: {},
      tableData: [
        {
          id: '202107221',
          name: '测试1',
          type: '发明',
          update: '2021-07-01',
          details: '测试1的简单的专利详情'
        }
      ]
    }
  },
  methods: {
    onSubmit () { },
    onUpDown () {
      this.isUpDown = !this.isUpDown
    },
    handleCurrentChange () { },
    handleSizeChange () { }
  },
}
</script>

<style lang="less">
.searchTop {
  width: 100%;
}
</style>