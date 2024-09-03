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

interface FormFields {
  [key: string]: string;
  /** User Id */
  userId: string;
  /** Post title */
  title: string;
  /** Body title */
  body: string;
}
