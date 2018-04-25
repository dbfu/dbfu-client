<template>
  <div @click="click">
    <Row :gutter="gutter">
      <div v-for="(i,index) in spanList" :key="index" @click="click(`col`,index)">
          <Col :class="{col: true, border: selectedIndex === index}" :style="{backgroundColor: colors[index%2]}" :span="i">
          </Col>
      </div>
    </Row>
  </div>
</template>

<script>
export default {
  props: {
    columnCount: {
      default: 3,
      type: Number
    },
    rowCount: {
      default: 1,
      type: Number
    },
    gutter: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      colors: ["#aaa", "#ccc"],
      spanList: [],
      selectedIndex: 0
    };
  },
  watch: {
    columnCount(value) {
      this.computer();
    },
    rowCount(value) {
      this.computer();
    }
  },
  computed: {},
  mounted() {
    this.computer();
  },
  methods: {
    click(type, index) {
      if (type === "col") {
        this.selectedIndex = index;
      }
      this.$emit("click", {});
    },
    computer() {
      this.spanList = [];
      for (let i = 0; i < this.rowCount * this.columnCount; i++) {
        this.spanList.push(parseInt(24 / this.columnCount));
      }
    }
    //     span(index) {
    //       if (24 % this.columnCount) {
    //         if (index / (this.columnCount - 1) == 0) {
    //           return 24 % this.columnCount;
    //         } else {
    //           return parseInt(24 / this.columnCount);
    //         }
    //       } else {
    //         return parseInt(24 / this.columnCount);
    //       }
    //     }
  }
};
</script>
<style scoped>
.col {
  min-height: 200px;
}
.border {
  border: 1px #2d8cf0 solid;
}
</style>

