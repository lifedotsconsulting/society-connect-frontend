import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    public themeService: ThemeService,
    public languageService: LanguageService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }

  async login() {
    if (!this.username || !this.password) {
      this.showToast(this.translate.instant('LOGIN.ERRORS.EMPTY'));
      return;
    }

    const loading = await this.loadingController.create({
      message: this.translate.instant('LOGIN.LOGGING_IN')
    });
    await loading.present();

    try {
      await this.authService.login(this.username, this.password);
      loading.dismiss();
      this.router.navigateByUrl('/folder/inbox', { replaceUrl: true });
    } catch (err: any) {
      loading.dismiss();
      this.showToast(this.translate.instant(err));
    }
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: 'danger'
    });
    toast.present();
  }
}
