import Table from  "../components/common/table/table.vue";

export default {
    components: {
        tableData: Table
    },
    data() {
        return {
            test: [{ a: 1, b: 2 }, { a: 3, b: 4 }],
            fields: [
                {
                    key: 'ID',
                    label: 'Unit ID'
                },
                {
                    key: 'Title',
                    label: 'Book Title'
                },
                {
                    key: 'Description',
                    label: 'Summary of Info'
                },
                {
                    key: 'IsVisible',
                    label: 'Visibility'
                }
            ],
            items: [  
                {  
                    "ID":"1",
                    "Title":"Sample template",
                    "Description":"Description field here",
                    "IsVisible":"0"
                },
                {
                    "ID":"2",
                    "Title":"Existing template",
                    "Description":"Description field here",
                    "IsVisible":"0"
                },
                {
                    "ID":"3",
                    "Title":"Starwars Ipsum",
                    "Description":"A New Hope",
                    "IsVisible":"0"
                }
            ],
            tablePrimaryKey: 'foo',
            tablePrimaryId: 'a'

        };
    }
}
