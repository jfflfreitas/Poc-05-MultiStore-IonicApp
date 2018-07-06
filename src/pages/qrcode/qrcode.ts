import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {
  qrData = null;
  createdCode = null;
  scannedCode = null;
  url: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, private inAppBrowser: InAppBrowser  ) {
  }

  createCode() {
    this.createdCode = this.qrData;
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  openWebpage(url: string) {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }

    // Opening a URL and returning an InAppBrowserObject
    const browser = this.inAppBrowser.create(url, '_self', options);

    // Inject scripts, css and more with browser.X
  }

}
