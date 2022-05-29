<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="title">修改信息</div>
        </div>
      </div>
      <el-form
        label-position="top"
        :rules="rules"
        :model="loginForm"
        ref="loginFormRef"
        class="login-form"
      >
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model.trim="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpassword">
          <el-input
            type="password"
            v-model.trim="loginForm.newpassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="twonewpassword">
          <el-input
            type="password"
            v-model.trim="loginForm.twonewpassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="modify"
            >确认修改</el-button
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
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.loginForm.twonewpassword !== '') {
          this.$refs.loginFormRef.validateField('twonewpassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.loginForm.newpassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        password: '',
        newpassword: '',
        twonewpassword: ''
      },

      // 校验规则
      rules: {
        password: [
          { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ],
        newpassword: [
          { validator: validatePass, trigger: 'blur' },
          {
            min: 6,
            max: 10,
            message: '新密码长度在 6 到 10 个字符',
            trigger: 'blur'
          }
        ],
        twonewpassword: [
          { validator: validatePass2, trigger: 'blur' }

        ]
      }
    }
  },

  methods: {
    modify () {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.$confirm('此操作将修改密码，需要重新登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var param = {};
            param.oldPassword = this.loginForm.password;
            param.newPassword = this.loginForm.newpassword;
            this.$http({
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
            dataType: "JSON",
            method: "post",
            url: "/user/changepassword",
            data: param,
          }).then((res) => {
            if(res.data.success){
              Message.success("修改成功")
              this.$router.push("/login")
              return
            }
            Message.error("修改失败")
          })

          })
        } else {
          Message.error('填写信息有误，请重新填写')
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
