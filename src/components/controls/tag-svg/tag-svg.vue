<template>
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        :class="computeClass"
        focusable="false" 
        pointer-events="none"
        >
        <use 
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            v-bind:xlink:href="'#'+name" 
        />
    </svg>
</template>

<script lang="ts" src="./tag-svg.ts"></script>