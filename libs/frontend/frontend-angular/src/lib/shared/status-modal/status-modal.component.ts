import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { AuthenticationService } from '../../authentication.service';
import { Identity, User } from '@cswf-abiyikli-23/shared/api';
import { BehaviorSubject, Observable, Subject, Subscription, timer } from 'rxjs';
import { IdentityRole } from 'libs/shared/api/src/lib/models/enums';
import { StatusModalService, TStatusModalJob } from './status-modal.service';

@Component({
  selector: 'cswf-abiyikli-23-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.css'],
})
export class StatusModalComponent implements OnInit, OnDestroy
{
  @ViewChild('btnShowModal') btnShowModal: any;
  @ViewChild('btnHideModal') btnHideModal: any;

  title: string = '';
  message: string = '';
  isShowSpinner: boolean = false;
  isClosable: boolean = true;
  timeMax = 12;

  closableTimerSub: Subscription | null = null;

  constructor(private statusModalService: StatusModalService)
  {}

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.statusModalService.statusModal$.subscribe((job: TStatusModalJob) => {
      this.applyJob(job);
    })
  }

  applyJob(job: TStatusModalJob)
  {
    this.closableTimerSub?.unsubscribe();
    
    if (!job.isShow)
    {
      this.hideModal();
    }
    else
    {
      this.showModal();

      this.isClosable = job.isClosable != undefined ? job.isClosable : true;
      this.isShowSpinner = job.isShowSpinner != undefined ? job.isShowSpinner : false;
      this.title = job.title ? job.title : '';
      this.message = job.message ? job.message : '';

      if (!this.isClosable)
      {
        this.closableTimer();
      }
    }
  }

  showModal()
  {
    this.btnShowModal.nativeElement.click();
  }

  hideModal()
  {
    this.btnHideModal.nativeElement.click();
  }

  closableTimer() {
    const source = timer(0, 1000);
    this.closableTimerSub = source.subscribe(val => {
      console.log(val, '-');
      if (val > this.timeMax)
      {
        this.isClosable = true;
        this.isShowSpinner = false;
        this.message = "Something went wrong";
        this.closableTimerSub?.unsubscribe();
      }
    });
  }
}
