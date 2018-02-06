import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import "rxjs";

@Injectable()
export class QuestionManipulationService {

  public wrongAns: boolean = false;
  public timesUp: boolean = false;
  public headers: Headers = new Headers();
  public domain = "http://10.76.139.18";

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  // get questions to be prompted later on.
  getQuestions(): Observable<any> {
    return this.http.get('../../assets/soceities_questions.json');
  }

  // get a list of top players, requires a limit on the number.
  topPlayers(limit: string): Observable<any> {
    let scoreParam = "limit=" + limit;
    return this.http.post(this.domain + ":3000/leaderboard", scoreParam, { headers: this.headers });
  }

  // set wrong answer flag, when user gets a an answer wrong
  wrongAnswer(): void {
    this.wrongAns = true;
  }

  // return the status of the user after answering a question.
  getWrongAnswerFlag(): boolean {
    return this.wrongAns;
  }

  // reset the answer flag of the current user.
  resetWrongAnswerfFlag(): void {
    this.wrongAns = false;
  }

  // set time's up  flag to true, when time is up.
  setTimesUp(): void {
    this.timesUp = true;
  }

  // return time status for the current user.
  getTimesUp(): boolean {
    return this.timesUp;
  }

  // reset time flag of the current user.
  resetTimesUp(): void {
    this.timesUp = false;
  }

}
