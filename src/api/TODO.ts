import BackItem from "../models/backItem";

function hashCode(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        const character = value.charCodeAt(i);
        hash = (hash << 5) - hash + character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

const items = [
    {
        key: 2345234523,
        value: "Test",
        done: false
    },
    {
        key: 52345234,
        value: "Test2",
        done: false
    }
];

export default {
    getItems: (): Promise<BackItem[]> => {
        return new Promise((resolve): void => {
            setInterval(() => {
                resolve(items);
            }, 1000);
        });
    },
    editItem: (item: BackItem): Promise<BackItem> => {
        return new Promise((resolve): void => {
            setInterval(() => {
                resolve(item);
            }, 1000);
        });
    },
    removeItem: (key: BackItem["key"]): Promise<BackItem["key"]> => {
        return new Promise((resolve): void => {
            setInterval(() => {
                resolve(key);
            }, 1000);
        });
    },
    addItem: (value: BackItem["value"]): Promise<BackItem> => {
        return new Promise((resolve, reject): void => {
            setInterval(() => {
                if (items.find(item => item.value === value)) {
                    reject(["Such TODO already exists"]);
                } else {
                    const item = {
                        value: value,
                        key: hashCode(value),
                        done: false
                    };
                    items.unshift(item);
                    resolve(item);
                }
            }, 1000);
        });
    }
};
