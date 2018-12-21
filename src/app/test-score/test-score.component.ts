import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

export interface ITest{
  id: number;
  testName: string;
    pointsPossible: number;
    pointsReceived: number;
    percentage: number;
    grade: string;
}


@Component({
  selector: 'app-test-score',
  templateUrl: './test-score.component.html',
  styleUrls: ['./test-score.component.css']
})
export class TestScoreComponent implements OnInit {

  tests: Array<any> = [];
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    const savedTests = JSON.parse(localStorage.getItem('tests'));
    if(savedTests && savedTests.length > 0){
      this.tests = savedTests;
    } else{
      this.tests = await this.loadTestFromFile();
    }
    
  
  }

async loadTestFromFile() {
 const tests = await this.http.get('assets/tests.json').toPromise();
 console.log('test-->', tests.json());
 return tests.json();
}

//ADDING TEST FUNCTION
addTest() {
  const newTest: ITest = {
    'id': null,
    'testName': null,
    'pointsPossible': null,
    'pointsReceived': null,
    'percentage': null,
    'grade': null
  };
  this.tests.unshift(newTest); 
//LOCAL STORAGE stuff
  this.saveToLocalStorage('tests', this.tests)

  }
  saveToLocalStorage(key: string, data) {
    localStorage.setItem(key,JSON.stringify(data));

    
  }
  //Delete Test function
  deleteTest(index:number){
    this.tests.splice(index, 1);
    this.saveToLocalStorage('test', this.tests);
  }
}
