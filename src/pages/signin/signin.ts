
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from './../../providers/auth/user';
import { AuthService } from './../../providers/auth/auth-service';
import { HomePage } from './../home/home';
import { SignupPage } from './../signup/signup';
import { SigninWithEmailPage } from './../signinwithemail/signinwithemail';
import { ResetpasswordPage } from './../resetpassword/resetpassword';
// import { ContatosPage } from './../contatos/contatos';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})


export class SigninPage {
  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private authService: AuthService) {
  }

  createAccount() {
    this.navCtrl.push(SignupPage);
  }

  signInWithEmailPage() {
    this.navCtrl.push(SigninWithEmailPage);
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then(() => {
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error) => {
        this.toastCtrl.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar o login' })
          .present();
      });
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then(() => {
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error) => {
        this.toastCtrl.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar o login' })
          .present();
      });
  }

  signInWithTwitter() {
    this.authService.signInWithTwitter()
      .then(() => {
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error) => {
        this.toastCtrl.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar o login' })
          .present();
      });
  }

  resetPassword() {
    this.navCtrl.push(ResetpasswordPage);
  }

}
