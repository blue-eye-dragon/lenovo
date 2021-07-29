<template>
  <div>
    <div class="searchFrom clearflex">
      <el-col :span="16">
        <div class="searchInput">
          <el-input
            placeholder="请输入内容"
            v-model="input"
            clearable
          >
          </el-input>
        </div>
        <!-- <transition
          :duration="{ enter: 800, leave: 100 }"
          mode="out-in"
          name="el-fade-in-linear"
        >
          <div
            class="selectMode"
            v-if="!isUpDown"
          >
            <el-col :span="2">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >全选:</el-checkbox>
            </el-col>
            <el-col :span="22">
              <el-checkbox-group
                v-model="checkedCities"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="city in cities"
                  :label="city"
                  :key="city.name"
                >{{city.name}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </div>
        </transition> -->
      </el-col>
      <el-col
        :span="8"
        style="text-align:center"
      >
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-search"
          @click="onSubmit"
        >查询</el-button>
        <!-- <el-button
          size="medium"
          type="primary"
          :icon="isUpDown?'el-icon-arrow-up':'el-icon-arrow-down'"
          @click="onUpDown"
        >查询来源</el-button> -->
        <el-button
          type="primary"
          size="medium"
          @click="addDataSource"
        >数据来源管理</el-button>
        <el-button
          size="medium"
          type="primary"
          @click="dialogVisible = true"
        >来源更新记录</el-button>
      </el-col>
    </div>
    <el-table
      :data="tableData"
      :stripe="true"
      :border="true"
      style="width: 100%"
    >
      <el-table-column
        prop="ID"
        label="ID"
        min-width="50"
      >
      </el-table-column>
      <el-table-column
        prop="dataName"
        label="数据标题"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="dataSource"
        label="数据来源"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        label="数据详情"
        min-width="250"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <a
            :href="scope.row.url"
            target="view_window"
          >{{scope.row.details}}</a>
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
    <el-dialog
      title="数据来源更新记录"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-table
        :data="tableData1"
        :stripe="true"
        :border="true"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="数据来源"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="更新时间"
          min-width="90"
        >
        </el-table-column>
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="数据来源管理"
      :visible.sync="dialogSource"
      width="50%"
    >
      <div style="marginBottom:20px">
        <el-input
          v-model="input"
          style="width:300px"
          placeholder="请输入数据源名称"
        ></el-input>
        <el-button type="primary">搜索</el-button>
        <el-button type="primary">新增</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="dataSource"
        :stripe="true"
        :border="true"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :row-key="getRowKeys"
      >
        <el-table-column
          type="selection"
          :reserve-selection="true"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="数据来源"
          min-width="150"
        >
        </el-table-column>
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogSource = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogSource = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
const cityOptions = [
  {
    name: '生物样本库'
  },
  {
    name: '人遗数据库'
  },
  {
    name: '伦理数据库'
  },
  {
    name: '中国生物医学文献服务系统SinoMed'
  },
  {
    name: '中国知网CNKI'
  },
  {
    name: 'Cochrane在线图书库'
  },
  {
    name: 'OVID电子期刊'
  },
  {
    name: 'Lancet'
  },
  {
    name: 'PubMed'
  },
  {
    name: 'CMJA'
  },
  {
    name: 'JAMA'
  },
  {
    name: 'NEJM'
  },
  {
    name: 'Embase'
  }
];
export default {
  name: 'database',
  data () {
    return {
      page: 1,
      pageSize: 10,
      total: 10,
      input: '',
      checkAll: true,
      checkedCities: cityOptions,
      cities: cityOptions,
      isIndeterminate: false,
      dialogVisible: false,
      dialogSource: false,
      isUpDown: true,
      tableData: [
        {
          ID: '1',
          dataName: '青年人与老年人肺癌的比较',
          dataSource: '肿瘤科学网',
          url: 'http://www.tumorsci.org/abstract.htm?id=OJ160412000497EbHeKg',
          details: '目的 对青年人肺癌(年龄≤40岁)和老年人肺癌(年龄≥70岁)的病理类型、临床表现、性别比例、临床分期及对治疗的选择进行比较。方法 回顾性收集6年来在我院经病理学证实青年人组70例及老年人组135例肺癌患者的年龄、性别、组织学分类、起始症状、临床分期及治疗经过进行比较。结果(1)青年人组中女性患者比例较老年人组明显增高(P<0.01).青年人组腺癌的比例亦较老年组高。(2)青年组中出现胸痛症状的比例明显高于老年人组(P<0.01)。(3)青年人组中中晚、期比例略高于老年人组,但统计学上无显著性差异。(4)青年人组中手术治疗及放化疗的比例要明显高于老年人组(P<0.01),老年人组中更倾向于保守治疗。结论 青年人肺癌与老年人肺癌相比,女性患者比例明显增高,腺癌比例增高,疾病进展迅速,恶性度高,且易误诊。早期诊断,积极治疗能提高肺癌的生存期。'
        },
        {
          ID: '2',
          dataName: 'CDK12与肿瘤相关性的研究进展',
          dataSource: '肿瘤科学网',
          url: 'http://www.tumorsci.org/Abstract.htm?aid=OJ180814000046B9EbHd',
          details: '恶性肿瘤一般表现为细胞分裂不受控制的病理过程。细胞周期蛋白依赖性激酶 （cyclin-dependent kinases，CDKs）是一类调节细胞周期进程和基因转录过程的关键因子。CDKs的功能失调能够驱动肿瘤的发生，因此常被检测用来指导恶性肿瘤的治疗。CDK12是一种参与包括DNA损伤修复、细胞生长和分化、前体mRNA剪接和处理加工等多种细胞进程的转录相关性激酶。近期研究发现，多种肿瘤中存在着CDK12基因突变和扩增现象，如在高级别浆液性卵巢癌中CDK12基因发生功能缺失性突变，提示CDK12可能是一种抑癌基因。然而，CDK12在某些肿瘤中过表达，表明CDK12还可能具有一些癌基因的特性。本文就CDK12基因的结构、功能以及与恶性肿瘤的关系等最新研究进展进行综述。'
        },
        {
          ID: '3',
          dataName: '2003—2012年上海市胃癌发病特征分析',
          dataSource: '肿瘤科学网',
          url: 'http://www.tumorsci.org/Abstract.htm?aid=OJ180814000044OkQnTq',
          details: '分析2003—2012年上海市胃癌病例发病特征，并与国际数据进行比较。 方法：选取上海市恶性肿瘤病例报告登记管理系统中记录的2003—2012年诊断的所有胃癌新发病例。国际恶性肿瘤发病数据来自WHO国际癌症研究机构（International Agency for Research on Cancer，IARC）的GLOBOCAN 2012数据库和美国国立癌症研究所（Nation Cancer Institute，NCI）监测、流行和终点项目（Surveillance，Epidemiology and End Result，SEER）18数据库。计算上海市胃癌年平均发病例数、平均年龄、构成比、发病率、年龄别发病率和标化发病率。采用Pearson χ2检验比较不同时间阶段病理诊断依据、病理类型及诊断时期别构成比间的差异；采用Cochran χ2检验比较不同时间阶段以及地区间的标化发病率。 结果：2003—2012年，上海市胃癌新发病例57 812例，年平均5 781例，占全部恶性肿瘤的10.89%，发病率为41.88/10万，标化发病率为19.92/10万，位居上海市恶性肿瘤发病的第3位。2008—2012年，上海市胃癌新发病例29 373例，年平均5 875例，占全部恶性肿瘤的10.19%，发病中位年龄为69岁，平均年龄为67.70岁，标化发病率为18.64/10万；2003—2007年，上海市胃癌新发病例28 439例，年平均5 688例，占全部恶性肿瘤的11.74%，发病中位年龄为70岁，平均年龄为66.93岁，标化发病率为21.40/10万；2008—2012年标化发病率较2003—2007年显著降低（P＜0.001）。2008—2012年上海市胃癌标化发病率高于世界平均水平（12.1/10万）和发达国家（10.6/10万），低于东亚地区（24.2/10万）和中国（22.7/10万）。2003—2007年和2008—2012年这2个阶段胃癌年龄别发病率随年龄的增长而上升，在80～84岁达到高峰。与2003—2007年相比，2008—2012年胃癌患者诊断时期别为Ⅰ期、有明确临床分期、有明确病理学分型和最高诊断依据为病理学诊断的患者所占百分比均明显增加（P值均＜0.001）。 结论：与2003—2007年相比，2008—2012年上海市胃癌发病率有所下降；上海市胃癌发病率仍处于较高水平，虽然低于全国水平但高于世界平均水平。'
        },
        {
          ID: '4',
          dataName: '局部晚期结肠癌术前化疗的研究进展',
          dataSource: '肿瘤科学网',
          url: 'http://www.tumorsci.org/abstract.htm?id=OJ160412000497EbHeKg',
          details: '局部晚期结肠癌患者手术后复发率高，预后较差，亟待提高患者的生存质量。研究表明，更早的全身治疗可有效根除肿瘤微转移，降低肿瘤复发和转移风险。术前化疗作为全身治疗的一种，在胃癌、乳腺癌及食管癌的治疗中被证明有效，但术前化疗在局部晚期结肠癌中的疗效尚不明确。为探索术前化疗在局部晚期结肠癌中的可行性及有效性，探讨局部晚期结肠癌的治疗策略，本综述重点探讨局部晚期结肠癌患者实施术前化疗的理论基础及临床疗效、CT作为一种有效手段用于筛选符合术前化疗标准的患者并评价术前化疗的疗效，以及结肠癌术前化疗未来研究的方向.'
        }
      ],
      tableData1: [
        {
          name: '生物样本库',
          time: '2021-06-12 18:23:49'
        },
        {
          name: '人遗数据库',
          time: '2021-06-13 18:23:49'
        },
        {
          name: '伦理数据库',
          time: '2021-06-14 18:23:49'
        },
        {
          name: '中国生物医学文献服务系统SinoMed',
          time: '2021-06-15 18:23:49'
        },
        {
          name: '中国知网CNKI',
          time: '2021-06-16 18:23:49'
        },
        {
          name: 'Cochrane在线图书库',
          time: '2021-06-17 18:23:49'
        },
        {
          name: 'OVID电子期刊',
          time: '2021-06-18 18:23:49'
        },
        {
          name: 'Lancet',
          time: '2021-06-19 18:23:49'
        },
        {
          name: 'PubMed',
          time: '2021-06-20 18:23:49'
        },
        {
          name: 'CMJA',
          time: '2021-06-21 18:23:49'
        },
        {
          name: 'JAMA',
          time: '2021-06-22 18:23:49'
        },
        {
          name: 'NEJM',
          time: '2021-06-23 18:23:49'
        },
        {
          name: 'Embase',
          time: '2021-06-24 18:23:49'
        }
      ],
      dataSource: [
        {
          name: '生物样本库',
          selected: true
        },
        {
          name: '人遗数据库',
          selected: true
        },
        {
          name: '伦理数据库',
          selected: true
        },
        {
          name: '中国生物医学文献服务系统SinoMed',
          selected: true
        },
        {
          name: '中国知网CNKI',
          selected: true
        },
        {
          name: 'Cochrane在线图书库',
          selected: true
        },
        {
          name: 'OVID电子期刊',
          selected: true
        },
        {
          name: 'Lancet',
          selected: true
        },
        {
          name: 'PubMed',
          selected: true
        },
        {
          name: 'CMJA',
          selected: true
        },
        {
          name: 'JAMA',
          selected: true
        },
        {
          name: 'NEJM',
          selected: true
        },
        {
          name: 'Embase',
          selected: true
        },
        {
          name: '数据源1',
          selected: false
        },
        {
          name: '数据源2',
          selected: false
        },
        {
          name: '数据源3',
          selected: false
        },
        {
          name: '数据源4',
          selected: false
        }
      ],
      multipleSelection: []
    }
  },
  mounted () {
  },
  methods: {
    handleCurrentChange () { },
    handleSizeChange () { },
    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    onUpDown () {
      this.isUpDown = !this.isUpDown
    },
    onSubmit () {
      axios.post('http://www.yiigle.com/apiVue/search/searchList', {
        isAggregations: "N",
        logintoken: "6c6a8d2f3f2040019241bb8d5aa4b920",
        page: 1,
        pageSize: 10,
        query: "",
        queryString: "胃炎",
        searchLog: "胃炎",
        searchText: "胃炎",
        searchType: "pt",
        sortField: "",
        type: "",
      }).then(res=>{
        console.log(res);
      })
    },
    addDataSource () {
      this.dialogSource = true
      this.$nextTick(() => {
        this.dataSource.forEach(row => {
          row.selected && this.$refs.multipleTable.toggleRowSelection(row, true)
        })
      })
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    getRowKeys (row) {
      return row.name;
    }
  }
}
</script>

<style lang="less">
.searchFrom {
  margin-bottom: 30px;
  .searchInput {
    margin-bottom: 10px;
  }
  .selectMode {
    text-align: left;
  }
}
.el-dialog {
  .el-table {
    height: 350px;
    overflow-y: auto;
  }
}
</style>