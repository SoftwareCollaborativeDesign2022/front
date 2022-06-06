<template>
  <el-form
    ref="form"
    router
    :model="sizeForm"
    label-width="80px"
    size="mini"
    class="formCss"
  >
    <el-form-item label="活动名称">
      <el-input v-model="sizeForm.name" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="活动简介">
      <el-input v-model="sizeForm.description" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item size="large" align="center">
      <el-button type="primary" @click="sigUp">申请报名</el-button>
      <el-button type="info" @click="goBack"
        >返&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回</el-button
      >
    </el-form-item>
  </el-form>
</template>
    
<script>
export default {
  data() {
    return {
      id: "",
      sizeForm: {
        name: "",
        description: "",
        delivery: false,
        type: [],
        resource: "",
      },
    };
  },

  methods: {
    goBack() {
      window.history.back();
    },
    sigUp() {
      let param = new URLSearchParams();
      param.append("id", this.id);
      param.append("username", window.sessionStorage.getItem("username"));
      this.$http({
        url: "/activity/enroll",
        method: "post",
        data: param,
      }).then((res) => {
        console.log(res.data);
      });
    },
    getActivityInfo() {
      let param = new URLSearchParams()
      param.append("id", this.id)
      this.$http({
        url: '/activity/getDesc',
        method: 'post',
        data: param
      })
      .then((res) => {
        this.sizeForm.name = res.data.name
        this.sizeForm.description = res.data.description
      })
    },
  },

  mounted() {
    this.id = this.$route.query.aid;
    this.getActivityInfo()
  },
};
</script>


<style>
.formCss {
  width: 500px;
  margin: 0 auto;
  padding-top: 5%;
}
</style>