import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
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
  codeUrl = input.required<string>();
  codeRessource = httpResource.text<string>(() => this.codeUrl());
}
