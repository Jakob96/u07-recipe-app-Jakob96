import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { List } from '../list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-recipe-list',
  templateUrl: './add-recipe-list.component.html',
  styleUrls: ['./add-recipe-list.component.scss']
})
export class AddRecipeListComponent implements OnInit {
  name: string = '';
  description: string = '';
  list: List;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => { 
      if (params['id'] && params['method'] === 'edit') {
        this.getRecipeList(params['id'])
      } 
    });
  }

  getRecipeList(id:string): void {
    this.recipeService.getRecipeLists().subscribe(
      (res) => { this.list = res.find((list) => list.id.toString() === id); 
      this.name = this.list.name; 
      this.description = this.list.description; })
  }

  handleSubmit(): void {
    if (this.list) {
      this.updateRecipeList();
    }
    else {
      this.addRecipeList();
    }
  }

  addRecipeList(): void {
    if (this.name) {
      this.recipeService.addRecipeList(this.name, this.description).subscribe(res => {
        this.snackBar.open('The list has been added!', 'close', {
          duration: 3000
        })
      }, (error) => {
        alert('An error occured, please try again');
      });
    } 
  }

  updateRecipeList(): void {
    this.recipeService.updateRecipeList(this.list.id.toString(), this.name, this.description).subscribe(res => {
      this.snackBar.open('The list has been updated!', 'close', {
        duration: 3000
      })
    }, (error) => {
      alert('An error occured, please try again');
    });
  }
}
