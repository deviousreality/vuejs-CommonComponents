import Mainmenu from '@/views/Mainmenu.vue';

const menu = [
    {
        icon: 'icon-default',
        id: 'common',
        title: 'Common',
        url: '',
        children: [
            {
                icon: 'icon-default',
                id: 'common-anchor',
                title: 'Anchor',
                url: '/anchor',
                children: []
            },
            {
                icon: 'icon-default',
                id: 'common-form',
                title: 'Form',
                url: '/form',
                children: []
            },
            {
                icon: 'icon-default',
                id: 'common-form-checkbox',
                title: 'Form Checkbox',
                url: '/form-checkbox',
                children: []
            },
            {
                icon: 'icon-default',
                id: 'common-form-date',
                title: 'Form Date',
                url: '/form-date',
                children: []
            }, 
            {
                icon: 'icon-default',
                id: 'common-form-file',
                title: 'Form File',
                url: '/form-file',
                children: []
            }, 
            {
                icon: 'icon-default',
                id: 'common-form-input',
                title: 'Form Input',
                url: '/form-input',
                children: []
            }, 
            {
                icon: 'icon-default',
                id: 'common-form-radio',
                title: 'Form Radio',
                url: '/form-radio',
                children: []
            }, 
            {
                icon: 'icon-default',
                id: 'common-form-select',
                title: 'Form Select',
                url: '/form-select',
                children: []
            }, 
            {
                icon: 'icon-default',
                id: 'common-form-textarea',
                title: 'Form Textarea',
                url: '/form-textarea',
                children: []
            }, 
            {
                icon: 'icon-default',
                id: 'common-table',
                title: 'Table',
                url: '/table',
                children: []
            },
            {
                icon: 'icon-default',
                id: 'common-tree-node',
                title: 'Tree Node',
                url: '/tree-node',
                children: []
            },
            
        ]
    },

];


export default {
    components: {
        mainMenu: Mainmenu,
    },
    data() {
        return {
            nodeData: menu,
        }
    },
}