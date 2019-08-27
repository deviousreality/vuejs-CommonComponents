<template>
  <div>
    <ul>
      <li>
        <tree-node-anchor :node="treeNodeData[0]" />
      </li>
      <li>
        <tree-node-anchor :node="treeNodeData[1]" />
      </li>
    </ul>
    <tree-node
      :nodeData="treeNodeData"
      :cssClassLi="liClass"
      :cssClassLiCondition="liClassConditional"
    ></tree-node>
    <tree-menu :nodeData="treeNodeData" :cssClassLi="liClass"></tree-menu>
    <globalmenu
      :cssClassLiCondition="cssClassLiCondition(...arguments)"
      :nodeData="nodeData"
      ref="treemenu"
    />
  </div>
</template>

<script lang="ts" src="./Tree-Node.ts"></script>