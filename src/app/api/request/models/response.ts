
export class Response<T> {

    constructor(cont: T) {
        this.content = cont;
    }

    content: T;
}