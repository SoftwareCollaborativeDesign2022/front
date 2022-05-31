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
    <el-form-item label="活动状态">
      <el-input v-model="sizeForm.status" :disabled="true"></el-input>
    </el-form-item>
    
    <el-form-item size="large" align="center">
      <el-button type="primary" @click="pass">通过审核</el-button>

      <el-button type="info" @click="goBack">返&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回</el-button>
    </el-form-item>
  </el-form>
</template>
    
<script>
import { Message } from "element-ui";
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
        desc: "",
        status: "",
      },
    };
  },

  methods: {
    goBack() {
      window.history.back();
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
        this.sizeForm.status = res.data.status
      })
    },
    pass(){
        let param = new URLSearchParams()
        param.append("id", this.id)
        this.$http({
            url: 'activity/staffPass',
            method: 'post',
            data: param
        }).then((res) => {
            console.log(res.data)
            if(res.data.success){
                Message.success("操作成功")
                this.getActivityInfo()
            }else{
                Message.error("操作失败，请重试")
            }
        }).catch(
            err => {
              Message.error("错除了，请重试")
            }
          )
    }
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