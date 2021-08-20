<template>
  <div id="userLayout">
    <div class="loginform">
      <h2 class="topTitle">科研服务平台</h2>
      <el-form ref="loginForm"
               :model="loginForm"
               :rules="rules"
               @keyup.enter.native="submitForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"
                    placeholder="请输入用户名">
            <i slot="suffix"
               class="el-input__icon el-icon-user" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"
                    :type="lock === 'lock' ? 'password' : 'text'"
                    placeholder="请输入密码">
            <i slot="suffix"
               :class="'el-input__icon el-icon-' + lock"
               @click="changeLock" />
          </el-input>
        </el-form-item>
        <!-- <el-form-item style="position: relative">
          <el-input v-model="loginForm.captcha"
                    name="logVerify"
                    placeholder="请输入验证码"
                    style="width: 60%" />
          <div class="vPic">
            <img v-if="picPath"
                 :src="picPath"
                 width="100%"
                 height="100%"
                 alt="请输入验证码"
                 @click="loginVerify()">
          </div>
        </el-form-item> -->
        <div />
        <el-form-item style="textAlign:center">
          <!-- <el-button type="primary"
                     style="width: 46%"
                     @click="checkInit">前往初始化</el-button> -->
          <el-button type="primary"
                     style="width: 50%;marginTop:20px"
                     @click="submitForm">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { captcha } from '@/api/user'
// import { checkDB } from '@/api/initdb'
export default {
  name: 'login',
  data () {
    const checkUsername = (rule, value, callback) => {
      if (value.length < 5) {
        return callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const checkPassword = (rule, value, callback) => {
      if (value.length < 6) {
        return callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }
    return {
      lock: 'lock',
      picPath: '',
      loginForm: {
        username: 'admin',
        password: '123456',
        captcha: '',
        captchaId: ''
      },
      rules: {
        username: [{ validator: checkUsername, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }]
      },
    }
  },
  created () {
    // this.loginVerify()
  },
  methods: {
    ...mapActions('user', ['LoginIn']),
    changeLock () {
      this.lock = this.lock === 'lock' ? 'unlock' : 'lock'
    },
    loginVerify () {
      captcha({}).then((ele) => {
        console.log(ele);
        this.picPath = ele.data.picPath
        this.loginForm.captchaId = ele.data.captchaId
      })
    },
    async login () {
      return await this.LoginIn(this.loginForm)
    },
    async submitForm () {
      this.$refs.loginForm.validate(async (v) => {
        if (v) {
          // const flag = await this.login()
          // if (!flag) {
          //   this.loginVerify()
          // }
          this.$router.push({name: 'workState'})
        } else {
          this.$message({
            type: 'error',
            message: '请正确填写登录信息',
            showClose: true
          })
          // this.loginVerify()
          return false
        }
      })
    },
  },
}
</script>

<style lang="less">
#userLayout {
  width: 100%;
  height: 100vh;
  background: url(../../assets/login_background.svg);
  background-size: cover;
  position: relative;
  .topTitle {
    text-align: center;
    line-height: 60px;
  }
  .loginform {
    position: absolute;
    top: 30vh;
    right: 16vw;
    width: 350px;
    background-color: #fff;
    padding: 40px 40px 40px 40px;
    border-radius: 10px;
    box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.2);
  }
}
@media (max-width: 750px) {
#userLayout {
  width: 100%;
  height: 100vh;
  background: url(../../assets/login_background.svg);
  background-size: cover;
  position: relative;
  .topTitle {
    text-align: center;
    line-height: 60px;
  }
  .loginform {
    position: absolute;
    top: 30vh;
    right: 16vw;
    width: 50vw;
    background-color: #fff;
    padding: 40px 40px 40px 40px;
    border-radius: 10px;
    box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.2);
  }
}

}
</style>