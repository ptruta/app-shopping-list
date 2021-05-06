import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import { Router } from '@angular/router';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        switchMap((action: RecipeActions.FetchRecipes) => {
            return this.http.get<Recipe[]>(`https://recipe-book-666.firebaseio.com/recipes.json`, {
                observe: 'body',
                responseType: 'json',
            });
        }),
        map((response) => {
            for (let recipe of response) {
                if (!recipe['ingredients']) {
                    recipe.ingredients = [];
                }
            }

            return {
                type: RecipeActions.SET_RECIPES,
                payload: response,
            };
        }),
        tap(() => {
            this.router.navigate(['recipes']);
        }),
    );

    @Effect({ dispatch: false })
    recipeStore = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([action, state]) => {
            return this.http.put<Recipe[]>(
                `https://recipe-book-666.firebaseio.com/recipes.json`,
                state.recipes,
                {
                    reportProgress: true,
                },
            );
        }),
        tap(() => {
            this.router.navigate(['recipes']);
        }),
    );

    constructor(
        private actions$: Actions,
        private store: Store<fromRecipe.FeatureState>,
        private http: HttpClient,
        private router: Router,
    ) {}
}
