<template>
  <el-form :model="selected.props" size="mini" label-position="top">
    <el-form-item label="名称">
      <h3>{{selected.type}}</h3>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="text" content="按钮文本"></tip>
      <el-input v-model="text"></el-input>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="event" content="事件名"></tip>
      <el-input @blur="checkEvent" v-model="event"></el-input>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="bgColor" content="背景颜色"></tip>
      <el-color-picker alpha v-model="bgColor"></el-color-picker>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="type" content="按钮类型"></tip>
      <el-select v-model="type">
        <el-option value="default">default</el-option>
        <el-option value="primary">primary</el-option>
        <el-option value="text">text</el-option>
        <el-option value="info">info</el-option>
        <el-option value="success">success</el-option>
        <el-option value="warning">warning</el-option>
        <el-option value="danger">danger</el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="size" content="按钮大小"></tip>
      <el-select v-model="size">
        <el-option value="medium">medium</el-option>
        <el-option value="small">small</el-option>
        <el-option value="mini">mini</el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="plain" content="是否朴素按钮"></tip>
      <el-switch v-model="plain"></el-switch>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="round" content="是否圆角按钮"></tip>
      <el-switch v-model="round"></el-switch>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="circle" content="是否圆形按钮"></tip>
      <el-switch v-model="circle"></el-switch>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="disabled" content="设置按钮为禁用状态"></tip>
      <el-switch v-model="disabled"></el-switch>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="loading" content="设置按钮为加载中状态"></tip>
      <el-switch v-model="loading"></el-switch>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="icon" content="按钮图标"></tip>
      <el-select placement="top" v-model="icon">
        <el-option value="el-icon-edit" label="el-icon-edit">
          <i class="el-icon-edit"></i>
        </el-option>
        <el-option value="el-icon-check" label="el-icon-check">
          <i class="el-icon-check"></i>
        </el-option>
        <el-option value="el-icon-message" label="el-icon-message">
          <i class="el-icon-message"></i>
        </el-option>
      </el-select>
    </el-form-item>
    <!-- <FormItem>
            <tip slot="label" title="push" content="栅格向右移动格数"></tip>
            <InputNumber v-model="push"></InputNumber>
        </FormItem> -->
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
      bgColor: "",
      type: "default",
      size: "medium",
      plain: false,
      disabled: false,
      loading: false,
      round: false,
      circle: false,
      icon: "",
      text: "",
      event: "",
      message: null
    };
  },
  mounted() {
    if (this.selected.style.backgroundColor) {
      this.bgColor = this.selected.style.backgroundColor;
    }
    if (this.selected.props.type) {
      this.type = this.selected.props.type;
    }
    if (this.selected.props.size) {
      this.size = this.selected.props.size;
    }
    if (this.selected.props.plain) {
      this.plain = this.selected.props.plain;
    }
    if (this.selected.props.disabled) {
      this.disabled = this.selected.props.disabled;
    }
    if (this.selected.props.loading) {
      this.loading = this.selected.props.loading;
    }
    if (this.selected.props.icon) {
      this.icon = this.selected.props.icon;
    }
    if (this.selected.text) {
      this.text = this.selected.text;
    }
    if (this.selected.props.round) {
      this.round = this.selected.props.round;
    }
    if (this.selected.props.circle) {
      this.circle = this.selected.props.circle;
    }
  },
  watch: {
    bgColor(value) {
      this.$set(this.selected.style, "backgroundColor", value);
    },
    type(value) {
      this.$set(this.selected.props, "type", value);
    },
    size(value) {
      this.$set(this.selected.props, "size", value);
    },
    shape(value) {
      this.$set(this.selected.props, "shape", value);
    },
    plain(value) {
      this.$set(this.selected.props, "plain", value);
    },
    disabled(value) {
      this.$set(this.selected.props, "disabled", value);
    },
    loading(value) {
      this.$set(this.selected.props, "loading", value);
    },
    icon(value) {
      this.$set(this.selected.props, "icon", value);
    },
    text(value) {
      this.$set(this.selected, "text", value);
    },
    round(value) {
      this.$set(this.selected.props, "round", value);
    },
    circle(value) {
      this.$set(this.selected.props, "circle", value);
    },
    event(value) {
      if (this.message) {
        this.message.close();
      }
    }
  },
  methods: {
    checkEvent(e) {
      let template = null;
      try {
        template = require("../user/" + this.event);
        let event = {
          click: () => {
            template && template.click();
          }
        };
        this.$set(this.selected, "event", event);
      } catch (err) {
        this.message = this.$message({
          type: "error",
          message: "找不到改路径！"
        });
      }
    }
  }
};
</script>
