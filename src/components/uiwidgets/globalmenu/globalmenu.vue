<template>
  <nav :class="navClass">
    <header class="m-menu__header">
      <button
        class="m-menu-link m-menu-link--menu"
        id="menuheader-menu"
        aria-haspopup="true"
        ref="menuButton"
        role="menuitem"
        tabindex="0"
        v-bind:aria-expanded="isMenuOpen"
        v-bind:aria-controls="id"
        @click.prevent="openMenuFocusFirstMenuNode"
        @keydown.down.prevent="openMenuFocusFirstMenuNode"
        @keydown.enter.prevent="openMenuFocusFirstMenuNode"
        @keydown.space.prevent="openMenuFocusFirstMenuNode"
        @keydown.tab="tabOutToDocument"
      >
        <span class="m-menu-link__icon"></span>
        <span class="sr-only">Menu</span>
      </button>
      <anchor
        :href="homeIndexUrl"
        class="m-menu-link m-menu-link--home"
        id="menuheader-home"
        role="button"
        tabindex="-1"
      >
        <span class="m-menu-link__home"></span>
        <span class="sr-only">Home</span>
      </anchor>
    </header>
    <tree-menu
      :nodeData="nodeData"
      :cssClassLi="liClass"
      :cssClassUl="ulClass"
      :id="id"
      v-bind:aria-labelledby="id"
      @mouseover.native="handleUlMouseenter"
      @mouseleave.native="handleUlMouseleave"
      @keydown.tab.prevent="handleNodeKeyTab"
      @keydown.esc.prevent="handleNodeKeyTab"
      @navigate="navigateLink"
      ref="treemenu"
    />
  </nav>
</template>
<script lang="ts" src="./globalmenu.ts"></script>