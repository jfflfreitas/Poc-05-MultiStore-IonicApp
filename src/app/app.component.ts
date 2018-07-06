
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { SigninPage } from './../pages/signin/signin';
import { QrcodePage } from './../pages/qrcode/qrcode';
import { VirtualAssistantPage } from './../pages/virtual-assistant/virtual-assistant';
import { VisualRecognitionPage } from './../pages/visual-recognition/visual-recognition';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  homePage = HomePage;
  signinPage = SigninPage;
  qrcodePage = QrcodePage;
  virtualAssistantPage = VirtualAssistantPage;
  visualRecognitionPage = VisualRecognitionPage;

  constructor(
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = SigninPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // OneSignal Code start:
      // Enable to debug issues:
      // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      var notificationOpenedCallback = function (jsonData) {
        // alert('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
        .startInit("d59db55d-6cbe-44b8-bc78-ca2dbe39cbf1", "42503403872")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
    });
  }
  openPage(p) {
    this.rootPage = p;
  }
}