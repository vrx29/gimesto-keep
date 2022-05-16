export type NotesType = {
  id: string;
  title: string;
  noteColor: string;
  content: any;
  created: string;
  priority: string;
  labels: Array<string>;
};

export type filtersType = {
  priority: string;
  sortByTime: string;
  labels: Array<string>;
};
