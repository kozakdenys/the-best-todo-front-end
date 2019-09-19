import BackItem from "./backItem";

export default class Item extends BackItem {
    processing = false;
    errors: Error[] = [];
    createdDate: Date;
    updatedDate: Date;
    constructor(props: BackItem) {
        super(props);
        this.createdDate = new Date(props.createdAt);
        this.updatedDate = new Date(props.updatedAt);
    }
}
