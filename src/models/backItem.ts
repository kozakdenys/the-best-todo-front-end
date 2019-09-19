export default class BackItem {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    done: boolean;
    constructor(props: BackItem) {
        this.id = props.id;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.name = props.name;
        this.done = props.done;
    }
}
