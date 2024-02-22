export default function are_equal(a: any, b: any): boolean {
    // Check if both arguments are of the same type
    if (typeof a !== typeof b) {
        return false;
    }

    // If both arguments are arrays, compare each element recursively
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (!are_equal(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }

    // If both arguments are objects, compare each key recursively
    if (typeof a === 'object' && typeof b === 'object') {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) {
            return false;
        }
        for (const key of keysA) {
            if (!are_equal(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }

    // For other types (primitives and classes), perform simple equality check
    return a === b;
}