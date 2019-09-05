interface Items {
    all: import("./models/item").default[];
    processing: boolean;
    addItemErrors: string[];
}

interface State {
    items: Items;
}
