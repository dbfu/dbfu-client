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
      <tip slot="label" title="submit" content="表单提交事件"></tip>
      <el-input @blur="setEvent" v-model="submit"></el-input>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="label-position" content="表单域标签的位置"></tip>
      <el-select v-model="labelPosition">
        <el-option value="top">top</el-option>
        <el-option value="left">left</el-option>
        <el-option value="right">right</el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="labelWidth" content="表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值"></tip>
      <el-input-number v-model="labelWidth"></el-input-number>
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
      margin: "",
      labelPosition: "right",
      labelWidth: 0,
      submit: ""
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
    if (this.selected.props["label-position"]) {
      this.labelPosition = this.selected.props["labelPosition"];
    }
    if (this.selected.props["label-width"]) {
      this.labelWidth = parseInt(this.selected.props["label-width"]);
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
    },
    labelPosition(value) {
      this.$set(this.selected.props, "labelPosition", value);
    },
    labelWidth(value) {
      this.$set(this.selected.props, "label-width", value + "px");
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
    },
    setEvent() {
      let template = require("../user/" + this.submit);
      let event = {
        submit: template.click
      };
      this.$set(this.selected, "event", event);
    }
  }
};
</script>
<style scoped>
.r {
  border-radius: 0;
}
</style>

