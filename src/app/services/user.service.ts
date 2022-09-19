import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {UserIntegration} from '../models/user-integration'
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  mutation_update_user,
  query_get_user_by_email,
  query_get_employees_by_manager,
  query_get_manager_by_employee,
  query_get_user_intergration,
  mutation_create_user_manager,
  mutation_create_user_employee,
  mutation_delete_user_employee,
  mutation_delete_user_manager,
  mutation_creta_user_intergration
} from '../graphql/users.operations'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _usersSet: BehaviorSubject<User[]>;

  private dataStore: {
    usersSet: User[];
  };

  //this will allow components to subscribe to this behavior subject
  constructor(private http: HttpClient, private apollo: Apollo) {
    this.dataStore = { usersSet: [] };
    this._usersSet = new BehaviorSubject<User[]>([]);
  }

  get usersSet(): Observable<User[]> {
    return this._usersSet.asObservable();
  }

  updateUser(user: User): Promise<User> {
    const updateUserInput ={
        userId: user.userId,
        email: user.email,
        phone: user.phone,
        name: user.name,
    }
    return new Promise((resolver, reject) => {
      this.apollo
        .mutate({
          mutation:mutation_update_user,
          variables: {updateUserInput},
        })
        .subscribe((result: any) => {
          resolver(result.data.user as User);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  getEmployessByManager(managerUserIdStr:String) {
    return (
      this.apollo
        .watchQuery({
          query:query_get_employees_by_manager,
          variables: { managerUserIdStr },
        })
        .valueChanges.subscribe((result: any) => {
          console.log('Result');
          console.log(result.data);
          this.dataStore.usersSet = result.data.usersByUser;
          this._usersSet.next(this.dataStore.usersSet);
        }),
      catchError((error: any) => {
        throw new Error(error);
      })
    );
  }


  getUserByEmail(emailStr: string): Promise<User> {
    return new Promise((resolver, reject) => {
      this.apollo
        .watchQuery({
            query:query_get_user_by_email,
            variables: { emailStr },
        })
        .valueChanges.subscribe((result: any) => {
          resolver(result.data.user);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  getManagerByEmployee(employeeUserIdStr: string): Promise<User> {
    return new Promise((resolver, reject) => {
      this.apollo
        .watchQuery({
            query: query_get_manager_by_employee,
            variables: { employeeUserIdStr },
        })
        .valueChanges.subscribe((result: any) => {
          resolver(result.data.user);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  getUserIntegration(managerUserIdStr:String): Promise<UserIntegration> {
    return new Promise((resolver, reject) => {
      this.apollo
        .watchQuery({
            query: query_get_user_intergration,
            variables: { managerUserIdStr },
        })
        .valueChanges.subscribe((result: any) => {
          resolver(result.data.user);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  createNewUserManager(user: User) {
    const createUserInput ={
      email: user.email,
      phone: user.phone,
      name: user.name,
  }
    return this.apollo.mutate({
      mutation: mutation_create_user_manager ,
      variables: { createUserInput},
    });
  }


  createNewUserEmployee(user: User, managerUserIdStr: string) {
    const createUserInput ={
      email: user.email,
      phone: user.phone,
      name: user.name,
  }
    return this.apollo.mutate({
      mutation: mutation_create_user_employee ,
      variables: { createUserInput ,managerUserIdStr},
    });
  }

  deleteUserEmployee(employeeUserIdStr: string) {
    return this.apollo.mutate({
      mutation: mutation_delete_user_employee,
      variables: { employeeUserIdStr },
    });
  }
  deleteUserManager(managerUserIdStr: string) {
    return this.apollo.mutate({
      mutation: mutation_delete_user_manager,
      variables: { managerUserIdStr },
    });
  }

  createUserIntegration(managerUserIdStr:String): Promise<UserIntegration> {
    return new Promise((resolver, reject) => {
      this.apollo
        .watchQuery({
            query: mutation_creta_user_intergration,
            variables: { managerUserIdStr },
        })
        .valueChanges.subscribe((result: any) => {
          resolver(result.data.user);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }
}