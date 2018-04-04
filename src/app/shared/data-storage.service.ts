import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  private recipesUrl = 'https://ng-recipe-book-10051.firebaseio.com/recipes.json';

  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.http.get(this.recipesUrl + '?auth=' + token)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

  storeRecipes() {
    const token = this.authService.getToken();

    return this.http.put(this.recipesUrl + '?auth=' + token, this.recipeService.getRecipes());
  }
}
