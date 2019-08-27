/**
 * StyleObject examples:
 *   1. CSS class name string array only
 *      [ 'class1', 'class2', 'class3' ]
 *   2. CSS class names flagged on or off
 *      { 'class1': ~boolean value here~, 'class2': ~boolean value here~ }
 *   3. CSS class name string array mixed with flagged class names
 *      [ 'class1', { 'class2': ~boolean value here~ }, 'class3' ]
 *   4. Inline style object
 *      { 'display': this.canShow ? 'block' : 'none', 'width': `${this.width}px` }
 */

type StyleObject = { [name: string]: boolean | string } | (string | { [name: string]: boolean | string })[];
