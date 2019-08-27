/** Form State Control 
 *
 * Returned class is either 'is-valid' or 'is-invalid' based on the 'state' prop
 * state can be one of five values:
 *  - true or 'valid' for is-valid
 *  - false or 'invalid' for is-invalid
 *  - null (or empty string) for no contextual state
 */

import Vue from 'vue';

export interface FormStateMixin extends Vue {
    state: boolean | string;
    computedState: () => boolean | null;
    stateClass: () => string | null;
}

export default {
    props: {
        state: {
            // true/'valid', false/'invalid', '', null
            // The order must be String first, then Boolean!
            type: [String, Boolean],
            default: null
        }
    },
    computed: {
        computedState(this: FormStateMixin): boolean | null {
            const state = this.state;
            if (state === '') {
                return null;
            } else if (state === true || state === 'valid') {
                return true;
            } else if(state === false || state === 'invalid') {
                return false;
            } else {
                return null;
            }
        },
        stateClass(): string | null {
            const state = this.computedState;
            if (state === true) {
                return 'is-valid';
            } else if (state === false) {
                return 'is-invalid';
            }
            return null;
        }
    },
}