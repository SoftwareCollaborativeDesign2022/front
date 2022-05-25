<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
<el-table-column
      prop="id"
      label="活动id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="活动名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="teacher"
      label="活动导师">
    </el-table-column>
<el-table-column
      prop="address"
      label="活动地点">
    </el-table-column>
<el-table-column
      prop="topic"
      label="活动主题">
    </el-table-column>
<el-table-column
      prop="content"
      label="活动内容">
    </el-table-column>
<el-table-column
      prop="teacher"
      label="活动导师">
    </el-table-column>
<el-table-column label="操作" width="180px">
          <template >
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini">签到</el-button>

            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini">报名</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        id: '活动id',
        name: '活动一',
        teacher: '王老师',
        address: '活动地点',
        topic: '活动主题',
        content: '活动内容'
      }, {
        id: '活动id',
        name: '活动一',
        teacher: '王老师',
        address: '活动内容',
        topic: '活动主题',
        content: '活动内容'
      }, {
        id: '活动id',
        name: '活动一',
        teacher: '王老师',
        address: '活动内容',
        topic: '活动主题',
        content: '活动内容'
      }, {
        id: '活动id',
        name: '活动一',
        teacher: '王老师',
        address: '活动内容',
        topic: '活动主题',
        content: '活动内容'
      }]
    }
  }
}
</script>
