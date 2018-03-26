import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../service/workout.service';

@Component({
  selector: 'track',
  templateUrl: 'track.component.html'
})
export class TrackPage implements OnInit {

    trackData: any;
    barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    
    barChartType:string = 'bar';
    barChartLegend:boolean = true;
    
    weekChartData: any;
    weekTotalCalories: number = 0;

    monthChartData: any;
    monthTotalCalories: number = 0;
    
    yearChartData: any;
    yearTotalCalories: number = 0
    
    constructor(public workoutService: WorkoutService) { }

    ngOnInit() {
        this.workoutService.getTrackData()
            .subscribe((data: any) => {
                this.trackData = data;
                this.createWeekChart();
                this.createMonthChart();
                this.createYearChart();
            });
    }

    createWeekChart() {
        let weekChartLabels: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        let weekChartData: number[] = [];
        
        weekChartLabels.forEach((day: string) => {
            const calories = this.trackData.weekCaloriesBurnt[day] != null ? this.trackData.weekCaloriesBurnt[day] : 0;
            this.weekTotalCalories += calories;
            weekChartData.push(calories);
        });
        this.weekChartData = {
            data: [{ data: weekChartData, label: 'Week Data'}],
            labels: weekChartLabels
        }
    }

    createMonthChart() {
        let monthChartLabels: string[] = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
        let monthChartData: number[] = [];
        monthChartLabels.forEach((week: string) => {
            const calories = this.trackData.monthCaloriesBurnt[week] != null ? this.trackData.monthCaloriesBurnt[week] : 0;
            this.monthTotalCalories += calories;
            monthChartData.push(calories);
        });
        this.monthChartData = {
            data: [{ data: monthChartData, label: 'Month Data'}],
            labels: monthChartLabels
        }
    }

    createYearChart() {
        let yearChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; 
        let yearChartData: number[] = [];
        yearChartLabels.forEach((month: string) => {
            const calories = this.trackData.yearCaloriesBurnt[month] != null ? this.trackData.yearCaloriesBurnt[month] : 0;
            this.yearTotalCalories += calories;
            yearChartData.push(calories);
        });
        this.yearChartData = {
            data: [{ data: yearChartData, label: 'Year Data'}],
            labels: yearChartLabels
        }  
    }
}