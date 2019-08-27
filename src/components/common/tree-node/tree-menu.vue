<template>
  <tree-node
    :cssClassLi="cssClassLi"
    :cssClassLiCondition="cssClassLiCondition"
    :cssClassUl="cssClassUl"
    :id="id"
    :nodeData="nodeData"
    @keydown="keydown"
    @node-blur="nodeBlur"
    @node-collapse="nodeCollapse"
    @node-focus="nodeFocus"
    @node-expand="nodeExpand"
    @node-movedown="nodeMovedown"
    @node-moveup="nodeMoveup"
    @node-select="nodeSelect"
    ref="treenode"
  />
</template>

<script lang="ts" src="./tree-menu.ts"></script>