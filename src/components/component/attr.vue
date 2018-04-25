<script>
export default {
  props: {
    type: String,
    selected: Object
  },
  render(h) {
      console.log(1111);
    return h(this.selected.type.toLowerCase() + "-attr", {
      props: {
        selected: this.selected
      }
    });
  }
};
</script>
