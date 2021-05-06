import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
    @Input()
    recipeState: Observable<fromRecipe.State>;
    id: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<fromRecipe.FeatureState>,
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];

            this.recipeState = this.store.select('recipes');
        });
    }

    addToShoppingList() {
        this.store
            .select('recipes')
            .pipe(take(1))
            .subscribe((recipeState: fromRecipe.State) => {
                this.store.dispatch(
                    new ShoppingListActions.AddIngredients(
                        recipeState.recipes[this.id].ingredients,
                    ),
                );
            });

        this.router.navigate(['shopping-list']);
    }

    onEditRecipe() {
        this.router.navigate(['edit'], { relativeTo: this.route });
        // same
        // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
    }

    onDeleteRecipe() {
        this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));

        this.router.navigate(['/recipes']);
    }
}
