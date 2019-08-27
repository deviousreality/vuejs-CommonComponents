<template>
  <div>
    <form-file v-model="file" id="file1" name="file1" placeholder="Choose a file..."></form-file>
    <form-file
      v-model="fileMultiple"
      id="file2"
      name="file2"
      placeholder="Choose a file..."
      multiple
    ></form-file>

    <form-file v-model="filePlain" id="file3" name="file3" placeholder="Choose a file..." plain></form-file>
  </div>
</template>

<script lang="ts" src="./Form-File.ts"></script>