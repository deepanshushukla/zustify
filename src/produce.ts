type DraftsMap = Map<string, { draft: any, parent: any }>;

export function produce<T>(baseState: T, producer: (draft: T) => void): T {
    const drafts: DraftsMap = new Map();
    const visited: Set<any> = new Set();

    function createDraft(base: any, parent: any): any {
        if (base && typeof base === 'object' && !visited.has(base)) {
            const draft: any = Array.isArray(base) ? [] : {};
            drafts.set(base, { draft, parent });
            visited.add(base);
            Object.keys(base).forEach(key => {
                draft[key] = createDraft(base[key], draft);
            });
            return draft;
        }
        // Wrap primitive values in an object container
        return base;
    }

    function finalize(draft: any): any {
        if (drafts.has(draft)) {
            const { parent } = drafts.get(draft)!;
            const finalizedParent = parent ? finalize(parent) : undefined;
            return merge(finalizedParent, draft);
        }
        return draft;
    }

    function merge(target: any, source: any): any {
        if (source && typeof source === 'object') {
            const merged: any = Array.isArray(source) ? [] : {};
            Object.keys(source).forEach(key => {
                merged[key] = merge(target && target[key], source[key]);
            });
            return merged;
        }
        // Unwrap primitive values from the object container
        return source && source.value !== undefined ? source.value : source;
    }

    function createProxy(draft: any): any {
        return new Proxy(draft, {
            get(target, prop) {
                if (prop === Symbol.iterator) return undefined;
                const value = target[prop];
                return typeof value === 'object' ? createProxy(value) : value;
            },
            set(target, prop, value) {
                target[prop] = value;
                return true;
            }
        });
    }

    const draft = createDraft(baseState, null);
    const proxy = createProxy(draft);
    producer(proxy);
    return finalize(draft);
}

// Example usage:

