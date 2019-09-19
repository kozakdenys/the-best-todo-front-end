import Item from "./item";

export default class FrontItem {
    id: string;
    name: string;
    done: boolean;
    constructor(props: Item) {
        this.id = props.id;
        this.name = props.name;
        this.done = props.done;
    }
}
