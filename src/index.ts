import { Book, Directory } from "./Model";
import { toJson, fromJson } from "./json";

const root = new Directory("root", [
    new Book("Mastering Typescript"),
    new Directory("Physics", [
        new Book("Introduction to classical mechanics"),
        new Book("Special relativity")
    ])
])

console.log(fromJson(toJson(root)))