<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="title">社区公益活动管理系统</div>
        </div>
      </div>
      <el-form
        label-position="top"
        :rules="rules"
        :model="loginForm"
        ref="loginFormRef"
        class="login-form"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            v-model.trim="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model.trim="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="usertype">
          <el-select
            v-model="loginForm.usertype"
            placeholder="请选择用户类型"
          >
            <el-option label="学员" value="1">学员</el-option>
            <el-option label="导师" value="2">导师</el-option>
            <el-option label="活动组织者" value="3">活动组织者</el-option>
            <el-option label="工作人员" value="4">工作人员</el-option>
            <el-option label="经理" value="5">经理</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">
            没有账号？ <router-link to="/register">立即注册</router-link>
          </div>
          <el-button style="width: 100%" type="primary" @click="login"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { Message } from 'element-ui'
export default {
  data () {
    return {
      loginForm: {
        username: 'abcd',
        password: 'abcdefg',
        usertype: ''
      },
      // 校验规则
      rules: {
        username: [
          { required: 'true', message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: 'true', message: '密码不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 10,
            message: '密码长度在 6 到 10 个字符',
            trigger: 'blur'
          }
        ],
        usertype: [
          { required: true, message: '请选择用户类型', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          Message.success('登录成功')
          // 未来得到token，保存到session中
          window.sessionStorage.setItem('token', 'token')
          window.sessionStorage.setItem('userRole', this.loginForm.usertype)
          // 清除token
          this.$router.push('/home')
        } else {
          Message.error('登录失败')
        }
      })
    }
  }
}
</script>

<style scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  /* background-image: linear-gradient(25deg, #077f7c, #3aa693, #5ecfaa, #7ffac2); */
}
.login-container {
  width: 420px;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
}
.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.head .title {
  font-size: 28px;
  color: #1baeae;
  font-weight: bold;
}
.head .tips {
  font-size: 12px;
  color: #999;
}
.login-form {
  width: 70%;
  margin: 0 auto;
}
</style>
<style>
.el-form--label-top .el-form-item__label {
  padding: 0;
}
.login-form .el-form-item {
  margin-bottom: 12px;
}
</style>
