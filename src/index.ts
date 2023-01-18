import { Book, Directory } from "./core/Model";
import { List } from "immutable";

const root = new Directory("root", List([
    new Book("Mastering Typescript", true, true),
    new Directory("Physics", List([
        new Book("Introduction to classical mechanics", false, true),
        new Book("Special relativity", false, false)
    ])
    )]))

console.log(root)
console.log(root.toJson())
console.log(root.getAllBooks())
console.log(root.getBook("Mastering Typescript"))
console.log(root.update("Mastering Typescript", new Book("Typescript Design Patterns", true, true)).toJson())
console.log(root.update("Physics/Special relativity", new Book("General relativity", true, true)).toJson())
console.log(root.remove("Physics/Special relativity").toJson())
console.log(
    root
        .add(
            "",
            new Directory("Chemistry", List([
                new Book("Organic Chemistry", true, false)
            ]))
        )
        .add(
            "Chemistry",
            new Book("Inorganic Chemistry", false, false)
        )
        .toJson()
)