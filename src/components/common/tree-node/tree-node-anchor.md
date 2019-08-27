# TreeNode Anchor

Default anchor used by the `<tree-node>` component and extends the `<anchor>` component. The TreeNode Anchor component reflects changed delivered via the `node` prop. 
This component includes HTML to reflect Expanded/Collapsed state as well as proper `tabindex` value making it ideal for tree-like structures.

## Component Model `TreeNodeAnchorVue`
```
readonly isExpanded: boolean;
readonly node: TreeNodeDataModel;
readonly tabindex: number;
// data
// computed
ariaControls: string | null;
ariaExpanded: string | null;
ariaPopup: string | null;
hasChildren: boolean;
// methods
handleClick: (event: Event) => void;
//handleFocus: (event: Event) => void;
handleKey: (event: Event) => void;
```

# Component Refernce
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
        <td>isExpanded</td>
        <td>Boolean</td>
        <td>false</td>
    </tr>
    <tr>
        <td>node</td>
        <td>object</td>
        <td></td>
    </tr>
    <tr>
        <td>tabindex</td>
        <td>number</td>
        <td>-1</td>
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
        <td>blur</td>
        <td>event - Native blur event (before any formatting)</td>
        <td>Emitted after the anchor receives focus</td>
    </tr>
    <tr>
        <td>click</td>
        <td>event - Native click event</td>
        <td>Emits `click` with current `node` data from props</td>
    </tr>
    <tr>
        <td>focus</td>
        <td>event - Native focus event (before any formatting)</td>
        <td>Emitted after the anchor looses focus</td>
    </tr>
    <tr>
        <td>keydown</td>
        <td>event - Native keydown event</td>
        <td>Emits `keydown`</td>
    </tr>
</tbody>
</table>