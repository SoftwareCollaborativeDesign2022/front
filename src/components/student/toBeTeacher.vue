<template>
  <div class="man-container">
    <div class="el-card">
      <div class="el-card__header">
        <slot name="header">
          <p>资料上传</p>
        </slot>
      </div>
      <div class="el-card__body">
        <el-row style="margin: 0px">
          <ul style="margin: 0; display: inline-block">
            <li>
              <el-upload
                class="upload"
                ref="upload"
                action="string"
                :file-list="fileList"
                :auto-upload="false"
                :http-request="uploadFile"
                :on-change="handleChange"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                multiple="multiple"
                :limit="3"
              >
                <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                  >选取文件</el-button
                >
                <el-button
                  style="margin-left: 10px"
                  size="small"
                  type="success"
                  @click="submitUpload"
                  >上传</el-button
                >
              </el-upload>
            </li>
          </ul>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import axios from "axios";
var that = null;
export default {
  name: "AddFile",
  data() {
    return {
      user: {},
      fileList: [],
      multiple: true,
      formData: "",
      theme: "",
    };
  },
  mounted() {
    that = this;
    let user = window.localStorage.getItem("access-user");
    if (user) {
      user = JSON.parse(user);
      this.user = user;
    }
  },
  methods: {
    handleChange(file, fileList) {
      const isLt5M = file.size <  1024 * 1024;
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 1M!');
        fileList.splice(-1,1); //移除选中图片
        return false;
      }
      this.fileList = fileList;
    },
    uploadFile(file) {
      this.formData.append("file", file.file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 < 2;
      if (!isLt2M) {
        Message.error("文件总数超过1M")
      }
      return
    },
    submitUpload() {
      let formData = new FormData();
      formData.append("theme", this.theme);
      console.log(this.fileList);
      for(var i = 0; i < this.fileList.length; i++){
        formData.append("file", this.fileList[i].raw);
      }
      axios({
        url: "/file/upload",
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data;charset=utf-8",
        },
      })
        .then((res) => {
          if (res.data.success) {
            Message.success("上传成功");
          } else {
            Message.error("上传失败");
            alert(res.data.message + "," + res.data.data);
          }
          this.theme = "";
          this.fileList = [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.man-container {
  margin: 0px;
  overflow: hidden;
  bottom: 0px;
  right: 0px;
  width: 100%;
  padding: 50px 20px 0px 20px;
}

.el-card {
  text-align: start;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8px;
  border: 1px solid #ddd;
  width: 98%;
}

.el-card__header {
  border-top: 1px solid #373d41;
  border-bottom: 1px solid #ddd;
  padding: 8px 10px !important;
}

.el-card__body {
  padding: 15px !important;
}

.upload {
  min-width: 400px;
  width: 40%;
}
</style>

