<script>
export default {
  props: {
    type: String,
    selected: Object
  },
  render(h) {
    return h(this.selected.type.toLowerCase() + "-attr", {
      props: {
        selected: this.selected
      }
    });
  }
};
</script>
