<template>
<div>
  <ul>
    <li>
      <form-input name="texttid" placeholder="This is a text" id="input1" type="text"
    v-model="input1" ></form-input>
    </li>
    <li>Readonly
      <form-input name="textreadonly" placeholder="This is a text" type="text"
    v-model="input1" readonly></form-input>
    </li>
    <li>Disabled
      <form-input name="textdisabled" placeholder="This is a text" type="text"
    v-model="input1" disabled></form-input>
    </li>
    <li>
      <form-input name="textrequired" placeholder="This is a text" type="text" 
        v-model="inputBlank" :state="input1State"></form-input>
    </li>
  </ul>
</div>
</template>

<script lang="ts" src="./Form-Input.ts"></script>