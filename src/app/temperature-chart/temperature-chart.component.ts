import { Component, HostListener } from '@angular/core';
import Chart from 'chart.js/auto';
import { EnvironmentService } from '../environment.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

// Date format constants for custom date formats
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

// Angular component metadata
@Component({
  selector: 'app-temperature-chart',
  standalone: true,
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.css'],
  // Importing necessary Angular material modules
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatIconModule],
  providers: [
    // Providing custom date adapter and formats
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class TemperatureChartComponent {
  // Properties for chart data and settings
  public chart: any;
  public data: [number, number][] | undefined;
  public selectedDate = new FormControl(moment());
  public formattedSelectedDate: string | undefined;
  public defaultDate: string | undefined;
  public loadedChartType: string | undefined;

  // Constructor with EnvironmentService injection
  constructor(private environmentService: EnvironmentService) {}

  // Lifecycle hook - component initialization
  ngOnInit(): void {
    // Creating a default chart
    this.loadTemperatureChart();
    this.loadedChartType = "temperature";
    // Formatting the default date (today)
    this.formattedSelectedDate = moment(this.selectedDate.value).format('DD/MM/YYYY');
    this.defaultDate = this.formattedSelectedDate;
    console.log('Default Date:', this.formattedSelectedDate);
  }

  // ===============================
  // ====== TEMPERATURE CHART ======
  // ===============================
loadTemperatureChart() {
  // Fetching temperature data from the environment service
  this.environmentService.getTemperatureData().subscribe(
    // Successful data retrieval
    (data) => {
      this.data = data;
      // Creating a chart with temperature data
      this.createChart("blue", "Temperature");
      this.loadedChartType = "temperature";
    },
    // Error handling for temperature data fetching
    (error) => {
      console.error('Error fetching temperature data', error);
    }
  );
}


  // ===============================
  // ======= PRESSURE CHART ========
  // ===============================
  loadPressureChart() {
    // Fetching pressure data from the environment service
    this.environmentService.getPressureData().subscribe(
      // Successful data retrieval
      (data) => {
        this.data = data;
        // Creating a chart with pressure data
        this.createChart("green", "Pressure");
        this.loadedChartType = "pressure";
      },
      // Error handling for pressure data fetching
      (error) => {
        console.error('Error fetching Pressure data', error);
      }
    );
  }

  // ===============================
  // ======= HUMIDITY CHART ========
  // ===============================
  loadHumidityChart() {
    // Fetching humidity data from the environment service
    this.environmentService.getHumidityData().subscribe(
      // Successful data retrieval
      (data) => {
        this.data = data;
        // Creating a chart with humidity data
        this.createChart("cyan", "Humidity");
        this.loadedChartType = "humidity";
      },
      // Error handling for humidity data fetching
      (error) => {
        console.error('Error fetching Humidity data', error);
      }
    );
  }

  // ===============================
  // == INDOOR AIR QUALITY CHART ===
  // ===============================
  loadIAQChart() {
    // Fetching indoor air quality data from the environment service
    this.environmentService.getIAQData().subscribe(
      // Successful data retrieval
      (data) => {
        this.data = data;
        // Creating a chart with indoor air quality data
        this.createChart("grey", "Indoor Air Quality");
        this.loadedChartType = "IAQ";
      },
      // Error handling for indoor air quality data fetching
      (error) => {
        console.error('Error fetching Indoor Air Quality data', error);
      }
    );
  }

  // ===============================
  // ======= CREATE A CHART ========
  // ===============================
  createChart(lineColor: string, chartTitle: string) {
    // Destroy the existing chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }
  
    // Filter data based on the selected date
    const selectedDate = moment(this.selectedDate.value).format('DD/MM/YYYY');
    const filteredData = this.data
      ?.filter(([_, generatedDate]) => moment(generatedDate).format('DD/MM/YYYY') === selectedDate)
      .reverse();
  
    // Format time labels
    const labels = filteredData?.map(([_, generatedDate]) => new Date(generatedDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) || [];
  
    // Creating a new Chart.js chart
    this.chart = new Chart('MyChart', {
      type: 'line',
      data: {
        labels: labels!,
        datasets: [
          {
            label: chartTitle,
            data: filteredData?.map(([temperature, _]) => temperature) || [],
            backgroundColor: lineColor,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
      },
    });
  }
  
  // ===============================
  // ======== FILTER A DATE ========
  // ===============================
  onDateChange() {
    // Check if a date is selected
    if (this.selectedDate.value) {
      // Format the selected date as DD/MM/YYYY
      this.formattedSelectedDate = moment(this.selectedDate.value).format('DD/MM/YYYY');
      console.log('Selected Date:', this.formattedSelectedDate);

      // Load the appropriate chart based on the selected date
      if (this.loadedChartType == "temperature") {
        this.loadTemperatureChart();
      } else if (this.loadedChartType == "pressure") {
        this.loadPressureChart();
      } else if (this.loadedChartType == "humidity") {
        this.loadHumidityChart();
      } else if (this.loadedChartType == "IAQ") {
        this.loadIAQChart();
      }
    }
  }

  // ======================================================
  // ======== RESET THE PAGE TO DEFAULT PARAMETERS ========
  // ======================================================
  reset() {
    // Reset default date (today)
    this.selectedDate.setValue(moment(this.defaultDate, 'DD/MM/YYYY'));
    // Load temperature chart
    this.loadTemperatureChart();
  }

  // =============================================
  // === RESIZE THE CHART TO THE WINDOW'S SIZE ===
  // =============================================
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Resize the chart when the window is resized
    this.chart.resize();
  }
}
