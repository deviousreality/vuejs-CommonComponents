/*
 * SSR Safe Client Side ID attribute generation
 *
 */
import Vue from 'vue';

export interface IdMixin extends Vue {
  id: string | null;
  safeId: any;
  localId_: string;
}

export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      localId_: null
    }
  },
  computed: {
    safeId(this: IdMixin) {
      // Computed property that returns a dynamic function for creating the ID.
      // Reacts to changes in both .id and .localId_ And regens a new function
      const id = this.id || this.localId_

      // We return a function that accepts an optional suffix string
      // So this computed prop looks and works like a method!!!
      // But benefits from Vue's Computed prop caching
      const fn = (suffix: string) => {
        if (!id) {
          return null
        }
        suffix = String(suffix || '').replace(/\s+/g, '_')
        return suffix ? id + '_' + suffix : id
      }
      return fn
    }
  },
  mounted(this: IdMixin) {
    // mounted only occurs client side
    this.$nextTick(() => {
      // Update dom with auto ID after dom loaded to prevent
      // SSR hydration errors.
      this.localId_ = `__TMID__${Math.random().toString()}`
    })
  }
}