import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from '../utils/Validation';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title = 'p2p-form-2';
  passwordType: string = 'password';
  passwordTypeConfirm: string = 'password';
  visible:boolean = false;
  options:string = 'Трейдер';
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;
  @ViewChild('toggleButton') toggleButton: ElementRef | undefined;
  @ViewChild('menu') menu: ElementRef | undefined;

  constructor(private formBuilder: FormBuilder, private renderer: Renderer2) {
    this.renderer.listen('window', 'click',(e:Event)=>{
      
       if(e.target !== this.toggleButton?.nativeElement && e.target!==this.menu?.nativeElement){
           this.visible = false
       }
   });  
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {

    this.submitted = true;

    console.log('test');

    if (this.form.invalid) {
      console.log(this.form.controls['email'].errors)
      console.log(this.form.controls['password'].errors)
      console.log(this.form.controls['confirmPassword'].errors)
      return;
    }

    console.log(this.form.controls['password']);

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  handleShowPassword(): void {
      this.passwordType = 'text';
      const tm = setTimeout(() => {
        this.passwordType = 'password';
        clearTimeout(tm);
      }, 1000)

  }

  handleShowPasswordConfirm(): void {
    this.passwordTypeConfirm = 'text';
    const tm = setTimeout(() => {
      this.passwordTypeConfirm = 'password';
      clearTimeout(tm);
    }, 1000)

    
  }
  toggleSelect(): void {
    this.visible = !this.visible
  }

  setOption(opt: string) {
    this.options = opt;
  }

  getCheckboxVal(str: string): boolean {
    return str === this.options;
  }

}
