import { Book, Directory } from "./Model";
import { toJson, fromJson } from "./json";
import { List } from "immutable";
import { getAllBooks, goToBook } from "./searcher";

const root = new Directory("root", List([
    new Book("Mastering Typescript", true, true),
    new Directory("Physics", List([
        new Book("Introduction to classical mechanics", false, true),
        new Book("Special relativity", false, false)
    ])
    )]))

console.log(root)
console.log(fromJson(toJson(root)))
getAllBooks(root).map(console.log)
console.log(goToBook(root, "/Physics/Introduction to classical mechanics"))