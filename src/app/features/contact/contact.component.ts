import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { PersonalInfo } from '../../core/models/portfolio.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  info$!: Observable<PersonalInfo>;
  contactForm!: FormGroup;
  submitState: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.info$ = this.dataService.getPersonalInfo();
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitState = 'sending';

    // Simulate API call
    setTimeout(() => {
      this.submitState = 'success';
      this.contactForm.reset();
      setTimeout(() => {
        this.submitState = 'idle';
      }, 4000);
    }, 1500);
  }
}
