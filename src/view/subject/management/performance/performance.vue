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
            <el-form-item label="合同编号">
              <el-input
                v-model="form.id"
                placeholder="请输入合同编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目申办人">
              <el-input
                v-model="form.name"
                placeholder="请输入项目申办人"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input
                v-model="form.name"
                placeholder="请输入项目名称"
              ></el-input>
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

              <el-form-item label="申办时间">
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
    <div style="padding: 10px 0px; text-align: left;">
      <el-button type="primary">新增</el-button>
    </div>
    <el-table :data="tableData1"
              border
              style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        width="100">
      </el-table-column>
      <el-table-column prop="subID"
                       label="项目编号"
                       width="180">
      </el-table-column>
      <el-table-column prop="subName"
                       label="项目名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="sponsor"
                       label="申办者"
                       width="180">
      </el-table-column>
      <el-table-column prop="acceptor"
                       label="受试者"
                       width="180">
      </el-table-column>
      <el-table-column prop="time"
                       label="申办时间"
                       width="150">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="see(scope.row)" type="primary" size="small">查看</el-button>
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
</template>

<script>
export default {
  name:'project',
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 10,
      subjectModel:'first',
      form: {},
      isUpDown: true,
      tableData1: [
        {
          subID: '202108121',
          subName:'项目1',
          sponsor:'申办者1',
          acceptor:'受试者1',
          time:'2021-08-1',
          state:'暂存'
        },
        {
          subID: '202108122',
          subName:'项目2',
          sponsor:'申办者2',
          acceptor:'受试者2',
          time:'2021-08-2',
          state:'审批'
        },
        {
          subID: '202108123',
          subName:'项目3',
          sponsor:'申办者3',
          acceptor:'受试者3',
          time:'2021-08-3',
          state:'通过'
        },
        {
          subID: '202108124',
          subName:'项目4',
          sponsor:'申办者4',
          acceptor:'受试者4',
          time:'2021-08-4',
          state:'暂停'
        },
        {
          subID: '202108125',
          subName:'项目5',
          sponsor:'申办者5',
          acceptor:'受试者5',
          time:'2021-08-5',
          state:'终止'
        },
        {
          subID: '202108126',
          subName:'项目6',
          sponsor:'申办者6',
          acceptor:'受试者6',
          time:'2021-08-6',
          state:'完成'
        }
      ]
    }
  },
  methods: {
    handleSizeChange(){},
    handleCurrentChange(){},
    see(){}
  },
}
</script>

<style lang="less">
</style>