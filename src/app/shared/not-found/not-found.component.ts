import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card text-center">
      <div class="card-body p-2">
        <h5 class="card-title"><strong>404: Not Found</strong></h5>
        <h6 class="card-subtitle small mb-2 mt-2" >Hey! It looks like this page doesn't exist.</h6>
        <p class="card-text">We are working on a dinosaur to play with.</p>
        <a routerLink="/" class="">Take Me Home</a>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        text-align: center;
      }
    `,
  ],
})
export class NotFoundComponent {}
