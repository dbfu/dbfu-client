<template>
  <div v-droppable="drop" class="form-box">
    <el-form>
      
    </el-form>
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
      list: [
        {
          type: "text",
          key: "name",
          title: "名称",
          defaultValue: "13443"
        },
        {
          type: "text",
          key: "name",
          title: "名称"
        },
        {
          type: "text",
          key: "name",
          title: "名称"
        }
      ]
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
      let id = $(self).attr("id");
      let v = this.viewList[id];
      let item = {
        type: "el-form-item",
        children: [{ type: "el-input" }]
      };
      v.children.push(item);
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
