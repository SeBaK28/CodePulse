import { Category } from "../../category/models/category.model"

export interface AddBlogPostRequest{
    title: string
    shortDescription: string
    content: string
    featuredImageURL: string
    urlHandle: string
    createdAt: Date
    author: string
    isVisible: boolean
    categories: string[]
}

export interface BlogPostModel{
    id:string
    title: string
    shortDescription: string
    content: string
    featuredImageURL: string
    urlHandle: string
    createdAt: Date
    author: string
    isVisible: boolean
    categories: Category[]
}