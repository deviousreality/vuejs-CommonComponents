<template>
  <div>
    <h2>Checkbox</h2>
    <ul>
      <li>
        <form-checkbox
          name="checkboxDefault"
          id="checkboxDefault"
          v-model="checkboxDefault"
          value="true"
          :required="true"
        >Label Default</form-checkbox>
        Status: {{checkboxDefault}}
      </li>
      <li>
        <form-checkbox
          name="checkboxDefaultValues"
          id="checkboxDefaultValues"
          v-model="checkboxDefaultValues"
          value="yes"
          unchecked-value="no"
        >Label DefaultValues</form-checkbox>
        Status: {{checkboxDefaultValues}}
      </li>
      <li>
        <form-checkbox value="bar" unchecked-value="foo">Default Null</form-checkbox>
      </li>
    </ul>

    <h2>Multiple Choice Checkboxes</h2>
    <ul>
      <li>
        <form-checkbox-group
          id="checkboxGroup1"
          name="checkboxGroup1"
          v-model="checkboxGroupSelected"
          :options="checkboxGroupOptions"
        ></form-checkbox-group>
      </li>
      <li>
        <form-checkbox-group
          id="checkboxGroup2"
          name="checkboxGroup2"
          v-model="checkboxGroupSelected"
        >
          <form-checkbox value="orange">Orange</form-checkbox>
          <form-checkbox value="apple">Apple</form-checkbox>
          <form-checkbox value="pineapple">Pineapple</form-checkbox>
          <form-checkbox value="grape">Grape</form-checkbox>
        </form-checkbox-group>
      </li>
      <li>
        Selected:
        <strong>{{ checkboxGroupSelected }}</strong>
      </li>
    </ul>
    <ul>
      <li>
        Empty Group
        <form-checkbox-group :options="testOptions1" :checked="testChecked1" :state="testState1"></form-checkbox-group>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./Form-Checkbox.ts"></script>