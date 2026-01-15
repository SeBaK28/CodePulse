export interface UploadImageRequest{
    file: File,
    name: string,
    title: string
}

export interface BlogImage{
    id:string,
    fileName: string,
    title: string,
    fileExtension: string,
    url: string,
    dateCreated: Date
}