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
      <el-button type="primary">开始签到</el-button>
      <el-button type="info" @click="goBack">返&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回</el-button>
    </el-form-item>
  </el-form>
</template>
    
<script>
export default {
  data() {
    return {
      id: "",
      sizeForm: {
        name: "活动123",
        description: "活动描述",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },

  methods: {
    goBack() {
      window.history.back();
    },
  },

  mounted() {
    this.id = this.$route.query.aid;
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