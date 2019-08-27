<template>
<ul class="m-nav m-styleguide-nav m-styleguide-nav--isactive"
    role="menu"
    tabindex="-1"
    ref="parentnode">
    <tree-node v-for="child in nodeData"
        :node="child"
        :key="child.id"
        :anchor="anchor"
        name="tree-node"
        @click.prevent="handleNodeClick"
    >
    </tree-node>

</ul>
</template>

<script lang="ts" src="./Mainmenu.ts"></script>