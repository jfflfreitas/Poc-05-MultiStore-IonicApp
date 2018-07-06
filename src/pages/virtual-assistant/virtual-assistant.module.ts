import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VirtualAssistantPage } from './virtual-assistant';

@NgModule({
  declarations: [
    VirtualAssistantPage,
  ],
  imports: [
    IonicPageModule.forChild(VirtualAssistantPage),
  ],
})
export class VirtualAssistantPageModule {}
