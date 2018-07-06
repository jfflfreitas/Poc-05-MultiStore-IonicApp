import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisualRecognitionPage } from './visual-recognition';

@NgModule({
  declarations: [
    VisualRecognitionPage,
  ],
  imports: [
    IonicPageModule.forChild(VisualRecognitionPage),
  ],
})
export class VisualRecognitionPageModule {}
