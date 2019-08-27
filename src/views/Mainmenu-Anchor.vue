<template>
    <anchor 
    :id="node.id"
    :rel="node.url"
    :tabindex="tabIndex"
    :to="node.url"
    role="menuitem"
    @click="handleClick"
    @keydown="handleKey"
    @focus="handleFocus"
    @blur="handleFocus"
    >
    {{ node.title }}    
    </anchor>
</template>

<script lang="ts" src="./Mainmenu-Anchor.ts"></script>