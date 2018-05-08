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
      <tip slot="label" title="label" content="名称"></tip>
      <el-input v-model="label"></el-input>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="valueKey" content="valueKey"></tip>
      <el-input v-model="valueKey"></el-input>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="labelWidth" content="表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值"></tip>
      <el-input-number v-model="labelWidth"></el-input-number>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="required" content="是否必填"></tip>
      <el-switch v-model="required"></el-switch>
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
      label: "",
      labelWidth: 0,
      required: false,
      valueKey: ""
    };
  },
  computed: {
    viewList() {
      return this.$store.state.viewList;
    },
    filed() {
      let view = this.viewList[this.selected.parent];
      return view.props.fileds[this.selected.index];
    }
  },
  mounted() {
    this.setAttr([
      { name: "backgroundColor", type: "style" },
      { name: "gutter", type: "props" }
    ]);
    if (this.selected.style.borderRadius) {
      this.borderRadius = parseInt(this.selected.style.borderRadius);
    }
    if (this.selected.props["label"]) {
      this.label = this.selected.props["label"];
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
    label(value) {
      this.$set(this.selected.props, "label", value);
      this.filed.title = value;
      this.filed.key = value;
    },
    labelWidth(value) {
      this.$set(this.selected.props, "label-width", value + "px");
    },
    required(value) {
      this.filed.required = value;
    },
    valueKey(value) {
      this.filed.valueKey = value;
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

