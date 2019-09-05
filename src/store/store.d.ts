interface Items {
    all: import("../models/item").default[];
    processing: boolean;
    addItemErrors: string[];
}

interface Details {
    details: import("../models/item").default | null;
}

interface State {
    items: Items;
    details: Details;
}
