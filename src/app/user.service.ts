import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User } from './user';

@Injectable()
export class UserService {

private usersUrl = 'api/users';  // URL to web api
  result:any;
  constructor(private http: Http) { }
  getUsers(): Promise<User[]> {
      return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => response.json().data as User[])
      .catch(this.handleError);
    }
    getUser(id: number): Promise<User> {

        const url = `${this.usersUrl}/${id}`;
        return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as User)
        .catch(this.handleError);
      }
      private headers = new Headers({'Content-Type': 'application/json'});
        create(name: string): Promise<User> {
          return this.http
          .post(this.usersUrl, JSON.stringify({name: name}), {headers: this.headers})
          .toPromise()
          .then(res =>  res.json().data )
          .catch(this.handleError);
        }
        update(user: User): Promise<User> {
          const url = `${this.usersUrl}/${user._id}`;
          return this.http
          .put(url, JSON.stringify(user), {headers: this.headers})
          .toPromise()
          .then(() => user)
          .catch(this.handleError);
        }
        delete(id: number): Promise<void> {
          const url = `${this.usersUrl}/${id}`;
          return this.http.delete(url, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
        }
        // See the "Take it slow" appendix
        getUsersSlowly(): Promise<User[]> {
          return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getUsers()), 2000);
          });
        }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }

}
