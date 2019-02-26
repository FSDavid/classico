import {Component, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';
import {NodeInterface} from '../home/home.component';
import {GetCostumerService} from '../sources/services/getCostumer.service';
import {ActivatedRoute} from '@angular/router';
import {CostumerModel} from '../sources/models/costumer.model';
import {IMyDateModel, IMyInputFieldChanged, INgxMyDpOptions} from 'ngx-mydatepicker';
import { FormBuilder, Validators } from '@angular/forms';
import {UserLinkValidator} from '../sources/validators/userLink.validator';
import {UserEmailValidator} from '../sources/validators/userEmail.validator';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  tabSelected = 0;

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

  userLink: string;
  private sub: any;
  costumerData: CostumerModel = new CostumerModel ('','','','','','','','','','','','',false);
  hasUrl = false;
  isOwner = false;
  age = 0;
  editDateValid = true;
  addDateValid = true;
  fbConnected = true;

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
  editComment = false;
  editName = false;
  addLink = false;
  editLink = false;
  addAge = false;
  editAge = false;
  editEmail = false;
  addNumber = false;
  editNumber = false;
  addTeam = false;
  editTeam = false;
  addClub = false;
  editClub = false;

  userForm = this.fb.group({
    commentAdd: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    commentEdit: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    firstNameEdit: [null,  [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    lastNameEdit: [null,  [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    userLinkAdd: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)], [this.linkValidator.validate.bind(this.linkValidator)] ],
    userLinkEdit: [null,  [Validators.required, Validators.minLength(4), Validators.maxLength(20)], [this.linkValidator.validate.bind(this.linkValidator)] ],
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



  constructor(private getCostumerService: GetCostumerService,
              private route: ActivatedRoute,
              private renderer: Renderer2,
              private fb: FormBuilder,
              private linkValidator: UserLinkValidator,
              private emailValidator: UserEmailValidator,) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userLink = params['username'];

      let birthDate: any;

      this.getCostumerService.getInfo(this.userLink).subscribe(data => {
        this.costumerData = data;
        this.isOwner = this.costumerData.isOwner;

        if (this.costumerData.dateOfBirth) {
          this.calculateAge(this.costumerData.dateOfBirth);
          birthDate = new Date(this.costumerData.dateOfBirth);
          this.userForm.patchValue({
            birthDateEdit: {date: {year: birthDate.getFullYear(),month: birthDate.getMonth() + 1,day: birthDate.getDate()}},
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

}
