<template>
<div>
    <ul>
        <li>
            <abutton>Basic Button</abutton>
        </li>
        <li>
            <abutton tag="a">Anchor Button</abutton>
        </li>
        <li>
            <abutton tag="div">Div Button</abutton>
        </li>
        <li>
            <abutton disabled>Disabled</abutton>
        </li>
        <li>
            <abutton>
                <span class="m-button__icon"><svg class="icon icon-gitter"><use xlink:href="#icon-gitter"></use></svg></span>
                <span class="m-button__text">Icon Left</span>
            </abutton>
        </li>
    </ul>
</div>
</template>

<script lang="ts" src="./Button.ts"></script>