import {Component, OnInit} from '@angular/core';
import {FileService} from 'app/shared/services/upload.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {
  private image: any;
  private readonly imageType: string = 'data:image/jpg;base64,';

  constructor(private uploadService: FileService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.uploadService.getImage().subscribe(response => {
      this.image = this.sanitizer.bypassSecurityTrustUrl(this.imageType + response.content);
    });
  }
}
