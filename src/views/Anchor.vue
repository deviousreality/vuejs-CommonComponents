<template>
<div>
  <ul>
    <li>
      <alink ref="plain" href="#foo">Plain link</alink>
    </li>
    <li>
      <alink ref="target" href="#foo" target="_blank">Target _blank</alink>
    </li>
    <li>
      <alink ref="plain" to="bar">Router Link</alink>
    </li>
    <li>
      <alink ref="disabled" href="#foo" disabled="">Disabled Link</alink>
    </li>
    <li>
      <alink @click="handleClick">Click Handler</alink>
    </li>
  </ul>
  <h2>Links with Content inside</h2>
  <ul>
    <li>
      <alink ref="plain" href="#foo">Plain Link <span class="m-link__text">
            david.bowie@ziggystardust.com
        </span></alink></li>
  </ul>
</div>
</template>

<script lang="ts" src="./Anchor.ts"></script>
