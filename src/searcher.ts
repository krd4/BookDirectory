import { List } from "immutable";
import { Book, Directory } from "./Model";

export function getBooks(t: Directory): List<Book> {
    return t.children.filter(item => item instanceof Book) as List<Book>
}

export function getDirectories(t: Directory): List<Directory> {
    return t.children.filter(item => item instanceof Directory) as List<Directory>
}

export function getAllBooks(t: Directory): List<Book> {
    function loop(_t: Book | Directory, books: List<Book>): List<Book> {
        if (_t instanceof Book) return books.push(_t)
        else if (_t instanceof Directory)
            return books.concat(getBooks(_t))
                .concat(getDirectories(_t).flatMap(getAllBooks))

        return List()
    }

    return loop(t, List([]))
}