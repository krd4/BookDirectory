import { Book, Directory } from "./Model";

export function toJson(t: Book | Directory): Object {
    if (t instanceof Book) return t.name
    else if (t instanceof Directory) return {
        "name": t.name,
        "children": t.children.map(toJson)
    }
    else return {}
}

export function fromJson(t: any): Book | Directory {
    let keys: string[] = Object.keys(t)

    if (keys.includes("name") && keys.includes("children")) {
        if (typeof t["name"] == "string" && Array.isArray(t["children"]))
            return new Directory(t["name"], t["children"].map(fromJson))
    } else if (keys.includes("name")) {
        if (typeof t["name"] == "string")
            return new Book(t["name"])
    }

    return new Directory("", [])
}