import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-demo-code',
  imports: [HighlightModule],
  templateUrl: './demo-code.component.html',
  styleUrl: './demo-code.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoCodeComponent {
  #httpClient = inject(HttpClient);

  codeUrls = input.required<string[]>();
  codeData = linkedSignal(() => {
    return this.codeUrls().map((url) => {
      return {
        content: '',
        loaded: false,
        url: url,
        extension: url.split('.').pop() || '',
      };
    });
  });
  tabSelected = signal(0);

  constructor() {
    effect(() => {
      for (let i = 0; i < this.codeUrls().length; i++) {
        this.#httpClient
          .get(this.codeUrls()[i], { responseType: 'text' })
          .subscribe((data) => {
            this.codeData.update((current) => {
              current[i].content = data;
              current[i].loaded = true;
              return [...current];
            });
          });
      }
    });
  }
}
