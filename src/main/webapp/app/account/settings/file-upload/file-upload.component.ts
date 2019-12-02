import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFileService } from 'app/shared/services/upload.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent implements OnInit {
  showFile = false;
  fileUploads: Observable<string[]>;
  private image: any;
  private readonly imageType: string = 'data:image/jpg;base64,';

  constructor(private uploadService: UploadFileService, private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      //this.fileUploads = this.uploadService.getFiles();
      this.uploadService.getImage().subscribe(response => {
        this.image = this.sanitizer.bypassSecurityTrustUrl(this.imageType + response.content);
      });
    }
  }
}
