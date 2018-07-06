import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, IonicPage, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';

/**
 * Generated class for the VisualRecognitionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visual-recognition',
  templateUrl: 'visual-recognition.html',
})
export class VisualRecognitionPage {
  base64Image: any;
  public regularString: any;

  constructor(public navCtrl: NavController,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alert: AlertController,
    private _DomSanitizationService: DomSanitizer) { }


  getImage() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.uploadImage(imageData);
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }


  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.uploadImage(imageData);

    }, err => {
      this.showAlert(err);
    });
  }


  uploadImage(imageData) {
    this.base64Image = 'data:image/png;base64,' + imageData;

    console.log(imageData);

    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'image',
      fileName: 'image',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload('data:image/png;base64,' + imageData, 'https://visualrecognitionservicecap.mybluemix.net/api/upload', options)
      .then((data) => {
        console.log(data);
        var json = JSON.parse(data.response);
        console.log(json);
        loader.dismiss();
        this.presentToast("Image uploaded successfully");
        let responseClassifierData = JSON.parse(data.response).images["0"].classifiers;
        this.createHtmlFromJSON(responseClassifierData);
        var persona = false;
        var model = 0;
        var classifier = 0;
        for (var j = 0; j < json.images[0].classifiers.length; j++) {
          for (var i = 0; i < json.images[0].classifiers[j].classes.length; i++) {
            if (json.images[0].classifiers[j].classes[i].class == 'Homem' || json.images[0].classifiers[j].classes[i].class == 'Mulher' || json.images[0].classifiers[j].classes[i].class == 'Careca' || json.images[0].classifiers[j].classes[i].class == 'Barbudo' || json.images[0].classifiers[j].classes[i].class == 'Executivo') {
              persona = true;
            }
            // if (json.images[0].classifiers[j].classes[i].class == 'pontalexandre3.zip' || json.images[0].classifiers[j].classes[i].class == 'Arc_Carroussel') {
            //     classifier = j;
            //     model = i;
            // }
          }
        }
        if (persona) {
          this.showAlert(json.images[0].classifiers[classifier].classes[0].class + " with score of : " + json.images[0].classifiers[classifier].classes[0].score);
        } else {
          this.showAlert("Watson não conseguiu identificar personas...");
        }
        //this.showAlert(json.images[0].classifiers[1].classes[0].class+" with score of : "+ json.images[0].classifiers[0].classes[0].score);
      }, (err) => {
        console.log(err);
        loader.dismiss();
        this.presentToast(err);
      });
  }

  createHtmlFromJSON(classifierData) {
    let randomString = "";
    for (let classifier of classifierData) {
      randomString += "<div><b>Classifier ID:: </b>" + classifier.classifier_id + "</div><br/>";
      for (let classifierClass of classifier.classes) {
        let jsonStr = JSON.stringify(classifierClass);

        let f = {
          brace: 0
        }; // for tracking matches, in particular the curly braces

        let regeStr = jsonStr.replace(/({|}[,]*|[^{}:]+:[^{}:,]*[,{]*)/g, function (m: string, p1): any {
          let rtnFn: any = function () {
            return '<div style="text-indent: ' + (f['brace'] * 20) + 'px;">' + p1 + '</div>';
          };
          let rtnStr = 0;

          if (p1.lastIndexOf('{') === (p1.length - 1)) {
            rtnStr = rtnFn();
            f['brace'] += 1;
          } else if (p1.indexOf('}') === 0) {
            f['brace'] -= 1;
            rtnStr = rtnFn();
          } else {
            rtnStr = rtnFn();
          }
          return rtnStr;
        });

        randomString += regeStr;
      }
      randomString += "<br/><br/>";
    }
    this.regularString = this._DomSanitizationService.bypassSecurityTrustHtml(randomString);
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  showAlert(msg) {
    let alert = this.alert.create({
      title: 'Alert',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
