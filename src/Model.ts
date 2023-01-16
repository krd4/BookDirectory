export class Book {
    name: string;

    constructor(name: string) { this.name = name; }
}

export class Directory {
    name: string;
    children: Array<Book | Directory>;

    constructor(name: string, children: Array<Book | Directory>) { this.name = name; this.children = children; }
}