import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  user = { login: '', password: '' };
  isLoginMode = true;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (!this.user.login || !this.user.password) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    const url = this.isLoginMode ? '/lab4-1.0/api/auth/login' : '/lab4-1.0/api/auth/register';

    this.http.post(url, this.user).subscribe({
      next: () => {
        if (this.isLoginMode) {
          localStorage.setItem('currentUser', this.user.login);
          this.router.navigate(['/main']);
        } else {
          alert("Регистрация успешна! Теперь вы можете войти.");
          this.isLoginMode = true;
          this.user.password = '';
        }
      },
      error: (err) => {
        console.error(err);
        alert(err.error || (this.isLoginMode ? "Ошибка входа" : "Ошибка регистрации"));
      }
    });
  }
}
