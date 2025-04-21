import { Injectable } from '@angular/core';
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import { v4 as uuidv4 } from 'uuid';
import {getDownloadURL} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uploadedFileURL: string = "";
  basePath = "images/";

  constructor(private storage:AngularFireStorage) { }

  async uploadFile(file:File){
    try {
      console.log(file)
      const filePath = this.basePath+uuidv4()+file.name;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      await task;
      return await getDownloadURL(task.task.snapshot.ref);

    }catch (error){
      console.error("Error uploading file:", error);
      throw error;
    }
  }
}
