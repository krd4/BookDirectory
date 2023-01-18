import { List } from "immutable";
import { Book, Directory } from "./Model";

export function fromJson(t: any): Book | Directory {
    let keys = Object.keys(t)

    if (keys.includes("name") && keys.includes("children"))
        return new Directory(t["name"], t["children"].map(fromJson))
    else if (keys.includes("name"))
        return new Book(t["name"], t["reading"], t["favorite"])

    return new Directory("", List([]))
}