import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Admin } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/admin/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  submitted = false
  message: string

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe( (params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please write data'
      } else if (params['authFailed']) {
        this.message = 'Session end. Enter data again'
      }
    })

    this.form = new FormGroup( {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  submit() {
    if(this.form.invalid) {
      return
    }
    this.submitted = true

    const admin: Admin = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(admin).subscribe( () => {
      this.form.reset()
      this.router.navigate(['/admin', 'orders'])
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }

}