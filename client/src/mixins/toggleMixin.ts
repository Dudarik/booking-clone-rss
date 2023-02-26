export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog(): void {
      this.$emit('update:show', false);
    },
  },
};
