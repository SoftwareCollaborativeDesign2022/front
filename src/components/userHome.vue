<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span> 社区公益活动管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :router="true"
        >
          <!-- 一级菜单 -->
          <el-menu-item index="/allActivity" v-show="canStudent">
            <i class="el-icon-menu"></i>
            <span slot="title">活动</span>
          </el-menu-item>

          <!-- 一级菜单 -->
          <el-menu-item index="/allActivityOfTeacher" v-show="TeacherAndMore">
            <i class="el-icon-menu"></i>
            <span slot="title">所有活动</span>
          </el-menu-item>

          <!-- 导师： 活动签到、活动抢单 -->
          <el-menu-item v-show="canSee" index="/teacherActivityList">
            <i class="el-icon-s-check"></i>
            <span slot="title">我的活动</span>
          </el-menu-item>

          <!-- 修改信息 -->
          <el-menu-item index="/userModify">
            <i class="el-icon-setting"></i>
            <span slot="title">修改信息</span>
          </el-menu-item>

          <!-- 成为导师 -->
          <el-menu-item index="/toBeTeacher" v-show="canStudent">
            <i class="el-icon-setting"></i>
            <span slot="title">成为导师</span>
          </el-menu-item>

          <!-- 活动申请（活动） -->
          <el-menu-item index="/createAct" v-show="canorg">
            <i class="el-icon-setting"></i>
            <span slot="title">申请活动</span>
          </el-menu-item>

          <!-- 审核活动 工作人员 -->
          <el-menu-item index="/staffCheck" v-show="canWorkers">
            <i class="el-icon-setting"></i>
            <span slot="title">审核活动</span>
          </el-menu-item>

          <!-- 审核活动 经理 -->
          <el-menu-item index="/managerCheck" v-show="canManager">
            <i class="el-icon-setting"></i>
            <span slot="title">审核活动</span>
          </el-menu-item>

          <!-- 审核活动 经理 -->
          <el-menu-item index="/addAccount" v-show="canManager">
            <i class="el-icon-setting"></i>
            <span slot="title">添加账号</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      userRole: "",
      canSee: "",
      canStudent: false,
      canorg: false,
      canWorkers: false,
      TeacherAndMore: false,
      canManager: false,
    };
  },

  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    itemDisplay() {
      if (parseInt(this.userRole) != 2) {
        this.canSee = false;
      } else {
        this.canSee = true;
      }

      if(parseInt(this.userRole) == 1){
        this.canStudent = true;
      }

      if(parseInt(this.userRole) > 1){
        this.TeacherAndMore = true;
      }

      if(parseInt(this.userRole) == 3){
        this.canorg = true;
      }

      if(parseInt(this.userRole) == 4){
        this.canWorkers = true;
      }

      if(parseInt(this.userRole) == 5){
        this.canManager = true;
      }

    },
  },

  mounted() {
    this.userRole = window.sessionStorage.getItem("userRole");
    this.itemDisplay();
  },
};
</script>

<style  scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
