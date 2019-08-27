<template>
<div :id="safeId('_TM_file_outer_')">
    <input 
        type="file"
        :id="this.safeId()"
        ref="input"
        :name="name"
        :class="inputClass"
        :disabled="disabled"
        :required="required"
        :multiple="multiple"
        :aria-required="required ? 'true' : null"
        :aria-describedby="plain ? null : safeId('_TM_file_control_')"
        @change="onFileChange"
    >
   <label v-if="!plain"
    class="m-form-label"
    :id="safeId('_TM_file_control_')"
    >
    {{selectLabel}}
   </label>
</div>
</template>

<script lang="ts" src="./form-file.ts"></script>