import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { SigninWithEmailPage } from '../pages/signinwithemail/signinwithemail';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { QrcodePage } from './../pages/qrcode/qrcode';
import { VirtualAssistantPage } from './../pages/virtual-assistant/virtual-assistant';
import { VisualRecognitionPage } from './../pages/visual-recognition/visual-recognition';


import { AuthService } from './../providers/auth/auth-service';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';

import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OneSignal } from '@ionic-native/onesignal';
import { IonicStorageModule } from '@ionic/storage';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

const firebaseConfig = {
  apiKey: "AIzaSyCOwffjaSIfCGQaI8_inMoaW1nTSj_fX3E",
  authDomain: "capgeministore.firebaseapp.com",
  databaseURL: "https://capgeministore.firebaseio.com",
  projectId: "capgeministore",
  storageBucket: "capgeministore.appspot.com",
  messagingSenderId: "42503403872"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SigninWithEmailPage,
    SignupPage,
    ResetpasswordPage,
    QrcodePage,
    VirtualAssistantPage,
    VisualRecognitionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    NgxQRCodeModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SigninWithEmailPage,
    SignupPage,
    ResetpasswordPage,
    QrcodePage,
    VirtualAssistantPage,
    VisualRecognitionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    GooglePlus,
    Facebook,
    TwitterConnect,
    BarcodeScanner,
    InAppBrowser,
    OneSignal,
    SpeechRecognition,
    Camera,
    FileTransfer,
    File,
    FileChooser
  ]
})
export class AppModule { }
