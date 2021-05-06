import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: State;
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe(
            'Vegetarian Bowl',
            'Delicious vegetables as tasty as always.',
            '../assets/image/appetizer-background-cuisine-326281.jpg',
            [
                new Ingredient('Rocket', 1),
                new Ingredient('Tomato', 5),
                new Ingredient('Soy Sprouts', 20),
            ],
        ),
    ],
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload],
            };

        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload],
            };

        case RecipeActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index];
            // this is the recipe we want to change which is in the state already

            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe,
            };

            const recipes = [...state.recipes];

            recipes[action.payload.index] = updatedRecipe;

            return {
                ...state,
                recipes,
            };

        case RecipeActions.DELETE_RECIPE:
            const deletedRecipes = [...state.recipes];

            deletedRecipes.splice(action.payload, 1);

            return {
                ...state,
                recipes: deletedRecipes,
            };

        default:
            return state;
    }
}
