import { Injectable, inject } from '@angular/core';
import {Observable} from "rxjs";
import {Employee} from "../model/employee";
import { CollectionReference, Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private firestore: Firestore = inject(Firestore);
  private employees: Observable<readonly Employee[]> = collectionData(collection(this.firestore, 'employees') as CollectionReference<Employee & { id: string }>, {idField: 'id'});

  get $(): Observable<readonly Employee[]> {
    return this.employees;
  }

  async addEmployee(employee: Employee) {
    await addDoc(collection(this.firestore, 'employees'), employee.toJSON());
    return true;
  }
}
