import BackItem from "./backItem";

export default class Item extends BackItem {
    processing = false;
    errors: Error[] = [];
}
