export type Credentials =
  {
    password: string,
    username: string
  };

export type User =
  {
    name: string
  };

export type Book = {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishDate: string;
    description: string;
    averageRating: number;
    ratingsCount: number;
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };

  searchInfo: {
    textSnippet: string;
  };
}
