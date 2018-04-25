<template>
  <el-form :model="selected.props" label-position="top">
    <el-form-item label="名称">
      <h3>{{selected.type}}</h3>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="backgroundColor" content="背景颜色"></tip>
      <el-color-picker show-alpha size="small" v-model="backgroundColor"></el-color-picker>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="radius" content="圆角"></tip>
      <el-input-number v-model="borderRadius"></el-input-number>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="padding" content="内边距"></tip>
      <el-input @blur="setPadding" v-model="padding"></el-input>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="margin" content="外边距"></tip>
      <el-input @blur="setMargin" v-model="margin"></el-input>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="gutter" content="栅格间距，单位 px，左右平分"></tip>
      <el-input-number v-model="gutter"></el-input-number>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    selected: {
      default: {},
      type: Object
    }
  },
  data() {
    return {
      backgroundColor: "",
      gutter: 0,
      borderRadius: 0,
      padding: "",
      margin: ""
    };
  },
  mounted() {
    this.setAttr([
      { name: "backgroundColor", type: "style" },
      { name: "gutter", type: "props" }
    ]);
    if (this.selected.style.borderRadius) {
      this.borderRadius = parseInt(this.selected.style.borderRadius);
    }
  },
  watch: {
    backgroundColor(value) {
      this.$set(this.selected.style, "backgroundColor", value);
    },
    gutter(value) {
      this.$set(this.selected.props, "gutter", value);
    },
    borderRadius(value) {
      this.$set(this.selected.style, "borderRadius", value + "px");
    }
  },
  methods: {
    setAttr(attrs) {
      attrs.map(o => {
        let type = o.type;
        let name = o.name;
        if (this.selected[type][name]) {
          this[name] = this.selected[type][name];
        }
      });
    },
    setPadding() {
      this.$set(this.selected.style, "padding", this.padding);
    },
    setMargin() {
      this.$set(this.selected.style, "margin", this.margin);
    }
  }
};
</script>
<style scoped>
.r {
  border-radius: 0;
}
</style>

