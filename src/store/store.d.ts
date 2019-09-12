interface Items {
    all: import("../models/item").default[];
    processing: boolean;
    addItemErrors: Error[];
}

interface Details {
    details: import("../models/item").default | null;
}

interface Auth {
    user: import("../interfaces/auth").User | null;
    authErrors: Error[];
    userErrors: Error[];
}

interface State {
    items: Items;
    details: Details;
    auth: Auth;
}
