import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CheckLogin {
    private isLogin = false; // Initialize the login status as "not logged in"

    constructor() { }

    // Get the current login status
    getLoginStatus(): boolean {
        return this.isLogin;
    }

    // Set the login status (true for logged in, false for not logged in)
    setLogin(isLogin: boolean): void {
        this.isLogin = isLogin;
    }
}
