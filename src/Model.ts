import { List } from "immutable";

export class Book {
    constructor(
        public name: string,
        public reading: boolean,
        public favorite: boolean
    ) { }
}

export class Directory {
    constructor(
        public name: string,
        public children: List<Book | Directory>
    ) { }
}