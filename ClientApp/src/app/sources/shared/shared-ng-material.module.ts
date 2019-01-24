import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule],
  exports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule],
})
export class MyOwnCustomMaterialModule { }
