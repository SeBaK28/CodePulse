export interface AddBlogPostRequest{
    title: string
    shortDescription: string
    content: string
    featuredImageURL: string
    urlHandle: string
    createdAt: Date
    author: string
    isVisible: boolean
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
}