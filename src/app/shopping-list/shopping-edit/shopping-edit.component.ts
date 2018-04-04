import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingEditForm: NgForm;
  editMode = false;
  editedItem: Ingredient;
  editedItemIndex: number;
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.shoppingEditForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.resetForm(this.shoppingEditForm);
    // this.shoppingEditForm.reset();
    // this.editMode = false;
  }

  onDelete() {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
    }
    this.resetForm(this.shoppingEditForm);
  }

  onSubmitItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    // this.editMode = false;
    // form.reset();
    this.resetForm(form);
  }

  private resetForm(form: NgForm) {
    form.reset();
    this.editMode = false;
  }
}
