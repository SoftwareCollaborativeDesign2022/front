<template>
  <el-form
    label-position="top"
    :rules="rules"
    :model="ruleForm"
    ref="ruleForm"
    class="formCss"
  >
    <el-form-item label="活动名称" prop="name">
      <el-input
        type="text"
        v-model.trim="ruleForm.name"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <el-form-item label="指导老师账号" prop="tid">
      <!-- <el-select
        v-model="ruleForm.tid"
        placeholder="指导老师账号"
        @click="getTeacher"
      >
      </el-select> -->
      <el-select v-model="value" placeholder="请选择指导老师账号">
    <el-option
      v-for="item in ruleForm.tid"
      :key="item.id"
      :label="item.username"
      :value="item.id">
    </el-option>
  </el-select>
    </el-form-item>

    <el-form-item label="活动描述" prop="desc">
      <el-input
        type="textarea"
        v-model.trim="ruleForm.desc"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit">立即申请</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Message } from "element-ui";
import router from "@/router";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        tid: {},
        desc: "",
      },
      value: '',
      // 校验规则
      rules: {
        name: [
          { required: "true", message: "活动id不能为空", trigger: "blur" },
        ],
        tid: [
          { required: "true", message: "指导老师id不能为空", trigger: "blur" },
        ],
        desc: [
          { required: "true", message: "活动描述不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let param = new URLSearchParams();
          param.append("desc", this.ruleForm.desc);
          param.append("menetorId", this.value);
          param.append("name", this.ruleForm.name);
          console.log(this.value)
          this.$http({
            url: "/activity/createAct",
            method: "post",
            data: param,
          }).then((res) => {
            console.log(res.data.success);
            if (res.data.success) {
              Message.success("申请成功");
              this.$router.push("/allActivity");
            } else {
              Message.error("申请失败，请稍后再试");
            }
          });
        } else {
          Message.error("出错了，请稍后再试");
        }
      });
    },
    getTeacher() {
      this.$http({
        url: "/activity/getMentor",
        method: "post",
      }).then((res) => {
        var list = {};
        for(var i = 0; i < res.data.length; i++){
            let param = {}
            param.id = res.data[i].id
            param.username = res.data[i].username
            list[i] = param
        }
        this.ruleForm.tid = list
      });
    },
  },
  mounted() {
      this.getTeacher()
  }
};
</script>

<style scoped>
.formCss {
  width: 500px;
  margin: 0 auto;
  padding-top: 5%;
}
</style>
