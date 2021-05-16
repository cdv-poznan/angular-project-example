export interface UploadFile {
  file: File;
  progress: number;
  uploading: boolean;
  selected: boolean;
  done: boolean;
}
