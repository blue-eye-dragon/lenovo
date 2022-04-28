<template>
  <div class="big">
    <el-row class="topInfo">
      <el-col :xs="24" :sm="24" :lg="12">
        <div>
          早安，<span>{{userInfo.nickName}}</span>，请开始一天的工作吧
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">

      </el-col>
    </el-row>
    <div class="shadow">
      <el-row :gutter="20">
        <el-col
          v-for="(card, key) in toolCards"
          :key="key"
          :span="4"
          :xs="8"
          @click.native="toTarget(card.name)"
        >
          <el-card shadow="hover" class="grid-content">
            <i :class="card.icon" :style="{ color: card.color }" />
            <p>{{ card.label }}</p>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-row class="echartsBox">
      <el-col :xs="24" :sm="24" :md='8' class="boxLeft" :style="'width:'+leftWidth">
        <div id="subjectPro" class="subjectPro"></div>
      </el-col>
      <el-col :xs="24" :sm="24" :md='16' class="boxRight" :style="'width:'+leftWidth">
        <template>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <div id="subjectTim" class="subjectTim"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { EleResize } from '@/utils/esresize';
export default {
  name: 'workState',
  data() {
    return {
      toolCards: [
        {
          label: '用户管理',
          icon: 'el-icon el-icon-user',
          name: 'user',
          color: '#ff9c6e'
        },
        {
          label: '角色管理',
          icon: 'el-icon el-icon-setting',
          name: 'authority',
          color: '#69c0ff'
        },
        {
          label: '菜单管理',
          icon: 'el-icon el-icon-menu',
          name: 'menu',
          color: '#b37feb'
        },
        {
          label: 'api管理',
          icon: 'el-icon el-icon-cpu',
          name: 'api',
          color: '#ffd666'
        },
        {
          label: '机构管理',
          icon: 'el-icon el-icon-document-checked',
          name: 'organizational',
          color: '#ff85c0'
        },
        {
          label: '字典管理',
          icon: 'el-icon el-icon-monitor',
          name: 'dictionary',
          color: '#5cdbd3'
        },
        {
          label: '课题管理',
          icon: 'el-icon el-icon-tickets',
          name: 'project',
          color: '#5cdbd3'
        }
      ],
      options: [
        {
          value: '2018',
          label: '2018年'
        }, {
          value: '2019',
          label: '2019年'
        }, {
          value: '2020',
          label: '2020年'
        }, {
          value: '2021',
          label: '2021年'
        }, {
          value: '2022',
          label: '2022年'
        }
      ],
      leftWidth: '',
      value: '2021'
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  mounted () {
    const screenWidth = document.body.clientWidth

    if (screenWidth < 1000) {
      this.leftWidth = screenWidth - 40 + 'px'
    } else {
      this.leftWidth = null
    }
    this.$nextTick(()=>{
      setTimeout(()=>{ 
        this.subjectProCharts()
        this.subjectTimCharts()
      },300)
    })
  },
  methods: {
    toTarget(name) {
      this.$router.push({ name })
    },
    subjectProCharts () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('subjectPro'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
            trigger: 'item'
        },
        legend: {
            left: 'center'
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'

                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: 1048, name: '暂存'},
                    {value: 735, name: '审批'},
                    {value: 580, name: '通过'},
                    {value: 484, name: '暂停'},
                    {value: 300, name: '终止'},
                    {value: 200, name: '完成'}
                ]
            }
        ]
      })
      window.addEventListener('resize',function(){
        if(myChart){
             myChart.resize()   // 不报错
        }
      })
    },
    subjectTimCharts () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('subjectTim')) // 绘制图表
      myChart.setOption({
        xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [150, 230, 224, 218, 135, 147, 260, 224, 218, 135, 147, 260],
            type: 'line'
        }]
      })
      window.addEventListener('resize',function(){
        if(myChart){
             myChart.resize()   // 不报错
        }
      })
    }
  }
}
</script>

<style lang="less">
.el-row {
  padding: 0 !important;
}
.big {
  .topInfo {
    height: 100px;
    border-bottom: 10px solid #eeeeee;
  }
  .shadow {
  padding: 10px 0;
      border-radius: 4px;
  border-bottom: 10px solid #eeeeee;
  .grid-content {
      background-color: #fff;
      border-radius: 4px;
      text-align: center;
      padding: 10px 0;
      margin: 10px 0;
      cursor: pointer;

      .el-icon {
          width: 30px;
          height: 30px;
          font-size: 30px;
          margin-bottom: 8px;
      }
  }
  }
  .echartsBox {
    .boxLeft {
      .subjectPro {
        height: 400px;
        padding: 20px 0;
      }
    }
    .boxRight {
      border-left: 10px solid #eeeeee;
      .el-select {
        margin: 10px;
      }
      .subjectTim {
        height: 400px;
        padding: 20px 0;
      }
    }
  }
}
@media (max-width: 1000px) {
  .boxLeft {
    border-right: 0px !important;
    border-bottom: 10px solid #eeeeee;
  }
}
</style>