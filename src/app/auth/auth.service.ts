import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;

    constructor() {}

    // TODO:  getToken() & isAuthenticated() method to be removed after implementation of ngRX

    isAuthenticated() {
        return this.token !== null;
    }
}
