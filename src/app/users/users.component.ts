// Core
import { Component, OnInit } from '@angular/core';
// Services
import { UsersService } from './users.service';
// Interfaces
import { User } from './interfaces/user.interface';
import { ApiResponse } from './interfaces/api-response.interface';
import { Alert } from '../shared/components/alert/alert.interface';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    users: User[] = [];

    pageTitle: string = 'My Clerks';
    isLoading: boolean = true;

    alert!: Alert | null;

    constructor(private usersService: UsersService) {}

    ngOnInit(): void {
        // reset alert
        this.alert = null;

        this.usersService.getRandomUsers().subscribe(
            (data: ApiResponse) => {
                this.users = data.results;
                this.isLoading = false;
            },
            (error: any) => {
                this.alert = {
                    message: error,
                    type: 'Error',
                };
            },
        );
    }
}
