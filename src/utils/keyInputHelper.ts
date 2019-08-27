export function keyCodeToKey(event: KeyboardEvent) {
    if (event.keyCode !== undefined || event.keyCode !== null) {
        switch (event.keyCode) {
            case 9:
                return `Tab`;
            case 13:
                return `Enter`;
            case 27:
                return `Escape`;
            case 32:
                return ` `;
            case 33:
                return `PageUp`;
            case 34:
                return `PageDown`;
            case 35:
                return `End`;
            case 36:
                return `Home`;
            case 37:
                return `ArrowLeft`;
            case 38:
                return `ArrowUp`;
            case 39:
                return `ArrowRight`;
            case 40:
                return `ArrowDown`;
            default:
                return event.key;
        }
    } else {
        return event.key;
    }
}