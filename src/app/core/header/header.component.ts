import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>;

    constructor(private router: Router, private store: Store<fromApp.AppState>) {}

    ngOnInit(): void {
        this.authState = this.store.select('auth');
    }

    updateRecipeList() {
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    fetchRecipes() {
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());

        this.router.navigate(['signin']);
    }
}
