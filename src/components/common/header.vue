<template>
  <header>
    <div class="left-section">
      <img class="my-icon" :class="{'icon-lg': !isExpand,'icon-mini': isExpand}" src="https://cn.vuejs.org/images/logo.png" />
    </div>
    <div class="right-section">
      <div class="icon-container" @click="expand">
        <i class="fa fa-bars icon" aria-hidden="true"></i>
      </div>
      <!-- <div class="breadcrumb-box">
                <el-breadcrumb style="height: 64px; line-height:64px;" separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <a href="/">活动管理</a>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div> -->
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      isExpand: false
    };
  },
  methods: {
    expand() {
      this.isExpand = !this.isExpand;
      this.isExpand
        ? $(".left-section").animate({ width: "64px" }, 300)
        : $(".left-section").animate({ width: "200px" }, 300);
      this.$emit("toggle", this.isExpand);
    }
  }
};
</script>
<style scoped>
header {
  height: 64px;
  display: flex;
}
header .left-section {
  height: 100%;
  background-color: #001529;
  width: 200px;
  text-align: center;
  overflow: hidden;
  box-shadow: -5px 10px 10px #000;
  position: relative;
  z-index: 99;
}
header .left-section-expand {
  width: 200px;
}
header .left-section .icon-lg {
  height: 40px;
  margin-top: 12px;
}
header .left-section .icon-mini {
  height: 30px;
  margin-top: 17px;
}
header .right-section {
  height: 100%;
  background-color: #fff;
  flex: 1;
  position: relative;
  z-index: 100;
  padding: 0 30px;
  display: flex;
}
header .right-section .icon-container {
  height: 64px;
  line-height: 64px;
  cursor: pointer;
  background-color: #fff;
  color: #001529;
  font-size: 20px;
  display: inline-block;
  width: 64px;
  flex: 0 0 64px;
}
header .right-section .icon-container:hover {
  background-color: #fff;
  color: rgba(00, 15, 29, 0.8);
}
header .el-menu {
  border-right: 0;
}
.my-icon {
  transition: all 0.3s linear;
}
.breadcrumb-box {
  flex: 1;
  line-height: 64px;
  height: 64px;
}
</style>
