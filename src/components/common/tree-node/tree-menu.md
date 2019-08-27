# TreeMenu

The `TreeMenu` component handles actions emitted from the `TreeNode` component. This is where 

## Component Model `TreeMenu`
```
// props
readonly cssClassLi: string;
readonly cssClassUl: string;
readonly id: string;
readonly nodeData: TreeNodeDataModel[];
// data
children: TreeNodeDataModel[];
//methods
fetchData: () => void;
keydown: (event: Event) => void;
navigate: (event: Event, { target, title, url }) => void;
nodeCollapse: (event: Event, indices: [number]) => void;
nodeExpand: (event: Event, indices: [number]) => void;
nodeFocus: (event: Event, indices: [number]) => void;
nodeMovedown: (event: Event, indices: [number]) => void;
nodeMoveup: (event: Event, indices: [number]) => void;
nodeSelect: (event: Event, indices: [number]) => void;
```

## Conditional Row css Class
The `cssClassLiCondition` prop is a pass-through prop that is assigned to the `TreeNode` component. The `TreeNode` component will render a css class tag conditionally based on the current `node` data.

# Component Reference
## Properties
<table>
<thead>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Default Value</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>cssClassLi</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>cssClassUl</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>id</td>
        <td>string</td>
        <td></td>
    </tr>
    <tr>
        <td>nodeData</td>
        <td>Array</td>
        <td></td>
    </tr>
</tbody>
</table>

## Events
<table>
<thead>
    <tr>
        <th>Event</th>
        <th>Arguments</th>
        <th>Description</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td colspan="3">Currently this component does not emit any events</td>        
    </tr>  
</tbody>
</table>