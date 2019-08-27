import Vue from 'vue';
import Anchor from '@/components/common/anchor/anchor.vue';
import GlobalmenuAnchor from './globalmenu-anchor.vue';
import TreeMenu from '@/components/common/tree-node/tree-menu.vue';
//import clickOutside from 'directives/click-outside';

import { GlobalmenuAnchorVue } from './globalmenu-anchor';
import { TreeMenuVue } from '@/components/common/tree-node/tree-menu';
import { TreeNodeDataModel } from '../../common/tree-node/tree-node';

let hoverIntentTimeout = 0;

export interface GlobalMenuDataModel extends TreeNodeDataModel {
    children: GlobalMenuDataModel[];
    isHiddenOnMobile: boolean;
}

export interface GlobalMenuVue extends Vue {
    $http: any;
    // props
    readonly homeIndexUrl: string;
    readonly id: string
    readonly isHiddenViewport: boolean;
    readonly isHomePage: boolean;
    readonly url: string;
    // data
    headerIcon: string;
    isMenuOpen: boolean;
    isMenuOpenDisabled: boolean;
    liClass: string;
    noCollapse: boolean;
    nodeData: TreeNodeDataModel[];
    ulClass: string;
    // computed
    hasNodeData: boolean;
    navClass: any;
    // methods
    clickOutsite: () => void;
    actionDisabled: (isDisabled: boolean) => void;
    fetchData: () => Promise<void>;
    openMenuFocusFirstMenuNode: (event: Event) => void;
    navigate: (event: Event, { target, title, url }) => void;
    tabOutToDocument: (event: KeyboardEvent) => void;
    handleNodeKeyTab: (event: KeyboardEvent) => void;
    handleUlMouseenter: (event: MouseEvent) => void;
    handleUlMouseleave: (event: MouseEvent) => void;
    isMobileList: () => boolean;
    liNodeClass: (node: TreeNodeDataModel) => string
    toggleMenu: (component: Vue) => void;
    toggleNoCollapse: (state: boolean) => void;
}

export default {
    components: {
        treeMenu: TreeMenu,
    },
    directives: {
        //clickOutside
    },
    provide() {
        // return {
        //     anchor: GlobalmenuAnchor
        // }
    },
    props: {
        homeIndexUrl: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default: 'menu-parent'
        },
        isHiddenViewport: {
            type: Boolean,
            default: false
        },
        isHomePage: {
            type: Boolean,
            default: false
        },
        url: {
            type: String
        }
    },
    data() {
        return {
            headerIcon: 'icon-header-logo',
            isMenuOpen: false,
            isMenuOpenDisabled: false,
            liClass: 'm-menu__item',
            menuIcon: 'icon-menu',
            noCollapse: false,
            nodeData: [] as TreeNodeDataModel[],
            ulClass: 'm-menuitems',
        }
    },
    computed: {
        hasNodeData(this: GlobalMenuVue): boolean {
            return (this.nodeData as GlobalMenuDataModel[]).length > 0 ? true : false;
        },
        navClass(this: GlobalMenuVue): StyleObject {
            return {
                'l-menu': true,
                'm-menu': true,
                'm-menu--collapsed': this.isHomePage && !this.noCollapse && !this.isHiddenViewport, //TODO
                'm-menu--is-open': this.isMenuOpen,
            };
        },
    },
    beforeDestroy() {
        // TM.PubSub.unsubscribe('globalmenu@action-disable');
        // TM.PubSub.unsubscribe('globalmenu@no-collapse');
        // TM.PubSub.unsubscribe('globalmenu@collapse');

    },
    created() {
        // TM.PubSub.subscribe('globalmenu@action-disable', this.actionDisable);
        // TM.PubSub.subscribe('globalmenu@no-collapse', this.toggleNoCollapse);
        // TM.PubSub.subscribe('globalmenu@collapse', this.clickOutside);
        this.fetchData();
    },
    methods: {
        actionDisable(this: GlobalMenuVue, state: boolean): void {
            this.isMenuOpen = false;
            this.isMenuOpenDisabled = state;
            if (state) {
                this.noCollapse = true;
            }
        },
        clickOutside(this: GlobalMenuVue): void {
            if (this.isMenuOpen) {
                this.isMenuOpen = false;
            }
        },
        // cssClassLiCondition(node: GlobalMenuDataModel): any {
        //     return node.isHiddenOnMobile ? 'm-menu__item--is-mobilehidden' : null;
        // },
        async fetchData(this: GlobalMenuVue): Promise<void> {
            if (this.url !== undefined) {
                const response = await this.$http.get(this.url);
                if (response) {
                    const data = response.data.slice();
                    addProperty.call(this, data, 'isExpanded', false);
                    addProperty.call(this, data, 'tabindex', -1);
                    this.nodeData = data;
                }
            }
        },
        openMenuFocusFirstMenuNode(this: GlobalMenuVue, event: KeyboardEvent): void {
            if (!this.isMenuOpenDisabled) {
                this.isMenuOpen = !this.isMenuOpen;
                if (this.isMenuOpen && this.hasNodeData) {
                    (<TreeMenuVue>this.$refs.treemenu).nodeFocus(event, [0]);
                }
            }
        },
        navigateLink(this: GlobalMenuVue, event: Event, { target, title, url }): void {
            if (target) {
                window.open(url, target);
            } else {
                window.location.href = url;
            }
        },
        tabOutToDocument(this: GlobalMenuVue, event: KeyboardEvent) {
            if (!this.isMenuOpenDisabled && this.isMenuOpen) {
                this.isMenuOpen = false;
            }
        },
        handleNodeKeyTab(this: GlobalmenuAnchorVue, event: KeyboardEvent): void {
            const menubutton = this.$refs.menuButton as HTMLElement;
            menubutton.focus();
        },
        handleUlMouseenter(this: GlobalMenuVue, event: MouseEvent): void {
            window.clearTimeout(hoverIntentTimeout);
            event.preventDefault();
            hoverIntentTimeout = window.setTimeout(function () {
                if (!this.isMenuOpenDisabled) {
                    this.isMenuOpen = true;
                }
            }.bind(this), 200);

        },
        handleUlMouseleave(this: GlobalMenuVue, event: MouseEvent): boolean {
            window.clearTimeout(hoverIntentTimeout);
            event.preventDefault();
            return false;
        },
        isMobileList(this: GlobalMenuVue): boolean {
            return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
        },
        // liNodeClass(this: GlobalMenuVue, node: GlobalMenuDataModel): string {
        //     const mobileClass = node.isHiddenOnMobile ? ' m-menu__item--is-mobilehidden' : '';
        //     return `${this.liClass}${mobileClass}`;
        // },
        toggleNoCollapse(value: boolean): void {
            this.noCollapse = value || false;
        },
    }

}

function addProperty(this: GlobalMenuVue, children: TreeNodeDataModel[], name: string, value: any): void {
    children.forEach((child) => {
        if (!child.hasOwnProperty(name)) {
            this.$set(child, name, value);
            if (child.children) {
                addProperty.call(this, child.children, name, value);
            }
        }
    });

}

