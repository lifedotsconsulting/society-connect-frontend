import { Component, OnInit } from '@angular/core';

import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
