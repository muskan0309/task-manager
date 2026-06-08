import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../models/task.model";

@Injectable({
    providedIn : 'root'
})

export class TaskService {
    private apiUrl = 'http://localhost:5142/api/tasks';

    constructor(private http: HttpClient) { }

    getTasks(): Observable<Task[]> {
         return this.http.get<Task[]>(this.apiUrl);
    }

    createTask(task: Partial<Task>): Observable<Task> {
        return this.http.post<Task>(this.apiUrl, task);
    }

    updateTask(id: number, task: Partial<Task>): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, task);
    }

    deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
