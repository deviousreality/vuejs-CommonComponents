import Link from "@/components/common/anchor/anchor.vue";

export default {
  components: {
    alink: Link
  },
  methods: {
    handleClick(event: Event) {
      window.console.log(event);
    }
  }
}
