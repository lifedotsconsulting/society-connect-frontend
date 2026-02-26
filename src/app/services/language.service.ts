import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private _selectedLang = 'en';

    constructor(private translate: TranslateService) { }

    public initLanguage() {
        this.translate.addLangs(['en', 'hi', 'mr']);
        const savedLang = localStorage.getItem('language');

        if (savedLang) {
            this._selectedLang = savedLang;
            this.translate.setDefaultLang(savedLang);
            this.translate.use(savedLang);
        } else {
            this.translate.setDefaultLang('en');
            this.translate.use('en');
        }
    }

    public setLanguage(lang: string) {
        this._selectedLang = lang;
        this.translate.use(lang);
        localStorage.setItem('language', lang);
    }

    public get selectedLang() {
        return this._selectedLang;
    }
}
