<template>
  <div v-droppable="drop" class="form-box">
    <el-form></el-form>
  </div>
</template>

<script>
export default {
  props: {
    fileds: {
      default() {
        return [];
      },
      type: Array
    },
    viewList: Array
  },
  data() {
    return {
      model: {},
      list: []
    };
  },
  methods: {
    search() {
      this.$emit("search", this.$refs.form.getFormData());
    },
    reset() {
      this.$refs.form.reset();
    },
    drop(e, ui, self) {

    }
  }
};
</script>
<style>
.form-box {
  padding: 20px;
  padding-bottom: 0;
  background-color: #fafafa;
  border-radius: 4px;
}
</style>
