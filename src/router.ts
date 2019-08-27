import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/anchor',
    name: 'anchor',
    component: () => import('./views/Anchor.vue'),
  },
  {
    path: '/button',
    name: 'button',
    component: () => import('./views/Button.vue'),
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('./views/Form.vue'),
  },
  {
    path: '/form-input',
    name: 'form-input',
    component: () => import('./views/Form-Input.vue'),
  },
  {
    path: '/form-checkbox',
    name: 'form-checkbox',
    component: () => import('./views/Form-Checkbox.vue'),
  },
  {
    path: '/form-date',
    name: 'form-date',
    component: () => import('./views/Form-Date.vue'),
  },
  {
    path: '/form-file',
    name: 'form-file',
    component: () => import('./views/Form-File.vue'),
  },
  {
    path: '/form-radio',
    name: 'form-radio',
    component: () => import('./views/Form-Radio.vue'),
  },
  {
    path: '/form-textarea',
    name: 'form-textarea',
    component: () => import('./views/Form-Textarea.vue'),
  },
  {
    path: '/form-select',
    name: 'form-select',
    component: () => import('./views/Form-Select.vue'),
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('./views/Table.vue'),
  },
  {
    path: '/tree-node',
    name: 'tree-node',
    component: () => import('./views/Tree-Node.vue'),
  },

  ]
});