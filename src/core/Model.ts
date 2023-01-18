import { List } from "immutable";
import * as path from 'path';
import _ from 'lodash';
import { ISerializable } from "./Serializer";

export class Book implements ISerializable {
    constructor(
        public name: string,
        public reading: boolean,
        public favorite: boolean
    ) { }
    toJson(): Object {
        return {
            "name": this.name,
            "reading": this.reading,
            "favorite": this.favorite
        }
    }
    fromJson(t: any): Book {
        throw new Error("Method not implemented.");
    }
}

export class Directory implements ISerializable {
    constructor(
        public name: string,
        public children: List<Book | Directory>
    ) { }

    toJson(): Object {
        return {
            "name": this.name,
            "children": this.children.map(c => c.toJson()).toArray()
        }
    }
    fromJson(t: any): Directory {
        throw new Error("Method not implemented.");
    }

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
                return books
                    .concat(this.getBooks())
                    .concat(this.getDirectories().flatMap(this.getAllBooks))

            return List()
        }

        return loop(this, List([]))
    }

    goToNextDir(dir_name: string): Directory {
        return this.getDirectories().filter(item => item.name == dir_name).first(this)
    }

    getEnclosingDirectory(_path: string): Directory {
        let info = path.parse(_path)

        return info.dir
            .split("/")
            .filter(s => s.length != 0)
            .reduce((_t, next_dir) => _t.goToNextDir(next_dir), this as Directory)
    }

    getBook(_path: string): Book {
        let info = path.parse(_path)

        return this.getEnclosingDirectory(_path)
            .getBooks()
            .filter(item => item.name == info.name)
            .first(new Book("", false, false)) as Book
    }

    getDirectory(_path: string): Directory {
        return this.getEnclosingDirectory(path.join(_path, "dummy.txt"))
    }

    _update(target: Book | Directory, item: Book | Directory): Directory {
        let i = this.children.findIndex((v, k, iter) => v == target)

        if (i)
            return new Directory(
                this.name,
                this.children.update(
                    i as number,
                    v => item
                )
            )

        return this
    }

    _remove(target: Book | Directory): Directory {
        let i = this.children.findIndex((v, k, iter) => v == target)

        if (i)
            return new Directory(
                this.name,
                this.children.remove(i)
            )

        return this
    }

    _add(target: Book | Directory): Directory {
        return new Directory(
            this.name,
            this.children.push(target)
        )
    }

    private edit(_path: string, updateOn: number, updator: (dirs: List<Book | Directory>) => Directory): Directory {
        const loop = (dirs: List<Directory>): Directory => {
            if (dirs.size == updateOn) return updator(dirs)
            return (dirs.first() as Directory)
                ._update(
                    dirs.get(1) as Directory,
                    loop(dirs.rest())
                )
        }

        const info = List(_path.split("/").filter(s => s.length != 0))

        return loop(
            List(
                _.range(1, info.size + 1)
                    .map(i => this.getDirectory(info.take(i).join("/")))
            ).insert(0, this)
        )
    }

    update(_path: string, item: Book | Directory): Directory {
        return this.edit(_path, 2, dirs => (dirs.first() as Directory)._update(dirs.last(), item))
    }

    remove(_path: string): Directory {
        return this.edit(_path, 2, dirs => (dirs.first() as Directory)._remove(dirs.last()))
    }

    add(_path: string, item: Book | Directory): Directory {
        return this.edit(_path, 1, dirs => (dirs.first() as Directory)._add(item))
    }
}