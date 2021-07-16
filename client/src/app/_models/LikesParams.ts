export enum Predicate {
  liked = 'liked',
  likedBy = 'likedBy'
}
export class LikesParams {
  predicate: Predicate;
  pageNumber = 1;
  pageSize = 5;
}
