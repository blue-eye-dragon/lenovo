<template>
  <div>
    <div class="knowledge">
      <div class="menu">
        <el-tree :data="data"
                 :props="defaultProps"
                 @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="column"></div>
      <div class="view">
        <el-table :data="tableData"
                  stripe
                  border
                  style="width: 100%">
          <el-table-column prop="id"
                           label="文档编号"
                           width="150">
          </el-table-column>
          <el-table-column prop="name"
                           label="文档名"
                           width="150">
          </el-table-column>
          <el-table-column prop="auth"
                           label="作者"
                           width="150">
          </el-table-column>
          <el-table-column prop="date"
                           label="日期"
                           width="150">
          </el-table-column>
          <el-table-column prop="introduction"
                           label="简介"
                           width="150">
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           width="120">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small">
                查看
              </el-button>
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
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [
        {
          id: '202107221',
          name: '文档1',
          auth: '作者1',
          date: '2021-07-01',
          introduction: '简单描述1'
        },
        {
          id: '202107222',
          name: '文档2',
          auth: '作者2',
          date: '2021-07-02',
          introduction: '简单描述2'
        },
        {
          id: '202107223',
          name: '文档3',
          auth: '作者3',
          date: '2021-07-03',
          introduction: '简单描述3'
        },
        {
          id: '202107224',
          name: '文档4',
          auth: '作者4',
          date: '2021-07-04',
          introduction: '简单描述4'
        },
        {
          id: '202107225',
          name: '文档5',
          auth: '作者5',
          date: '2021-07-05',
          introduction: '简单描述5'
        },
        {
          id: '202107226',
          name: '文档6',
          auth: '作者6',
          date: '2021-07-06',
          introduction: '简单描述6'
        },
        {
          id: '202107227',
          name: '文档7',
          auth: '作者7',
          date: '2021-07-07',
          introduction: '简单描述7'
        },
        {
          id: '202107228',
          name: '文档8',
          auth: '作者8',
          date: '2021-07-08',
          introduction: '简单描述8'
        },
        {
          id: '202107229',
          name: '文档9',
          auth: '作者9',
          date: '2021-07-09',
          introduction: '简单描述9'
        }
      ]
    };
  },
  methods: {
    handleNodeClick () { },
    handleCurrentChange () { },
    handleSizeChange () { }
  },
}
</script>

<style lang="less">
.knowledge {
  display: flex;
  .menu {
    flex: 1;
    min-height: calc(100vh - 200px);
  }
  .column {
    margin: 0 5px;
    border: 5px solid #e9eef3;
    border-radius: 5px;
  }
  .view {
    flex: 3;
    min-height: calc(100vh - 200px);
    // background-color: #e9eef3;
  }
}
</style>