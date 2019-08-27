<template>
<div>
    <ul>
        <li>
            <aform>
                <form-group id="formgroup1"
                label="Input1"
                label-for="inputtext1"
                description="Some description go here">
                    <form-input id="inputtext1"
                    type="text"
                    v-model="form.input1"
                    ></form-input>
                </form-group>
            </aform>
        </li>
    </ul>
</div>
</template>

<script lang="ts" src="./Form.ts"></script>
