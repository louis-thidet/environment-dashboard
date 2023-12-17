import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, TemperatureChartComponent]
})
export class AppComponent {
  title = 'environmnent-dashboard';
}
