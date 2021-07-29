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
            <el-form-item label="药品编号">
              <el-input
                v-model="form.id"
                placeholder="请输入药品编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="药品名称">
              <el-input
                v-model="form.name"
                placeholder="请输入药品名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="药品种类">
              <el-select
                v-model="form.type"
                placeholder="请选择药品种类"
              >
                <el-option
                  label="中药管理"
                  value="ganmao"
                ></el-option>
                <el-option
                  label="西药管理"
                  value="fashao"
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
              <el-form-item label="治疗方面">
                <el-select
                  v-model="form.type"
                  placeholder="请选择治疗方面"
                >
                  <el-option
                    label="抗高血压药物"
                    value="ganmao"
                  ></el-option>
                  <el-option
                    label="抗菌药物"
                    value="fashao"
                  ></el-option>
                  <el-option
                    label="抗病毒药"
                    value="fashao"
                  ></el-option>
                  <el-option
                    label="抗心律失常药物"
                    value="fashao"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="录入时间">
                <el-date-picker
                  v-model="form.time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item> -->
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
        @click="isShow = true"
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
          label="药品编号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="药品名称"
          width="250"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="药品种类"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="direction"
          label="治疗方向"
          width="300"
        >
        </el-table-column>
        <el-table-column label="管理规范">
          <template slot-scope="scope">
            <el-tag
              size="medium"
              @click="openStandard(scope.row)"
            >管理规范</el-tag>
            <el-tag
              size="medium"
              @click="openDetails(scope.row)"
            >说明书</el-tag>
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
      isShow: false,
      form: {},
      tableData: [
        {
          id: '202107221',
          name: '测试1',
          type: '感冒',
          direction: '2021-07-01',
          standard: '欧盟2005年出台针对患者的说明书范本：将说明书按照患者用药的程序分为：这个药是什么，用药之前，如何用，可能的不良反应，如何贮存，其它信息 6个部分，在范本中反复强调要使用患者能够读懂的语言。在“用药之前”中，会提到禁忌、药物和食物的关系，药物对驾车的影响等等。在“如何用药”中，除用法用量之外，还特别要说明过量后怎么办，漏服药怎么办，停药的时候的注意事项，这些都是普通患者在服药中常遇到的问题，但是在我国的药品说明书中很少体现。在“可能的不良反应”里，用的不是医学专业名词，而是描述一些症状，便于用药的患者自己判断，比如黄疸，描述为眼球皮肤发黄，告诉患者遇到眼球皮肤发黄时应及时就医。',
          details: '“生产日期”是指某种药品，完成所有生产工艺的日期。用数字来表示，前四位代表生产年份，中间两位代表月，后两位代表日，如20040305即是2004年3月5日生产的。生产日期与有效期是挂钩的，如以上药品的有效期是三年，即该药品只能用到2007年3月4日，过期则失效，失效的药品，一定不能再用。'
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
    handleSizeChange () { },
    openStandard (e) {
      this.$router.push({
        name: 'manageSpecification',
        params: {
          id: e.id
        }
      })
    },
    openDetails (e) {
      this.$router.push({
        name: 'instructions',
        params: {
          id: e.id
        }
      })
    }
  },
}
</script>

<style lang="less">
.searchTop {
  width: 100%;
}
.el-tag {
  cursor: pointer;
}
.el-popover {
  height: 300px;
  cursor: pointer;
  overflow-y: auto;
}
</style>