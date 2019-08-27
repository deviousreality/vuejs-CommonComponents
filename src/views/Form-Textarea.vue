<template>
<div>
    <ul>
        <li>
            <form-textarea 
                name="textarea1"
                v-model="input1"
                placeHolder="This is a text area"
            >                
            </form-textarea>
        </li>
        <li>Readonly
            <form-textarea 
                name="textarea1"
                v-model="input1"
                placeHolder="This is a text area"
                readonly
            >                
            </form-textarea>
        </li>
        <li>Disabled
            <form-textarea 
                name="textarea1"
                v-model="input1"
                placeHolder="This is a text area"
                disabled
            >                
            </form-textarea>

        </li>
        <li>PlainText: 
            <form-textarea 
                name="textarea1"
                v-model="input1"
                placeHolder="This is a text area"
                plaintext
            >                
            </form-textarea>
        </li>
    </ul>
    
</div>
</template>

<script lang="ts" src="./Form-Textarea.ts"></script>