<template>
    <div class="box">
        <d-view v-for="(item,index) in viewList" :key="index" :params="item"></d-view>
    </div>
</template>
<script>
import view from "../common/element";
export default {
  components: {
    "d-view": view
  },
  computed: {
    viewList() {
      return this.$store.state.viewList;
    }
  }
};
</script>
<style scoped>
.box {
    margin: 8px 16px;
    padding: 27px 20px 0 20px;
    height: calc(100vh - 64px);
    background: #fff;
    overflow-y: auto;
}
</style>


