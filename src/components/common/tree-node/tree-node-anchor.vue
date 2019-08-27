<template>
  <anchor
    :id="node.id"
    :rel="node.url"
    :tabindex="tabindex"
    v-bind:aria-controls="ariaControls"
    :aria-expanded="ariaExpanded"
    :aria-popup="ariaPopup"
    href="javascript:;"
    role="menuitem"
    @blur="handleFocus"
    @click.prevent="handleClick"
    @focus="handleFocus"
    @keydown="handleKey"
    ref="anchor"
  >
    {{ node.title }}
    <span v-if="hasChildren" v-text="isExpanded"></span>
  </anchor>
</template>

<script lang="ts" src="./tree-node-anchor.ts"></script>