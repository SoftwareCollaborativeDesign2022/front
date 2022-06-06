 <template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="title">添加账号</div>
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

        <el-form-item label="密码" prop="newpassword">
          <el-input
            type="password"
            v-model.trim="loginForm.newpassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="twonewpassword">
          <el-input
            type="password"
            v-model.trim="loginForm.twonewpassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号身份">
          <el-select v-model="loginForm.role" placeholder="请选择账号身份">
            <el-option label="活动组织者" value="活动组织者"></el-option>
            <el-option label="工作人员" value="工作人员"></el-option>
            <el-option label="经理" value="经理"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="register"
            >注册</el-button
          >
        </el-form-item>
        <el-button style="width: 100%" type="info" @click="goBack"
          >返回</el-button
        >
      </el-form>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
import axios from "axios";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.loginForm.twonewpassword !== "") {
          this.$refs.loginFormRef.validateField("twonewpassword");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.newpassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "222222",
        newpassword: "222222",
        twonewpassword: "222222",
        role: ''
      },

      // 校验规则
      rules: {
        username: [
          { required: "true", message: "账号不能为空", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        newpassword: [
           { required: "true", message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "密码长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
        twonewpassword: [{ validator: validatePass2, trigger: "blur" }],
        role: [{ required: "true", message: "角色不能为空", trigger: "blur" }],
      },
    };
  },

  methods: {
    register() {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          // 发起请求
          var param = {};
          param.loginAccount = this.loginForm.username;
          param.password = this.loginForm.newpassword;
          param.roleName = this.loginForm.role;
          console.log(this.loginForm.username)
          console.log(this.loginForm.newpassword)
          console.log(this.loginForm.role)
          this.$http({
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
            dataType: "JSON",
            method: "post",
            url: "/manager/register_staff",
            data: param,
          }).then((res) => {
            console.log(res.data);
            if (res.data.code === 200) {
              Message.success(res.data.msg);
              // 跳转到登录页面
            } else {
              Message.error(res.data.msg);
            }
          });
        } else {
          Message.error(res.data.msg);
        }
      });
    },
    goBack() {
      window.history.back();
    },
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
  height: 670px;
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
