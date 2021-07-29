<template>
  <div>
    <div style="textAlign:left;marginBottom:20px">
      <!-- <el-button type="primary" @click="back">返回</el-button> -->
      <el-button type="primary">下载</el-button>
    </div>
    <div>
      <el-table :data="drugData"
                style="width: 100%">
        <el-table-column prop="title"
                         label="项目"
                         width="200">
        </el-table-column>
        <el-table-column prop="content"
                         label="内容">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'instructions',
  data () {
    return {
      drugData: [
        {
          title: '药品名称',
          content: '硫酸阿托品片'
        },
        {
          title: '成份',
          content: '本品主要成份为硫酸阿托品。化学名称:α-（羟甲基）苯乙酸 8-甲基-8-氮杂双环[3，2，1]-3-辛酯硫酸盐一水合物。分子式:（C17H23NO3）2˙H2SO4˙H2O分子量:694.84'
        },
        {
          title: '用法用量',
          content: '口服: 每次 0.3～0.6 mg（1 片～2 片），一日 3 次，极量每次 1 mg（3 片），一日 3 mg（10 片）。'
        },
        {
          title: '禁忌',
          content: '青光眼及前列腺肥大者、高热者禁用。'
        },
        {
          title: '注意事项',
          content: '1、对其他颠茄生物碱不耐受者, 对本品也不耐受。2、孕妇静脉注射阿托品可使胎儿心动过速。3、本品可分泌入乳汁, 并有抑制泌乳作用。4、婴幼儿对本品的毒性反应极有敏感, 特别是痉挛性麻痹与脑损伤的小儿'
        },
        {
          title: '孕妇及哺乳期妇女用药',
          content: '有关本品对孕妇的安全性尚不明确，孕妇使用需考虑用药的利弊。本品可分泌至乳汁，并有抑制泌乳作用，哺乳期妇女慎用。'
        },
        {
          title: '药理作用',
          content: '抑制受体/节后胆碱能神经支配的平滑肌与腺体活动，并根据本品剂量大小，有刺激或抑制中枢神`经系统作用。解毒系在 M 胆碱受体部位拮抗胆碱酯酶抑制剂的作用，如增加气管、支气管系粘液腺与唾液腺的分泌，支气管'
        },
        {
          title: '药代动力学',
          content: '本品易从/胃肠道及其他粘膜吸收。也可从眼或少量从皮肤吸收。口服 1 小时后即达峰效应，T1/2为 3.7～4.3 小时。血`浆蛋白结合率为 14～22%，分布容积为 1.7L/kg，可迅速分布于全身组'
        },
        {
          title: '是否OTC',
          content: '否'
        },
        {
          title: '核准日期',
          content: '2007-03-23 '
        },
        {
          title: '修改日期',
          content: '2007-03-23'
        }
      ]
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
}
</script>

<style>
</style>