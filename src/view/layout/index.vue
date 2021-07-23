<template>
  <div>
    <el-container class="layout">
      <el-aside>
        <div class="asideInfo">
          <img class="asideImg"
               :src="imgSrc"
               alt="">
          <p v-if="isSider"
             class="asideName">科研服务平台</p>
        </div>
        <Aside class="asideMenu"></Aside>
      </el-aside>
      <el-main>
        <transition :duration="{ enter: 800, leave: 100 }"
                    mode="out-in"
                    name="el-fade-in-linear">
          <div :style="{width: `calc(100% - ${isCollapse?'54px':'220px'})`}"
               class="topfix">

            <el-row :gutter="20"
                    class="header">
              <el-col :span="2">
                <div class="menu-total"
                     @click="totalCollapse">
                  <i v-if="isCollapse"
                     class="el-icon-s-unfold" />
                  <i v-else
                     class="el-icon-s-fold" />
                </div>
              </el-col>
              <el-col :span="10">
                <el-breadcrumb class="breadcrumb"
                               separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item v-for="item in matched.slice(1,matched.length)"
                                      :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
                </el-breadcrumb>
              </el-col>
              <el-col :span="12"
                      style="text-align:right">
                <el-dropdown>
                  <span class="header-avatar"
                        style="cursor: pointer">
                    <!-- <CustomPic /> -->
                    <span style="margin-left: 5px">{{ userInfo.nickName }}</span>
                    <i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown"
                                    class="dropdown-group">
                    <el-dropdown-item icon="el-icon-s-custom"
                                      @click.native="toPerson">个人信息</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-table-lamp"
                                      @click.native="LoginOut">登 出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
            <HistoryComponent />
          </div>
        </transition>
        <!-- <router-view class="viewShow"></router-view>  -->
        <transition mode="out-in"
                    name="el-fade-in-linear">
          <keep-alive>
            <router-view element-loading-text="正在加载中"
                         class="viewShow" />
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Aside from '@/view/layout/aside'
import HistoryComponent from '@/view/layout/aside/historyComponent/history'
import CustomPic from '@/components/customPic'
import logoImg from "@/assets/logo.jpg";
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Layout',
  components: {
    Aside,
    CustomPic,
    HistoryComponent
  },
  data () {
    return {
      isCollapse: false,
      isSider: true,
      reloadFlag: true,
      loadingFlag: true,
      imgSrc: logoImg
    }
  },
  computed: {
    // title() {
    //   return this.$route.meta.title || '当前页面'
    // },
    ...mapGetters(['userInfo']),
    matched () {
      console.log(this.$route.matched);
      return this.$route.matched
    }
  },
  mounted () {
    const screenWidth = document.body.clientWidth
    if (screenWidth < 1000) {
      this.isMobile = true
      this.isSider = false
      this.isCollapse = true
    } else if (screenWidth >= 1000 && screenWidth < 1200) {
      this.isMobile = false
      this.isSider = false
      this.isCollapse = true
    } else {
      this.isMobile = false
      this.isSider = true
      this.isCollapse = false
    }
    this.bus.$emit('collapse', this.isCollapse)
    this.bus.$emit('mobile', this.isMobile)
    this.bus.$on('reload', this.reload)
    this.bus.$on('showLoading', () => {
      this.loadingFlag = true
    })
    this.bus.$on('closeLoading', () => {
      this.loadingFlag = false
    })
    window.onresize = () => {
      return (() => {
        const screenWidth = document.body.clientWidth
        if (screenWidth < 1000) {
          this.isMobile = true
          this.isSider = false
          this.isCollapse = true
        } else if (screenWidth >= 1000 && screenWidth < 1200) {
          this.isMobile = false
          this.isSider = false
          this.isCollapse = true
        } else {
          this.isMobile = false
          this.isSider = true
          this.isCollapse = false
        }
        this.bus.$emit('collapse', this.isCollapse)
        this.bus.$emit('mobile', this.isMobile)
      })()
    }
  },
  methods: {
    totalCollapse () {
      this.isCollapse = !this.isCollapse
      this.isSider = !this.isCollapse
      // this.isShadowBg = !this.isCollapse
      this.bus.$emit('collapse', this.isCollapse)
    },
    LoginOut () {
      window.sessionStorage.clear()
      this.$router.push({
        name: 'Login'
      })
    },
    toPerson () {
      this.$router.push({
        name: 'person'
      })
    }
  },
}
</script>

<style lang="less">
.layout {
  width: 100%;
  height: 100vh;
  .el-aside {
    width: auto !important;
    background-color: #191a23;
    color: #fff;
    overflow: visible;
    .asideInfo {
      height: 60px;
      line-height: 60px;
      text-align: center;
      .asideImg {
        width: 40px;
        height: 40px;
        vertical-align: middle;
        background: #fff;
        border-radius: 50%;
        // padding: 3px;
      }
      .asideName {
        display: inline-block;
        color: #fff;
        font-weight: 600;
        font-size: 20px;
        vertical-align: middle;
        padding-left: 10px;
      }
    }
    .asideMenu {
      height: calc(100vh - 64px);
      overflow-y: auto;
    }
  }

  .el-main {
    position: relative;
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    padding: 0;
    .topfix {
      position: fixed;
      top: 0;
      box-sizing: border-box;
      z-index: 999;

      .header {
        height: 60px;
        line-height: 60px;
        text-align: left;
        padding: 0 20px;
        background-color: #fff;
        border-bottom: 1px solid #f4f4f4;
        margin: 0 !important;
        .menu-total {
          font-size: 22px;
        }
        .breadcrumb {
          height: 60px;
          line-height: 60px;
          background-color: #fff;
          padding: 0;
        }
      }
    }
    .viewShow {
      min-height: calc(100vh - 200px);
      background-color: #fff;
      padding: 14px;
      margin: 120px 14px 20px;
      border-radius: 2px;
    }
    .viewShow:after,
    .viewShow:before {
      content: "";
      display: block;
      clear: both;
    }
  }
}
</style>