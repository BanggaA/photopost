export interface CreatePostDTO {
  caption: string;
}
export interface UpdatePostDTO {
  caption: string;
  isPublished: boolean;
}
export interface PaginationPostDTO {
  page: number;
  size: number;
}
