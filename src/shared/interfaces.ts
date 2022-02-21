import { MouseEventHandler } from 'react';

export interface Folder {
  name: string,
  files: Array<File>
}
export interface File {
  name: string,
  id: string,
}
export interface PropsFolderTree {
  folders: Array<Folder>,
  handleOpen: Function
}
