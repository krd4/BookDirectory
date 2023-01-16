import { List } from "immutable";
import { Book, Directory } from "./Model";
import * as path from 'path';

function goToNextDir(t: Directory, dir_name: string): Directory {
    return getDirectories(t).filter(item => item.name == dir_name).first(new Directory("", List()))
}

export function goToBook(t: Directory, _path: string): Book {
    let info = path.parse(_path)

    return getBooks(info.dir
        .split("/")
        .filter(s => s.length != 0)
        .reduce((_t, next_dir) => goToNextDir(_t, next_dir), t)
    )
        .filter(item => item.name == info.name)
        .first(new Book("", false, false)) as Book
}

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