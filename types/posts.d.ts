interface Post {
  /** User Id */
  userId: number;
  /**  Post Id */
  id: number;
  /** Post title */
  title: string;
  /** Body title */
  body: string;
}

type labelsGroup = "id" | "title" | "body";
