import { List } from "immutable";
import * as path from 'path';

export class Book {
    constructor(
        public name: string,
        public reading: boolean,
        public favorite: boolean
    ) { }
}

export class Directory {
    constructor(
        public name: string,
        public children: List<Book | Directory>
    ) { }

    addItem(item: Book | Directory): Directory {
        return new Directory(this.name, this.children.push(item))
    }

    getBooks(): List<Book> {
        return this.children.filter(item => item instanceof Book) as List<Book>
    }

    getDirectories(): List<Directory> {
        return this.children.filter(item => item instanceof Directory) as List<Directory>
    }

    getAllBooks(): List<Book> {
        const loop = (_t: Book | Directory, books: List<Book>): List<Book> => {
            if (_t instanceof Book) return books.push(_t)
            else if (_t instanceof Directory)
                return books.concat(this.getBooks())
                    .concat(this.getDirectories().flatMap(this.getAllBooks))

            return List()
        }

        return loop(this, List([]))
    }

    goToNextDir(dir_name: string): Directory {
        return this.getDirectories().filter(item => item.name == dir_name).first(this)
    }

    goToBook(_path: string): Book {
        let info = path.parse(_path)

        return info.dir
            .split("/")
            .filter(s => s.length != 0)
            .reduce((_t, next_dir) => _t.goToNextDir(next_dir), this as Directory)
            .getBooks()
            .filter(item => item.name == info.name)
            .first(new Book("", false, false)) as Book
    }
}