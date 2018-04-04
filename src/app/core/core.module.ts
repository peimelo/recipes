import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    DataStorageService,
    RecipeService,
    ShoppingListService
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ]
})
export class CoreModule { }
