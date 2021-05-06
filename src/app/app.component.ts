import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        firebase.initializeApp({
            apiKey: 'AIzaSyAoylaSlAWFMNX6ZmNtXOreNzHO7UVjwH0',
            authDomain: 'recipe-book-666.firebaseapp.com',
        });
    }
}
