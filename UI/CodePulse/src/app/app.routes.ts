import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { NgModule } from '@angular/core';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';


export const routes: Routes = [
    {
        path: "admin/categories",
        component: CategoryListComponent
    },
    {
        path: "admin/categories/add",
        component: AddCategoryComponent
    },
    {
        path: "admin/categories/:id",
        component: EditCategoryComponent
    },
    {
        path: "admin/blogpost",
        component: BlogpostListComponent
    },
    {
        path: "admin/blogpost/add",
        component: AddBlogpostComponent
    }
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        FormsModule,
        HttpClientModule
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { };
