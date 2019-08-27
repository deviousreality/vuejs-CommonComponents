<template>
  <div>
    <ul>
      <li>
        <form-radio-group
          id="radios1"
          v-model="radioGroupSelected"
          :options="radioGroupOptions"
          name="radioOptions"
        ></form-radio-group>
      </li>
      <li>
        <form-radio-group id="radios2" v-model="radioGroupSelected" name="radioSubComponent">
          <form-radio value="first">Toggle this custom radio</form-radio>
          <form-radio value="second">Or toggle this other custom radio</form-radio>
          <form-radio value="third" disabled>This one is Disabled</form-radio>
          <form-radio :value="{fourth: 4}">This is the 4th radio</form-radio>
        </form-radio-group>
      </li>
      <li>
        Selected:
        <strong>{{ radioGroupSelected }}</strong>
      </li>
      <li>
        Empty Group
        <form-radio-group :ariaInvalid="ariaInvalid" :checked="testChecked1"></form-radio-group>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./Form-Radio.ts"></script>