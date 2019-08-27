<template>
<div>
    <ul>
        <li>
            <table-data :items="test"></table-data>
        </li>
        <li>
            <table-data :items="items" :fields="fields"></table-data>
        </li>
        <li>
            PrimaryKey
            <table-data :items="test" :id="tablePrimaryKey" :primaryKey="tablePrimaryId"></table-data>
        </li>
    </ul>
</div>
</template>

<script lang="ts" src="./Table.ts"></script>