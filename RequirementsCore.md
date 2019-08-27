#Requirements Core
The goal of this document is to create a set of core components to become the foundation of our TM+ Vue application. Each component will need to support current style guide UI patterns and eventually support for our current application features. This will begin the initial step of the process.

To help speed this process up, I recommend we replicate _some_ of the functionality found within [Bootstrap Vue](https://bootstrap-vue.js.org). The source files can be found at [Github](https://github.com/bootstrap-vue/bootstrap-vue).

To accomplish this, we will split the work into phases
- Phase 1 - Create base components
- Phase 2 - Create label grouping components, i.e. Detail Box fields, inline treegrid, filter panel
- Phase 3 - Dirty Tracking and state management
- Phase 4 - Create Advanced Control Types and special cases

##Base Component List

- Links
- Buttons* 
- Input
- Datepicker
- File Browse
- Checkbox
- Radio
- Select
- Multi-select
- Textarea
- SVG
- Table

##Special Components

- DateBox
- Getter Dropdown (see inline getter and filter-panel)
- Search Box

###Buttons

_Requirements_

- Base Styles defined in styleguide
- Events: Click

###Links
_Requirements_

- Link component will need to support icon within text, i.e. [icon]SkypeLink
- router-link capable
- Events: Click

###File Browser
_Requirements_

- No style is currently defined






