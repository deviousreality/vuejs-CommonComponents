import { isArray } from "@/utils/array";
import { keys, assign, isObject } from "@/utils/object";

// Private function to massage field entry into common object format
const processField = (key: string | number | symbol, value: boolean) => {
    let field: any = null
    if (typeof value === "string") {
        // Label shortcut
        field = { key: key, label: value };
    } else if (typeof value === "function") {
        // Formatter shortcut
        field = { key: key, formatter: value };
    } else if (typeof value === "object") {
        field = assign({}, value) as any;
        field.key = field.key || key;
    } else if (value !== false) {
        // Fallback to just key
        field = { key: key };
    }
    return field;
};

// We normalize fields into an array of objects
// [ { key:..., label:..., ...}, {...}, ..., {..}]
const normalizeFields = (origFields: any, items: any) => {
    // We normalize fields into an array of objects
    // [ { key:..., label:..., ...}, {...}, ..., {..}]
    let fields: any[] = [];
    if(isArray(origFields)) {
        // Normalize array Form
        origFields
        .filter((f) => f)
        .forEach((f) => {
            if (typeof f === "string") {
                fields.push({ key: f, label: f });
            } else if (typeof f === "object" && f.key && typeof f.key === "string") {
                // Full object definition. We use assign so that we don't mutate the original
                fields.push(assign({}, f));
            } else if (typeof f === "object" && keys(f).length === 1) {
                // Shortcut object (i.e. { 'foo_bar': 'This is Foo Bar' }
                const key = keys(f)[0];
                const field = processField(key, f[key]);
                if (field) {
                    fields.push(field);
                }
            }
        });
    } else if (origFields && typeof origFields === "object" && keys(origFields).length > 0) {
        // Normalize object Form
        keys(origFields).forEach(key => {
            let field = processField(key, origFields[key]);
            if (field) {
                fields.push(field);
            }
        });
    }
    // If no field provided, take a sample from first record (if exits)
    if (fields.length === 0 && items.length > 0) {
        const sample = items[0];
        keys(sample).forEach((k) => {
            fields.push({ key: k, label: k });
        });
    }
    // Ensure we have a unique array of fields and that they have String labels
    const memo = {} as any;
    return fields.filter((f) => {
        if (!memo[f.key]) {
        memo[f.key] = true;
        f.label = typeof f.label === 'string' ? f.label : f.key;
        return true;
        }
        return false;
    });
};
  
export default normalizeFields
