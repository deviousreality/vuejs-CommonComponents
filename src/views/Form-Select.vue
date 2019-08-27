<template>
<div>
    <ul>
        <li>Empty
            <form-select></form-select>
        </li>
        <li>Basic usage
            <form-select name="select1"
                v-model="inputNull">
                <option :value="input1Option">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </form-select>
        </li>
        <li>Options from array
            <form-select name="select2"
            v-model="input1Option"
            :options="options"></form-select>
        </li>
        <li>Multiple: {{ inputMultiple }}
            <form-select name="select3"
                v-model="inputMultiple"
                :options="options"
                multiple></form-select>
        </li>
        <li>Icons: {{ input1Option }}
            <form-select name="select3"
                v-model="input1Option"
                :options="options"
                icons></form-select>
        </li>
        <li>Disabled
            <form-select name="select4"
                v-model="inputNull"
                :options="options"
                disabled></form-select>
        </li>
        <li>Insert Initial Default Option
            <form-select name="select4"
                v-model="inputNull"
                :options="options"
                >
                <template slot="first">
                    <option :value="null" disabled>Select a real option</option>
                </template>
                </form-select>
        </li>

    </ul>
</div>
</template>

<script lang="ts" src="./Form-Select.ts"></script>