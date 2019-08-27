# TreeNode
Creates a recursive component that renders an un-ordered list with the nested component inside the `<li>` tag. This component transfers common mouse and keyboard events to internal event/$emit calls.

```
<ul>
  <li>
    <anchor>
    <node-recursive>
  </li>
</ul>
```

## Component Model `TreeNodeVue`
```
// props
readonly cssClassLi: any;
readonly cssClassUl: any;
readonly index: number;
readonly nodeData: TreeNodeDataModel[];
readonly tabindex: number;
// data
hasLocalFocus: boolean;
isLocalExpanded: boolean;
// computed
// methods
anchorBlur: (event: Event, index: number) => void;
anchorClick: (event: MouseEvent, index: number) => void;
anchorFocus: (event: Event, index: number) => void;
anchorKeydown: (event: KeyboardEvent, index: number) => void;
hasChildren: (node: TreeNodeDataModel) => boolean;
nodeBlur: (event: Event, indices: [number], index: number) => void;
nodeCollapse: (event: Event, indices: [number], index: number) => void;
nodeExpand: (event: Event, indices: [number], index: number) => void;
nodeFocus: (event: Event, indices: [number], index: number) => void;
nodeMovedown: (event: Event, indices: [number], index: number) => void;
nodeMoveup: (event: Event, indices: [number], index: number) => void;
nodeSelect: (event: Event, indices: [number], index: number) => void;
```

## Change `anchor` tag
This allows the developer to supply their own anchor-like component instead of the default `TreeNodeAnchor`. This can be done at the parent level of this component. The nested component should expect to receive the following props: `isExpanded`, `node`, `tabindex`.
```
provide() {
    return {
        anchor: CustomComponent
    }
},
```

## Conditional Row css Class
The `cssClassLiCondition` prop allows for conditional rendering based on `node` prop. A use case for this scenario is being able to use a specific css class to be used for certain `<li>` that passes true

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
        <td>index</td>
        <td>number</td>
        <td>0</td>
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
        <td>node-blur</td>
        <td>event: Event, indicies: Array[number], index: number</td>
        <td>Event name when node looses focus</td>
    </tr>
    <tr>
        <td>node-collapse</td>
        <td>event: Event, indicies: Array[number], index: number</td>
        <td>Event name for collapsing node(s)</td>
    </tr>
    <tr>
        <td>node-expand</td>
        <td>event: Event, indicies: Array[number], index: number</td>
        <td>Event name for expanding node(s)</td>
    </tr>
    <tr>
        <td>node-focus</td>
        <td>event: Event, indicies: Array[number], index: number</td>
        <td>Event name for node gaining focus</td>
    </tr>
    <tr>
        <td>node-movedown</td>
        <td>event: Event, indicies: Array[number], index: number</td>
        <td>Event name for moving focus down one node, if last node, do nothing</td>
    </tr>
    <tr>
        <td>node-moveup</td>
        <td>event: Event, indicies: Array[number], index: number</td>
        <td>Event name for moving focus up one node, if first node, do nothing</td>
    </tr>    
    <tr>
        <td>node-select</td>
        <td>event: Event, indicies: Array[number], index: number</td>
        <td>Event name when node has been clicked/selected</td>
    </tr>    
</tbody>
</table>