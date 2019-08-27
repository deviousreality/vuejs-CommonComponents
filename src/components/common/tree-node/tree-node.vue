<template>
  <ul role="menu" :class="cssClassUl" tabindex="-1">
    <li
      role="none"
      v-bind:class="nodeLiClass(node)"
      v-for="(node, index) in nodeData"
      :key="node.id"
    >
      <component
        :is="currentAnchor"
        :isExpanded="node.isExpanded"
        :node="node"
        :tabindex="node.tabindex"
        @blur="anchorBlur($event, index)"
        @click="anchorClick($event, index)"
        @focus="anchorFocus($event, index)"
        @keydown="anchorKeydown($event, index)"
        ref="a"
      />
      <node
        v-if="hasChildren(node)"
        :cssClassLi="cssClassLi"
        v-bind:cssClassLiCondition="cssClassLiCondition"
        :cssClassUl="cssClassUl"
        :id="ulIdAttr(node)"
        :nodeData="node.children"
        v-bind:aria-labeledby="ulAriaLabeledby(node)"
        v-show="node.isExpanded"
        @node-blur="nodeBlur(...arguments, index)"
        @node-collapse="nodeCollapse(...arguments, index)"
        @node-expand="nodeExpand(...arguments, index)"
        @node-focus="nodeFocus(...arguments, index)"
        @node-movedown="nodeMovedown(...arguments, index)"
        @node-moveup="nodeMoveup(...arguments, index)"
        @node-select="nodeSelect(...arguments, index)"
      />
    </li>
  </ul>
</template>

<script lang="ts" src="./tree-node.ts"></script>