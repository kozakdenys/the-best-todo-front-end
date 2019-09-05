export default class BackItem {
    key: number;
    value: string;
    done: boolean;
    constructor(props: BackItem) {
        this.key = props.key;
        this.value = props.value;
        this.done = props.done;
    }
}
