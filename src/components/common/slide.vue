<template>
    <div>
        <transition name="fade">
            <div @click="visible=false" class="box-modal" v-show="showModal"></div>
        </transition>
        <transition name="slide-fade" @before-enter="showModal=visible" @before-leave="showModal=visible">
            <div class="box-container" v-show="visible">
                <div class="box-header">测试数据源</div>
                <div class="box-content">
                    <slot></slot>
                </div>
                <div class="box-footer">
                    <div class="btn-group">
                        <Button @click="click" type="primary">确定</Button>
                        <Button @click="visible=false">取消</Button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showModal: false,
      visible: this.isShow
    };
  },
  computed: {
    className() {
      return this.isShow ? "move-in" : "move-out";
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        this.$emit("close");
      }
    },
    isShow(val) {
      this.visible = val;
    }
  },
  methods: {
    click() {
      this.$emit("save");
    }
  }
};
</script>
<style scoped>
.box-modal {
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 400;
}
.box-container {
  position: fixed;
  top: 0px;
  bottom: 0;
  width: 50%;
  background-color: #fff;
  left: 50%;
  z-index: 401;
}
.box-header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
  font-size: 14px;
  position: relative;
  border-bottom: 1px solid #e9e9e9;
  color: rgba(0, 0, 0, 0.65);
  font-weight: bold;
}
.box-content {
  padding: 10px;
  overflow: auto;
}
.box-footer {
  position: absolute;
  bottom: 0px;
  height: 50px;
  line-height: 50px;
  left: 0;
  text-align: right;
  right: 0px;
  border-top: 1px solid #e9e9e9;
}
.slide-fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.btn-group {
    padding-right: 20px;
}
.ivu-btn +.ivu-btn  {
    margin-left: 10px;
}
</style>

