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
import { Message } from "element-ui";
import router from '@/router';
export default {
  data() {
    return {
      loginForm: {
        username: "111111",
        password: "111111",
      },
      // 校验规则
      rules: {
        username: [
          { required: "true", message: "账号不能为空", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        password: [
          { required: "true", message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "密码长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          var param = {};
          param.loginAccount = this.loginForm.username;
          param.password = this.loginForm.password;
          this.$http({
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
            dataType: "JSON",
            method: "post",
            url: "/auth/login",
            data: param,
          }).then((res) => {
            if (res.data.code == 200) {
              // 未来得到token，保存到session中
              window.sessionStorage.setItem("token", res.data.data.token);
              window.sessionStorage.setItem("userRole", this.getRole(res.data.data.authorities[0].authority));
              window.sessionStorage.setItem('username', this.loginForm.username)
              // 清除token
              Message.success("登录成功");
              this.$router.push("/home");
            } else {
              Message.error(res.data.msg);
            }
          }).catch(
            err => {
              Message.error("用户名或密码错误")
            }
          )
        } else {
          Message.error("登录失败");
        }
      });
    },
    getRole(roleStr){
      if(roleStr == '导师'){
        return 2
      }else if(roleStr == '学员'){
        return 1
      }else if(roleStr == '活动组织者'){
        return 3
      }else if(roleStr == '工作人员'){
        return 4
      }else if(roleStr == '经理'){
        return 5
      }
    }
  },
};
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
