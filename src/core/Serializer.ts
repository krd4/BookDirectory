export interface ISerializable {
    toJson(): Object
    fromJson(t: any): ISerializable
}