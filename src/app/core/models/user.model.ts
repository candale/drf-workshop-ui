export class User {
    pk: number;
    token: string;
    first_name: string;
    last_name: string;

    get name() {
        return `${this.first_name} ${this.last_name}`;
    }

    constructor(data) {
        this.pk = data.pk;
        this.token = data.token;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
    }
}