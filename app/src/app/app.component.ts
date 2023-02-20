import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { EventBusService } from './shared/services/event-bus.service';
import { AuthUseCase } from './core/usecases/auth.usecase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  eventBusSub?: Subscription;

  constructor(
    private eventBusService: EventBusService,
    private authUseCase: AuthUseCase
  ) {}

  ngOnInit(): void {
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authUseCase.signOut().subscribe({
      next: () => {
        window.location.reload();
      },
    });
  }
}
