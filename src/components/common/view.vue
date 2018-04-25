<script>
export default {
  props: {
    params: Object,
    selected: Boolean
  },
  data() {
    return {};
  },
  render(h) {
    return this.render(h, { ...this.params });
  },
  methods: {
    render(h, params) {
      let children = [];

      if (params.text) {
        children.push(params.text);
      }

      if (params.children && params.children.length) {
        params.children.map(o => {
          let node = this.render(h, o);
          children.push(node);
        });
      }

      return h(
        "div",
        {
          on: {
            click: (e) => {       
              e.stopPropagation();    
              this.$emit("click", params);
            }
          }
        },
        [
          h(
            params.type,
            {
              props: params.props,
              class: params.className,
              style: params.style,
              attrs: params.attrs,
              directives: params.directives,
              on: params.event
            },
            children
          )
        ]
      );
    }
  }
};
</script>
<style scoped>
.view-box .selected {
  border: 4px rgb(64, 158, 255) dashed;
}
</style>

