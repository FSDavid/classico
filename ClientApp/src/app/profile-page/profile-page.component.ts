import {Component, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';
import {NodeInterface} from '../home/home.component';
import {GetCostumerService} from '../sources/services/getCostumer.service';
import {ActivatedRoute} from '@angular/router';
import {CostumerModel} from '../sources/models/costumer.model';
import {IMyDateModel, IMyInputFieldChanged, INgxMyDpOptions} from 'ngx-mydatepicker';
import { FormBuilder, Validators } from '@angular/forms';
import {UserLinkValidator} from '../sources/validators/userLink.validator';
import {UserEmailValidator} from '../sources/validators/userEmail.validator';
import { UpdateCostumerService } from '../sources/services/updateCostumer.service';
import * as globalStoreActions from '../sources/global-store/global-store.actions';
import * as globalStoreReducer from '../sources/global-store/globalstores.reducers';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  tabSelected = 0;



  userLink: string;
  private sub: any;
  costumerData: CostumerModel = new CostumerModel ('', '', '', '', '', '', '', '', '', '', '', '', '', false);
  hasUrl = false;
  isOwner = false;
  age = 0;
  editDateValid = true;
  addDateValid = true;
  fbConnected = true;

  birthDate: any;


  @ViewChild('AddCommentField') addCommentField: ElementRef;
  @ViewChild('EditCommentField') editCommentField: ElementRef;
  @ViewChild('AddLinkField') addLinkField: ElementRef;
  @ViewChild('EditLinkField') editLinkField: ElementRef;
  @ViewChild('EditFirstNameField') editFirstNameField: ElementRef;
  @ViewChild('EditLastNameField') editLastNameField: ElementRef;
  @ViewChild('AddAgeField') addAgeField: ElementRef;
  @ViewChild('EditAgeField') editAgeField: ElementRef;
  @ViewChild('EditEmailField') editEmailField: ElementRef;
  @ViewChild('AddNumberField') addNumberField: ElementRef;
  @ViewChild('EditNumberField') editNumberField: ElementRef;
  @ViewChild('AddTeamField') addTeamField: ElementRef;
  @ViewChild('EditTeamField') editTeamField: ElementRef;
  @ViewChild('AddClubField') addClubField: ElementRef;
  @ViewChild('EditClubField') editClubField: ElementRef;

  addComment = false;
  errorAddComment = false;
  savingAddComment = false;
  editComment = false;
  errorEditComment = false;
  savingEditComment = false;
  editName = false;
  errorEditName = false;
  savingEditName = false;
  addLink = false;
  errorAddLink = false;
  savingAddLink = false;
  editLink = false;
  errorEditLink = false;
  savingEditLink = false;
  addAge = false;
  errorAddAge = false;
  savingAddAge = false;
  editAge = false;
  errorEditAge = false;
  savingEditAge = false;
  editEmail = false;
  errorEditEmail = false;
  savingEditEmail = false;
  addNumber = false;
  errorAddNumber = false;
  savingAddNumber = false;
  editNumber = false;
  errorEditNumber = false;
  savingEditNumber = false;
  addTeam = false;
  errorAddTeam = false;
  savingAddTeam = false;
  editTeam = false;
  errorEditTeam = false;
  savingEditTeam = false;
  addClub = false;
  errorAddClub = false;
  savingAddClub = false;
  editClub = false;
  errorEditClub = false;
  savingEditClub = false;

  userForm = this.fb.group({
    commentAdd: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    commentEdit: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    firstNameEdit: [null,  [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    lastNameEdit: [null,  [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    userLinkAdd: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('^\\d*[a-zA-Z][a-zA-Z\\d]*$')], [this.linkValidator.validate.bind(this.linkValidator)] ],
    userLinkEdit: [null,  [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('^\\d*[a-zA-Z][a-zA-Z\\d]*$')], [this.linkValidator.validate.bind(this.linkValidator)] ],
    birthDateAdd: [null,  [Validators.required]],
    birthDateEdit: [null,  [Validators.required]],
    emailEdit: [null,  [Validators.required, Validators.email, Validators.maxLength(50)], [this.emailValidator.validate.bind(this.emailValidator)]],
    numberAdd: [null,  [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    numberEdit: [null,  [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    favoriteTeamAdd: [null,  [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    favoriteTeamEdit: [null,  [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    favoriteClubAdd: [null,  [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    favoriteClubEdit: [null,  [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  });
  get f() { return this.userForm.controls; }

  //
  // uploadPhoto(imageInput: any){
  //   const file: File = imageInput.files[0];
  //   const reader = new FileReader();
  //
  //   // console.log(imageInput);
  //   // console.log(imageInput.files[0]);
  //   // reader.addEventListener('load', (event: any) => {
  //
  //
  //     this.updateCostumerService.uploadPicture(file).subscribe(
  //       (res) => {
  //         this.costumerData.pictureUrl = res;
  //         this.store.dispatch(new globalStoreActions.UpdatePicture(res));
  //         console.log('done');
  //         // this.store.dispatch()
  //       },
  //       (err) => {
  //         console.log('error not done');
  //       })
  //   // });
  //
  //
  // }


  uploadPhoto(imageInput: any){
    const file: File = imageInput.files[0];

    this.updateCostumerService.uploadPicture(file).subscribe(
      (res) => {
        this.costumerData.pictureUrl = res;
        this.store.dispatch(new globalStoreActions.UpdatePicture(res));
      },
      (err) => {
        console.log('error not done');
      })


  }


  setFbPicture(){
    this.updateCostumerService.setFbPicture().subscribe(
      (res) => {
        this.costumerData.pictureUrl = this.costumerData.facebookProfilePicture;
        this.store.dispatch(new globalStoreActions.SetFbPicture());
      },
      (err) => {
        console.log('error not done');
      })
  }


  constructor(private getCostumerService: GetCostumerService,
              private route: ActivatedRoute,
              private renderer: Renderer2,
              private fb: FormBuilder,
              private linkValidator: UserLinkValidator,
              private emailValidator: UserEmailValidator,
              private updateCostumerService: UpdateCostumerService,
              private store: Store<globalStoreReducer.GlobalstoresState>) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userLink = params['username'];


      this.getCostumerService.getInfo(this.userLink).subscribe(data => {
        this.costumerData = data;

        // if (!this.costumerData.pictureUrl.startsWith('http')) {
        //   this.costumerData.pictureUrl = '/assets/images/profile_pictures/' + this.costumerData.pictureUrl;
        // }

        this.isOwner = this.costumerData.isOwner;

        if (this.costumerData.dateOfBirth) {
          this.calculateAge(this.costumerData.dateOfBirth);
          this.birthDate = new Date(this.costumerData.dateOfBirth);
          this.userForm.patchValue({
            birthDateEdit: {date: {year: this.birthDate.getFullYear(), month: this.birthDate.getMonth() + 1, day: this.birthDate.getDate()}},
          })
        }

        this.userForm.patchValue({
          commentEdit: this.costumerData.comment,
          firstNameEdit: this.costumerData.firstName,
          lastNameEdit: this.costumerData.lastName,
          userLinkEdit: this.costumerData.userLink,
          emailEdit: this.costumerData.email,
          numberEdit: this.costumerData.phoneNumber,
          favoriteTeamEdit: this.costumerData.favoriteNationalTeam,
          favoriteClubEdit: this.costumerData.favoriteClub,
        });

        const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!pattern.test(this.costumerData.userLink)) {

          this.hasUrl = true;
        } else {
          this.hasUrl = false;
        }




      });
    });


  }


  calculateAge (dateOfBirth: string) {
    const birthDate: any = new Date(dateOfBirth);

    const timeDiff = Math.abs(Date.now() - birthDate);
    this.age = Math.floor((+timeDiff / (1000 * 3600 * 24)) / 365);
  }

  enableCommentEditing () {
    this.editComment = true;
    setTimeout(() =>     {
      this.editCommentField.nativeElement.focus();
    } , 0);
  }

  enableCommentAdding () {
    this.addComment = true;
    setTimeout(() =>     {
      this.addCommentField.nativeElement.focus();
    } , 0);
  }


  enableLinkEditing () {
    this.editLink = true;
    setTimeout(() =>     {
      this.editLinkField.nativeElement.focus();
    } , 0);

  }
  enableLinkAdding () {
    this.addLink = true;
    setTimeout(() =>     {
      this.addLinkField.nativeElement.focus();
    } , 0);
  }

  enableNameEditing () {
    this.editName = true;
    setTimeout(() =>     {
      // this.editFirstNameField.nativeElement.width = (+(+this.editFirstNameField.nativeElement.value.length + 1) * 8) + 'px';


      this.renderer.setStyle(this.editFirstNameField.nativeElement,
        'width',
        (+(+this.editFirstNameField.nativeElement.value.length) * 17 + 20) + 'px');

      this.renderer.setStyle(this.editLastNameField.nativeElement,
        'width',
        (+(+this.editLastNameField.nativeElement.value.length) * 17) + 'px');

      this.editFirstNameField.nativeElement.focus();
    } , 0);
  }

  enableAgeEditing () {
    this.editAge = true;
    setTimeout(() =>     {
      // this.editAgeField.nativeElement.focus();
    } , 0);
  }
  enableAgeAdding () {
    this.addAge = true;
    setTimeout(() =>     {
      // this.addAgeField.nativeElement.focus();
    } , 0);
  }

  enableEmailEditing () {
    this.editEmail = true;
    setTimeout(() =>     {
      this.editEmailField.nativeElement.focus();
    } , 0);
  }

  enableNumberEditing () {
    this.editNumber = true;
    setTimeout(() =>     {
      this.editNumberField.nativeElement.focus();
    } , 0);
  }
  enableNumberAdding () {
    this.addNumber = true;
    setTimeout(() =>     {
      this.addNumberField.nativeElement.focus();
    } , 0);
  }

  enableTeamEditing () {
    this.editTeam = true;
    setTimeout(() =>     {
      this.editTeamField.nativeElement.focus();
    } , 0);
  }
  enableTeamAdding () {
    this.addTeam = true;
    setTimeout(() =>     {
      this.addTeamField.nativeElement.focus();
    } , 0);
  }

  enableClubEditing () {
    this.editClub = true;
    setTimeout(() =>     {
      this.editClubField.nativeElement.focus();
    } , 0);
  }
  enableClubAdding () {
    this.addClub = true;
    setTimeout(() =>     {
      this.addClubField.nativeElement.focus();
    } , 0);
  }

  cancelCommentEdit() {
    this.editComment = false;
    this.userForm.patchValue({ commentEdit: this.costumerData.comment });
  }
  cancelCommentAdd() {
    this.addComment = false;
    this.userForm.patchValue({ commentAdd: null });
  }


  cancelNameEdit() {
    this.editName = false;
    this.userForm.patchValue({ firstNameEdit: this.costumerData.firstName });
    this.userForm.patchValue({ lastNameEdit: this.costumerData.lastName });
  }

  cancelNumberEdit() {
    this.editNumber = false;
    this.userForm.patchValue({ numberEdit: this.costumerData.phoneNumber });
  }
  cancelNumberAdd() {
    this.addNumber = false;
    this.userForm.patchValue({ numberAdd: null });
  }

  cancelLinkEdit() {
    this.editLink = false;
    this.userForm.patchValue({ userLinkEdit: this.costumerData.userLink });
  }
  cancelLinkAdd() {
    this.addLink = false;
    this.userForm.patchValue({ userLinkAdd: null });
  }

  cancelAgeEdit() {
    this.editAge = false;
    this.birthDate = new Date(this.costumerData.dateOfBirth);
    this.userForm.patchValue({birthDateEdit: {date: {year: this.birthDate.getFullYear(), month: this.birthDate.getMonth() + 1, day: this.birthDate.getDate()}}  });
  }
  cancelAgeAdd() {
    this.addAge = false;
    this.userForm.patchValue({ birthDateAdd: null });
  }

  cancelEmailEdit() {
    this.editEmail = false;
    this.userForm.patchValue({ emailEdit: null });
  }

  cancelTeamEdit() {
    this.editTeam = false;
    this.userForm.patchValue({ favoriteTeamEdit: this.costumerData.favoriteNationalTeam});
  }

  cancelTeamAdd() {
    this.addTeam = false;
    this.userForm.patchValue({ favoriteTeamAdd: null });
  }

  cancelClubEdit() {
    this.editClub = false;
    this.userForm.patchValue({ favoriteClubEdit: this.costumerData.favoriteClub });
  }
  cancelClubAdd() {
    this.addClub = false;
    this.userForm.patchValue({ favoriteClubAdd: null });
  }

  editCommentMethod() {
    this.savingEditComment = true;
    this.userForm.controls['commentEdit'].disable();
    this.updateCostumerService.addComment(this.userForm.controls['commentEdit'].value)
      .subscribe(res => {
        this.costumerData.comment = this.userForm.controls['commentEdit'].value;
        this.editComment = false;
        this.hideSavingErrors();
        this.userForm.controls['commentEdit'].enable();
        this.savingEditComment = false;
      }, err => {
        this.errorEditComment = true;
        this.editComment = false;
        this.userForm.patchValue({
          commentEdit: this.costumerData.comment
        });
        this.userForm.controls['commentEdit'].enable();
        this.savingEditComment = false;
      });
  }

  addCommentMethod() {
    this.savingAddComment = true;
    this.userForm.controls['commentAdd'].disable();
    this.updateCostumerService.addComment(this.userForm.controls['commentAdd'].value)
      .subscribe(res => {
        this.costumerData.comment = this.userForm.controls['commentAdd'].value;
        this.userForm.patchValue({ commentEdit: this.costumerData.comment });
        this.addComment = false;
        this.hideSavingErrors();
        this.userForm.controls['commentAdd'].enable();
        this.savingAddComment = false;
      }, err => {
        this.errorAddComment = true;
        this.addComment = false;
        this.userForm.patchValue({ commentAdd: null });
        this.userForm.controls['commentAdd'].enable();
        this.savingEditComment = false;
      });
  }

  editLinkMethod() {
    this.savingEditLink = true;
    this.userForm.controls['userLinkEdit'].disable();
    this.updateCostumerService.addLink(this.userForm.controls['userLinkEdit'].value)
      .subscribe(res => {
        this.costumerData.userLink = this.userForm.controls['userLinkEdit'].value;
        this.editLink = false;
        this.hideSavingErrors();
        this.userForm.controls['userLinkEdit'].enable();
        this.savingEditLink = false;
        this.store.dispatch(new globalStoreActions.UpdateLink(this.costumerData.userLink));
      }, err => {
        this.errorEditLink = true;
        this.editLink = false;
        this.userForm.patchValue({
          userLinkEdit: this.costumerData.userLink
        });
        this.userForm.controls['userLinkEdit'].enable();
        this.savingEditLink = false;
      });
  }

  addLinkMethod() {
    this.savingAddLink = true;
    this.userForm.controls['userLinkAdd'].disable();
    this.updateCostumerService.addLink(this.userForm.controls['userLinkAdd'].value)
      .subscribe(res => {
        this.hasUrl = true;
        this.costumerData.userLink = this.userForm.controls['userLinkAdd'].value;
        this.userForm.patchValue({ userLinkEdit: this.costumerData.userLink });
        this.addLink = false;
        this.hideSavingErrors();
        this.userForm.controls['userLinkAdd'].enable();
        this.savingAddLink = false;
        this.store.dispatch(new globalStoreActions.UpdateLink(this.costumerData.userLink));
      }, err => {
        this.errorAddLink = true;
        this.addLink = false;
        this.userForm.patchValue({ userLinkAdd: null });
        this.userForm.controls['userLinkAdd'].enable();
        this.savingAddLink = false;
      });
  }



  editAgeMethod() {
    this.savingAddAge = true;
    this.userForm.controls['birthDateEdit'].disable();
    this.updateCostumerService.addAge(this.userForm.controls['birthDateEdit'].value.jsdate)
      .subscribe(res => {
        this.costumerData.dateOfBirth = this.userForm.controls['birthDateEdit'].value.jsdate;
        this.editAge = false;
        this.hideSavingErrors();
        this.userForm.controls['birthDateEdit'].enable();
        this.savingEditAge = false;
        this.calculateAge(this.costumerData.dateOfBirth);
      }, err => {
        this.errorEditAge = true;
        this.editAge = false;
        this.birthDate = new Date(this.costumerData.dateOfBirth);
        this.userForm.patchValue({birthDateEdit: {date: {year: this.birthDate.getFullYear(), month: this.birthDate.getMonth() + 1, day: this.birthDate.getDate()}}  });
        this.userForm.controls['birthDateEdit'].enable();
        this.savingEditAge = false;
      });
  }

  addAgeMethod() {
    this.savingAddAge = true;
    this.userForm.controls['birthDateAdd'].disable();
    this.updateCostumerService.addAge(this.userForm.controls['birthDateAdd'].value.jsdate)
      .subscribe(res => {
        this.costumerData.dateOfBirth = this.userForm.controls['birthDateAdd'].value.jsdate;
        this.birthDate = new Date(this.costumerData.dateOfBirth);
        this.userForm.patchValue({birthDateEdit: {date: {year: this.birthDate.getFullYear(), month: this.birthDate.getMonth() + 1, day: this.birthDate.getDate()}}  });
        this.addAge = false;
        this.hideSavingErrors();
        this.userForm.controls['birthDateAdd'].enable();
        this.savingAddAge = false;
        this.calculateAge(this.costumerData.dateOfBirth);
      }, err => {
        this.errorAddAge = true;
        this.addAge = false;
        this.userForm.patchValue({ birthDateAdd: null });
        this.userForm.controls['birthDateAdd'].enable();
        this.savingAddAge = false;
      });
  }


  editEmailMethod() {
    this.savingEditEmail = true;
    this.userForm.controls['emailEdit'].disable();
    this.updateCostumerService.updateEmail(this.userForm.controls['emailEdit'].value)
      .subscribe(res => {
        this.costumerData.email = this.userForm.controls['emailEdit'].value;
        this.editEmail = false;
        this.hideSavingErrors();
        this.userForm.controls['emailEdit'].enable();
        this.savingEditEmail = false;
      }, err => {
        this.errorEditEmail = true;
        this.editEmail = false;
        this.userForm.patchValue({
          emailEdit: this.costumerData.email
        });
        this.userForm.controls['emailEdit'].enable();
        this.savingEditEmail = false;
      });
  }



  editNumberMethod() {
    this.savingEditNumber = true;
    this.userForm.controls['numberEdit'].disable();
    this.updateCostumerService.addNumber(this.userForm.controls['numberEdit'].value)
      .subscribe(res => {
        this.costumerData.phoneNumber = this.userForm.controls['numberEdit'].value;
        this.editNumber = false;
        this.hideSavingErrors();
        this.userForm.controls['numberEdit'].enable();
        this.savingEditNumber = false;
      }, err => {
        this.errorEditNumber = true;
        this.editNumber = false;
        this.userForm.patchValue({
          numberEdit: this.costumerData.phoneNumber
        });
        this.userForm.controls['numberEdit'].enable();
        this.savingEditNumber = false;
      });
  }

  addNumberMethod() {
    this.savingAddNumber = true;
    this.userForm.controls['numberAdd'].disable();
    this.updateCostumerService.addNumber(this.userForm.controls['numberAdd'].value)
      .subscribe(res => {
        this.costumerData.phoneNumber = this.userForm.controls['numberAdd'].value;
        this.userForm.patchValue({ numberEdit: this.costumerData.phoneNumber});
        this.addNumber = false;
        this.hideSavingErrors();
        this.userForm.controls['numberAdd'].enable();
        this.savingAddNumber = false;
      }, err => {
        this.errorAddNumber = true;
        this.addNumber = false;
        this.userForm.patchValue({ numberAdd: null });
        this.userForm.controls['numberAdd'].enable();
        this.savingAddNumber = false;
      });
  }


  editTeamMethod() {
    this.savingEditTeam = true;
    this.userForm.controls['favoriteTeamEdit'].disable();
    this.updateCostumerService.addTeam(this.userForm.controls['favoriteTeamEdit'].value)
      .subscribe(res => {
        this.costumerData.favoriteNationalTeam = this.userForm.controls['favoriteTeamEdit'].value;
        this.editTeam = false;
        this.hideSavingErrors();
        this.userForm.controls['favoriteTeamEdit'].enable();
        this.savingEditTeam = false;
      }, err => {
        this.errorEditTeam = true;
        this.editTeam = false;
        this.userForm.patchValue({ favoriteTeamEdit: this.costumerData.favoriteNationalTeam });
        this.userForm.controls['favoriteTeamEdit'].enable();
        this.savingEditTeam = false;
      });
  }

  addTeamMethod() {
    this.savingAddTeam = true;
    this.userForm.controls['favoriteTeamAdd'].disable();
    this.updateCostumerService.addTeam(this.userForm.controls['favoriteTeamAdd'].value)
      .subscribe(res => {
        this.costumerData.favoriteNationalTeam = this.userForm.controls['favoriteTeamAdd'].value;
        this.userForm.patchValue({ favoriteTeamEdit: this.costumerData.favoriteNationalTeam });
        this.addTeam = false;
        this.hideSavingErrors();
        this.userForm.controls['favoriteTeamAdd'].enable();
        this.savingAddTeam = false;
      }, err => {
        this.errorAddTeam = true;
        this.addTeam = false;
        this.userForm.patchValue({ favoriteTeamAdd: null });
        this.userForm.controls['favoriteTeamAdd'].enable();
        this.savingEditTeam = false;
      });
  }



  editClubMethod() {
    this.savingEditClub = true;
    this.userForm.controls['favoriteClubEdit'].disable();
    this.updateCostumerService.addClub(this.userForm.controls['favoriteClubEdit'].value)
      .subscribe(res => {
        this.costumerData.favoriteClub = this.userForm.controls['favoriteClubEdit'].value;
        this.editClub = false;
        this.hideSavingErrors();
        this.userForm.controls['favoriteClubEdit'].enable();
        this.savingEditClub = false;
      }, err => {
        this.errorEditClub = true;
        this.editClub = false;
        this.userForm.patchValue({ favoriteClubEdit: this.costumerData.favoriteClub });
        this.userForm.controls['favoriteClubEdit'].enable();
        this.savingEditClub = false;
      });
  }

  addClubMethod() {
    this.savingAddClub = true;
    this.userForm.controls['favoriteClubAdd'].disable();
    this.updateCostumerService.addClub(this.userForm.controls['favoriteClubAdd'].value)
      .subscribe(res => {
        this.costumerData.favoriteClub = this.userForm.controls['favoriteClubAdd'].value;
        this.userForm.patchValue({ favoriteClubEdit: this.costumerData.favoriteClub });
        this.addClub = false;
        this.hideSavingErrors();
        this.userForm.controls['favoriteClubAdd'].enable();
        this.savingAddClub = false;
      }, err => {
        this.errorAddClub = true;
        this.addClub = false;
        this.userForm.patchValue({ favoriteClubAdd: null });
        this.userForm.controls['favoriteClubAdd'].enable();
        this.savingEditClub = false;
      });
  }

  updateName() {
    if (this.userForm.controls['firstNameEdit'].value !== this.costumerData.firstName && this.userForm.controls['lastNameEdit'].value !== this.costumerData.lastName) {
      this.updateFullName();
    } else if (this.userForm.controls['firstNameEdit'].value !== this.costumerData.firstName && this.userForm.controls['lastNameEdit'].value === this.costumerData.lastName ) {
      this.updateFirstName();
    } else if (this.userForm.controls['firstNameEdit'].value === this.costumerData.firstName && this.userForm.controls['lastNameEdit'].value !== this.costumerData.lastName ) {
      this.updateLastName();
    }
  }

  updateFirstName() {
    this.savingEditName = true;
    this.userForm.controls['firstNameEdit'].disable();
    this.userForm.controls['lastNameEdit'].disable();
    this.updateCostumerService.updateFirstName(this.userForm.controls['firstNameEdit'].value)
      .subscribe(res => {
        this.costumerData.firstName = this.userForm.controls['firstNameEdit'].value;
        this.editName = false;
        this.hideSavingErrors();
        this.userForm.controls['firstNameEdit'].enable();
        this.userForm.controls['lastNameEdit'].enable();
        this.savingEditName = false;
        this.store.dispatch(new globalStoreActions.UpdateFirstName(this.costumerData.firstName));
      }, err => {
        this.errorEditName = true;
        this.editName = false;
        this.userForm.patchValue({ firstNameEdit: this.costumerData.firstName });
        this.userForm.controls['firstNameEdit'].enable();
        this.userForm.controls['lastNameEdit'].enable();
        this.savingEditName = false;
      });
  }
  updateLastName() {
    this.savingEditName = true;
    this.userForm.controls['firstNameEdit'].disable();
    this.userForm.controls['lastNameEdit'].disable();
    this.updateCostumerService.updateLastName(this.userForm.controls['lastNameEdit'].value)
      .subscribe(res => {
        this.costumerData.lastName = this.userForm.controls['lastNameEdit'].value;
        this.editName = false;
        this.hideSavingErrors();
        this.userForm.controls['firstNameEdit'].enable();
        this.userForm.controls['lastNameEdit'].enable();
        this.savingEditName = false;
        this.store.dispatch(new globalStoreActions.UpdateLastName(this.costumerData.lastName));
      }, err => {
        this.errorEditName = true;
        this.editName = false;
        this.userForm.patchValue({ lastNameEdit: this.costumerData.lastName });
        this.userForm.controls['firstNameEdit'].enable();
        this.userForm.controls['lastNameEdit'].enable();
        this.savingEditName = false;
      });
  }
  updateFullName() {
    this.savingEditName = true;
    this.userForm.controls['firstNameEdit'].disable();
    this.userForm.controls['lastNameEdit'].disable();
    this.updateCostumerService.updateFullName(this.userForm.controls['firstNameEdit'].value, this.userForm.controls['lastNameEdit'].value)
      .subscribe(res => {
        this.costumerData.firstName = this.userForm.controls['firstNameEdit'].value;
        this.costumerData.lastName = this.userForm.controls['lastNameEdit'].value;
        this.editName = false;
        this.hideSavingErrors();
        this.userForm.controls['firstNameEdit'].enable();
        this.userForm.controls['lastNameEdit'].enable();
        this.savingEditName = false;
        this.store.dispatch(new globalStoreActions.UpdateFirstName(this.costumerData.firstName));
        this.store.dispatch(new globalStoreActions.UpdateLastName(this.costumerData.lastName));
      }, err => {
        this.errorEditName = true;
        this.editName = false;
        this.userForm.patchValue({ lastNameEdit: this.costumerData.lastName });
        this.userForm.patchValue({ firstNameEdit: this.costumerData.firstName });
        this.userForm.controls['firstNameEdit'].enable();
        this.userForm.controls['lastNameEdit'].enable();
        this.savingEditName = false;
      });
  }



  hideSavingErrors() {
    this.errorAddComment = false;
    this.errorEditComment = false;
    this.errorEditName = false;
    this.errorAddLink = false;
    this.errorEditLink = false;
    this.errorAddAge = false;
    this.errorEditAge = false;
    this.errorEditEmail = false;
    this.errorAddNumber = false;
    this.errorEditNumber = false;
    this.errorAddTeam = false;
    this.errorEditTeam = false;
    this.errorAddClub = false;
    this.errorEditClub = false;
  }


  myOptions: INgxMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
  };

  onDateChanged(event: IMyDateModel): void {
    // date selected
  }

  onInputFieldChanged(event: IMyInputFieldChanged, action: string) {
    if (action === 'edit') {
      this.editDateValid = event.valid;
    } else if (action === 'add') {
      this.addDateValid = event.valid;
    }
  }



  nodes: NodeInterface[] = [{
    nodeId: '', mainTag: 'FC Barcelona',
    nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
    nodeImage: 'https://cdn.images.dailystar.co.uk/dynamic/58/photos/678000/620x/Barcelona-news-743557.jpg?r=5bf3e115c4f36'
  },
    {
      nodeId: '', mainTag: 'მადრიდის რეალი',
      nodeTitle: 'სანტიაგო სოლარიმ „რომასთან“ მატჩის წინ პრესკონფერენცია გამართა....',
      nodeImage: 'https://gdb.voanews.com/A7EF5C68-409F-4E94-9FB2-18EA106E45A5_w1023_r1_s.jpg'
    },
    {
      nodeId: '', mainTag: 'Manchester United',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://metrouk2.files.wordpress.com/2018/09/sei_25881790-5f45-e1536572956559.jpg?quality' +
      '=90&strip=all&zoom=1&resize=644%2C443'
    },
    {
      nodeId: '', mainTag: 'FC Barcelona',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://e0.365dm.com/18/11/768x432/skysports-arthur-melo-arthur_4493328.jpg?20181120140154'
    },
    {
      nodeId: '', mainTag: 'Real Madrid',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://i.ytimg.com/vi/VJ5H2n5gaV0/maxresdefault.jpg'
    },{
      nodeId: '', mainTag: 'მადრიდის რეალი',
      nodeTitle: 'სანტიაგო სოლარიმ „რომასთან“ მატჩის წინ პრესკონფერენცია გამართა....',
      nodeImage: 'https://gdb.voanews.com/A7EF5C68-409F-4E94-9FB2-18EA106E45A5_w1023_r1_s.jpg'
    },
    {
      nodeId: '', mainTag: 'Manchester United',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://metrouk2.files.wordpress.com/2018/09/sei_25881790-5f45-e1536572956559.jpg?quality' +
      '=90&strip=all&zoom=1&resize=644%2C443'
    },
    {
      nodeId: '', mainTag: 'FC Barcelona',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://e0.365dm.com/18/11/768x432/skysports-arthur-melo-arthur_4493328.jpg?20181120140154'
    },
    {
      nodeId: '', mainTag: 'Real Madrid',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://i.ytimg.com/vi/VJ5H2n5gaV0/maxresdefault.jpg'
    },{
      nodeId: '', mainTag: 'მადრიდის რეალი',
      nodeTitle: 'სანტიაგო სოლარიმ „რომასთან“ მატჩის წინ პრესკონფერენცია გამართა....',
      nodeImage: 'https://gdb.voanews.com/A7EF5C68-409F-4E94-9FB2-18EA106E45A5_w1023_r1_s.jpg'
    },
    {
      nodeId: '', mainTag: 'Manchester United',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://metrouk2.files.wordpress.com/2018/09/sei_25881790-5f45-e1536572956559.jpg?quality' +
      '=90&strip=all&zoom=1&resize=644%2C443'
    },
    {
      nodeId: '', mainTag: 'FC Barcelona',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://e0.365dm.com/18/11/768x432/skysports-arthur-melo-arthur_4493328.jpg?20181120140154'
    },
    {
      nodeId: '', mainTag: 'Real Madrid',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://i.ytimg.com/vi/VJ5H2n5gaV0/maxresdefault.jpg'
    },{
      nodeId: '', mainTag: 'მადრიდის რეალი',
      nodeTitle: 'სანტიაგო სოლარიმ „რომასთან“ მატჩის წინ პრესკონფერენცია გამართა....',
      nodeImage: 'https://gdb.voanews.com/A7EF5C68-409F-4E94-9FB2-18EA106E45A5_w1023_r1_s.jpg'
    },
    {
      nodeId: '', mainTag: 'Manchester United',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://metrouk2.files.wordpress.com/2018/09/sei_25881790-5f45-e1536572956559.jpg?quality' +
      '=90&strip=all&zoom=1&resize=644%2C443'
    },
    {
      nodeId: '', mainTag: 'FC Barcelona',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://e0.365dm.com/18/11/768x432/skysports-arthur-melo-arthur_4493328.jpg?20181120140154'
    },
    {
      nodeId: '', mainTag: 'Real Madrid',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://i.ytimg.com/vi/VJ5H2n5gaV0/maxresdefault.jpg'
    },{
      nodeId: '', mainTag: 'მადრიდის რეალი',
      nodeTitle: 'სანტიაგო სოლარიმ „რომასთან“ მატჩის წინ პრესკონფერენცია გამართა....',
      nodeImage: 'https://gdb.voanews.com/A7EF5C68-409F-4E94-9FB2-18EA106E45A5_w1023_r1_s.jpg'
    },
    {
      nodeId: '', mainTag: 'Manchester United',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://metrouk2.files.wordpress.com/2018/09/sei_25881790-5f45-e1536572956559.jpg?quality' +
      '=90&strip=all&zoom=1&resize=644%2C443'
    },
    {
      nodeId: '', mainTag: 'FC Barcelona',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://e0.365dm.com/18/11/768x432/skysports-arthur-melo-arthur_4493328.jpg?20181120140154'
    },
    {
      nodeId: '', mainTag: 'Real Madrid',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://i.ytimg.com/vi/VJ5H2n5gaV0/maxresdefault.jpg'
    },{
      nodeId: '', mainTag: 'მადრიდის რეალი',
      nodeTitle: 'სანტიაგო სოლარიმ „რომასთან“ მატჩის წინ პრესკონფერენცია გამართა....',
      nodeImage: 'https://gdb.voanews.com/A7EF5C68-409F-4E94-9FB2-18EA106E45A5_w1023_r1_s.jpg'
    },
    {
      nodeId: '', mainTag: 'Manchester United',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://metrouk2.files.wordpress.com/2018/09/sei_25881790-5f45-e1536572956559.jpg?quality' +
      '=90&strip=all&zoom=1&resize=644%2C443'
    },
    {
      nodeId: '', mainTag: 'FC Barcelona',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://e0.365dm.com/18/11/768x432/skysports-arthur-melo-arthur_4493328.jpg?20181120140154'
    },
    {
      nodeId: '', mainTag: 'Real Madrid',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://i.ytimg.com/vi/VJ5H2n5gaV0/maxresdefault.jpg'
    },{
      nodeId: '', mainTag: 'მადრიდის რეალი',
      nodeTitle: 'სანტიაგო სოლარიმ „რომასთან“ მატჩის წინ პრესკონფერენცია გამართა....',
      nodeImage: 'https://gdb.voanews.com/A7EF5C68-409F-4E94-9FB2-18EA106E45A5_w1023_r1_s.jpg'
    },
    {
      nodeId: '', mainTag: 'Manchester United',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://metrouk2.files.wordpress.com/2018/09/sei_25881790-5f45-e1536572956559.jpg?quality' +
      '=90&strip=all&zoom=1&resize=644%2C443'
    },
    {
      nodeId: '', mainTag: 'FC Barcelona',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://e0.365dm.com/18/11/768x432/skysports-arthur-melo-arthur_4493328.jpg?20181120140154'
    },
    {
      nodeId: '', mainTag: 'Real Madrid',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://i.ytimg.com/vi/VJ5H2n5gaV0/maxresdefault.jpg'
    },{
      nodeId: '', mainTag: 'მადრიდის რეალი',
      nodeTitle: 'სანტიაგო სოლარიმ „რომასთან“ მატჩის წინ პრესკონფერენცია გამართა....',
      nodeImage: 'https://gdb.voanews.com/A7EF5C68-409F-4E94-9FB2-18EA106E45A5_w1023_r1_s.jpg'
    },
    {
      nodeId: '', mainTag: 'Manchester United',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://metrouk2.files.wordpress.com/2018/09/sei_25881790-5f45-e1536572956559.jpg?quality' +
      '=90&strip=all&zoom=1&resize=644%2C443'
    },
    {
      nodeId: '', mainTag: 'FC Barcelona',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://e0.365dm.com/18/11/768x432/skysports-arthur-melo-arthur_4493328.jpg?20181120140154'
    },
    {
      nodeId: '', mainTag: 'Real Madrid',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://i.ytimg.com/vi/VJ5H2n5gaV0/maxresdefault.jpg'
    },
  ];

}
