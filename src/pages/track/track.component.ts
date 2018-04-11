import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';

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
            data: [{ data: weekChartData, label: 'Current Week Calories Burnt'}],
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
            data: [{ data: monthChartData, label: 'Current Month Calories Burnt'}],
            labels: monthChartLabels
        }
    }

    createYearChart() {
        let yearChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 
        let yearChartData: number[] = [];
        yearChartLabels.forEach((month: string, idx: number) => {
            const calories = this.trackData.yearCaloriesBurnt[idx+1] != null ? this.trackData.yearCaloriesBurnt[idx+1] : 0;
            this.yearTotalCalories += calories;
            yearChartData.push(calories);
        });
        this.yearChartData = {
            data: [{ data: yearChartData, label: 'Current Year Calories Burnt'}],
            labels: yearChartLabels
        }  
    }
}