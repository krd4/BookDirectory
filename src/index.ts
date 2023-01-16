import { Book, Directory } from "./core/Model";
import { toJson, fromJson } from "./core/json";
import { List } from "immutable";

const root = new Directory("root", List([
    new Book("Mastering Typescript", true, true),
    new Directory("Physics", List([
        new Book("Introduction to classical mechanics", false, true),
        new Book("Special relativity", false, false)
    ])
    )]))

console.log(root)
console.log(fromJson(toJson(root)))
console.log(root.getAllBooks())
console.log(root.getBook("Mastering Typescript"))