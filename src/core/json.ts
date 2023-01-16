import { List } from "immutable";
import { Book, Directory } from "./Model";

export function toJson(t: Book | Directory): Object {
    if (t instanceof Book) return {
        "name": t.name,
        "reading": t.reading,
        "favorite": t.favorite
    }
    else if (t instanceof Directory) return {
        "name": t.name,
        "children": t.children.map(toJson)
    }
    else return {}
}

export function fromJson(t: any): Book | Directory {
    let keys = Object.keys(t)

    if (keys.includes("name") && keys.includes("children"))
        return new Directory(t["name"], t["children"].map(fromJson))
    else if (keys.includes("name"))
        return new Book(t["name"], t["reading"], t["favorite"])

    return new Directory("", List([]))
}