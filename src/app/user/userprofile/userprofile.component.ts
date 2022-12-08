import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'
// import * as $ from 'JQuery';
declare var $: any;
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AjaxService } from 'src/providers/ajax.service';
import { ErrorToast, Toast } from 'src/providers/common.service';
import { iNavigation } from 'src/providers/iNavigation';
import { autoCompleteModal, IautocompleteComponent } from '../iautocomplete/iautocomplete.component';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  model: NgbDateStruct;
  keySkillsList: Array<any> = [];
  modelWorkedTill: NgbDateStruct;
  isCurrentCompany:boolean=true;
  addKeySkillForm:FormGroup;
  addEmploymentForm:FormGroup;
  addEducationForm:FormGroup;
  addProjectForm:FormGroup;
  addItSkillsForm:FormGroup;
  addProfileSummaryForm:FormGroup;
  onlineProfileForm:FormGroup;
  workSampleForm: FormGroup;
  researchPublicationForm: FormGroup;
  presentationForm: FormGroup;
  patentForm: FormGroup;
  certificationForm: FormGroup;
  keySkillData:keySkill = new keySkill();
  keySkillId: number=0;
  keySkillDataArr: Array <keySkill> = [];
  employmentDetailId: number=0;
  employmentData:EmploymentDetail=new EmploymentDetail();
  employmentDataArr: Array <EmploymentDetail> = [];
  educationData:EducationalDetail=new EducationalDetail();
  educationDataArr: Array <EducationalDetail> = [];
  projectData:ProjectDetail=new ProjectDetail();
  projectDetailId: number=0;
  projectDataArr: Array <ProjectDetail> = [];
  itSkillsData: ItSkills=new ItSkills();
  ItSkillsDataArr: Array <ItSkills> = [];
  educationalDetailId: number=0;
  itSkillId: number=0;
  profileSummaryData: ProfileSummary=new ProfileSummary();
  profileSummaryDataArr: Array<ProfileSummary> = [];
  onlineProfileData: OnlineProfile=new OnlineProfile();
  onlineProfileId: number=0;
  onlineProfileDataArr: Array<OnlineProfile> = [];
  workSampleData: WorkSample = new WorkSample();
  workSampleId: number=0;
  workSampleDataArr: Array<WorkSample> = [];
  researchPublicationData: ResearchPublication = new ResearchPublication();
  researchPublicationId: number = 0;
  researchPublicationDataArr: Array<ResearchPublication> = [];
  presentationData: Presentation = new Presentation();
  presentationId: number = 0;
  presentationDataArr: Array<Presentation> = [];
  patentData: Patent = new Patent();
  patentId: number = 0;
  patentDataArr: Array<Patent> = [];
  certificationData: Certification = new Certification();
  certificationDataArr: Array<Certification> = [];
  isServingNoticePeriod: boolean=false;
  education: autoCompleteModal = null;
  course: autoCompleteModal=null;
  specialization: autoCompleteModal=null;
  specializationData: Array<any> = [];
  courseData: Array<any> = [];
  educationQualification:any={
    below10th :false,
    tenth :false,
    twelve : false,
    graduation : false,
    masters : false,
    doctoratePhD : false
  };
  board: autoCompleteModal=null;
  educationListData: Array<any> = [];
  passingOutYear: Array<any>= [];
  lastUsedItSkill: Array<any>=[];
  experienceYearsValue: Array<any>=[];
  monthExperienceValue: Array<any>=[];
  workedFromYrs: Array<any>=[];
  workedTillYrs: Array<any>=[];
  teamSizeNumber: Array<any>=[];
  userId: number=0;
  isPageReady: boolean = false;

  constructor(private modalService: NgbModal,
              private fb:FormBuilder,
              private http:AjaxService,
              private nav:iNavigation) { }
  
  private keySkillModalReference;
  private emloymentModalReference;
   private educationModalReference;
   private itSkillsModalReference;
   private projectsModalReference;
   private profileSummaryReference;
   private onlineProfileReference;
   private workSampleReference;
   private researchPublicationReference;
   private presentationReference;
   private patentReference;
   private certificationReference;
   private careerProfileReference;
   private personalDetailReference;
   

  ngOnInit(): void {
    let currentYear = new Date().getFullYear();
    for(let i=1970; i <= currentYear; i++){
      this.passingOutYear.push(i);
    }

    for(let i=2000; i <= currentYear; i++){
      this.lastUsedItSkill.push(i);
    }

    for(let i=0; i <= 30; i++){
      this.experienceYearsValue.push(i);
    }

    for(let i=0; i <= 11; i++){
      this.monthExperienceValue.push(i);
    }

    for(let i=1970; i <= currentYear; i++){
      this.workedFromYrs.push(i);
    }

    for(let i=1970; i<= currentYear; i++){
      this.workedTillYrs.push(i);
    }

    for(let i=0; i<= 100; i++){
      this.teamSizeNumber.push(i);
    }


    this.educationListData = [];
    this.education = new autoCompleteModal();
    this.education.data = [];
    this.education.className='';
    this.education.placeholder = "Select Education";
    this.loadEducationList();
    
    this.course = new autoCompleteModal();
    this.course.data = [];
    this.course.className='';
    this.course.placeholder = "Select Course";
    
                    
    this.specialization = new autoCompleteModal();
    this.specialization.data = [];
    this.specialization.className='';
    this.specialization.placeholder = "Select Specialization";

    this.board = new autoCompleteModal();
    this.board.data = [];
    this.board.className='';
    this.board.placeholder = "Select board";
    this.loadBoard();
                    
    let data = this.nav.getValue();
    if(data){
      this.employmentDetailId = data.userId;
      this.userId =  data.userId;
      this.loadAllData();
      this.initAddEmploymentForm();
      this.initAddEducationForm();
      this.initAddProjectForm();
      this.initAddProfileSummaryForm();
      this.initAddKeySkillForm();
      this.initOnlineProfileForm();
    }
    else
    ErrorToast("please login again..")
    
  }

  createKeySkillData(){
    let value = this.addKeySkillForm.value;
    value.keySkillData = '';
    value.keySkillData=this.keySkillsList;
    console.log(value);
    this.http.post(`KeySkill/addKeySkill/${this.userId}`, value).then(Response => {
      if(Response.responseBody){
        this.keySkillData = Response.responseBody;
        Toast("Record inserted");
      }
    })
  }

  createEmploymentData(){
    let finalAmount = Number(this.addEmploymentForm.get('inLacs').value) + Number(this.addEmploymentForm.get('inThousand').value);
    this.addEmploymentForm.get('currentAnnualSalary').setValue(finalAmount);
    let value = this.addEmploymentForm.value;
    this.http.post("EmploymentDetail/addEmploymentDetail", value).then(Response => {
      if(Response.responseBody){
        this.employmentData=Response.responseBody;
        Toast("Record found");
        
      }
    })
  }

  createEducationData(){
    let value = this.addEducationForm.value;
    console.log(value);
    this.http.post("EducationalDetail/addEducationalDetail", value).then(Response => {
      if(Response.responseBody){
        this.educationData=Response.responseBody;
        Toast("Record Found");
      }
    })
  }

  createItSkillsData(){
    let value = this.addItSkillsForm.value;
    console.log(value);
    this.http.post("ItSkills/addItSkill", value).then(Response =>{
      if(Response.responseBody){
        this.itSkillsData=Response.responseBody;
        Toast("Record inserted"); 
      }
    })
  }

  createProjectData(){
    let value = this.addProjectForm.value;
    this.http.post("ProjectDetail/addProjectDetail", value).then(Response => {
      if(Response.responseBody){
        this.projectData=Response.responseBody;
        Toast("Record inserted");

      }
    })
  }

  createProfileSummaryData(){
    let value = this.addProfileSummaryForm.value;
    this.http.post("ProfileSummary/addProfileSummary", value).then(Response => {
      if(Response.responseBody){
        this.profileSummaryData = Response.responseBody;
        Toast("Record inserted")
      }
    })
  }

  createOnlineProfileData(){
    let value = this.onlineProfileForm.value;
    this.http.post("OnlineProfile/addOnlineProfile", value).then(Response => {
      if(Response.responseBody){
        this.profileSummaryData = Response.responseBody;
        Toast("Record inserted")
      }
    })
  }

  createWorkSampleData(){
    let value = this.workSampleForm.value;
    this.http.post("WorkSample/addWorkSample", value).then(Response => {
      if(Response.responseBody){
        this.workSampleData = Response.responseBody;
        Toast("Record inserted")
      }
    })
  }

  createResearchPublication(){
    let value = this.researchPublicationForm.value;
    this.http.post("ResearchPublication/addResearchPublication", value).then(Response => {
      if(Response.responseBody){
        this.researchPublicationData = Response.responseBody;
        Toast("Record inserted")
      }
    })
  }

  createPresentation(){
    let value = this.presentationForm.value;
    this.http.post("Presentation/addPresentation", value).then(Response => {
      if(Response.responseBody){
        this.presentationData = Response.responseBody;
        Toast("Record inserted in Presentation")
      }
    })
  }

  createPatent(){
    let value = this.patentForm.value;
    this.http.post("Patent/addPatent", value).then(Response => {
      if(Response.responseBody){
        this.patentData = Response.responseBody;
        Toast("Record inserted in Patent")
      }
    })
  }


  selectEducation(e: any){
    let data = e;
    this.course = new autoCompleteModal();
    this.course.className='';
    this.course.placeholder = "Select Course";
    this.course.data = [];
    this.educationQualification={
      below10th :false,
      tenth :false,
      twelve : false,
      graduation : false,
      masters : false,
      doctoratePhD : false
    };
    if(data > 3){
      let filterData = this.educationListData.filter(x => x.childId == data);
      for (let i = 0; i < filterData.length; i++) {
        let courseData = {value: filterData[i].educationListId, text: filterData[i].educationNameValue};
        this.course.data.push(courseData)
      }
    }
    switch (data) {
      case 1:
        this.educationQualification.below10th=true;
      break;
      case 2:
        this.educationQualification.tenth=true;
      break;
      case 3:
        this.educationQualification.twelve=true;
      break;
      case 4:
        this.educationQualification.graduation=true;
      break;
      case 5:
        this.educationQualification.masters=true;
      break;
      case 6:
        this.educationQualification.doctoratePhD=true;
      break;
    }
  }

  selectCourse(e : any){
    let data = e;
    this.specialization = new autoCompleteModal();
    this.specialization.data = [];
    this.specialization.className='';
    this.specialization.placeholder = "Select Specialization";
      let filterData = this.educationListData.filter(x => x.childId == data);
      for (let i = 0; i < filterData.length; i++){
        let specializationData = {value: filterData[i].educationListId, text: filterData[i].educationNameValue};
        this.specialization.data.push(specializationData)
      }
 
    }
  
          // this.initAddEmploymentForm();
          // if(this.employmentData.currentAnnualSalary>0){
          //               let income = this.employmentData.currentAnnualSalary;
          //                 if(income > 100000){
          //                 let value = ((income/100000).toFixed(2)).toString();
          //                 let data = value.split('.')
          //                 this.addEmploymentForm.get('inLacs').setValue(data[0]);
          //                 this.addEmploymentForm.get('inThousand').setValue(data[1]);
          //               }
          //             }          
          // let date = new Date(this.employmentData.joiningDate);
          // this.model = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()};
  

  loadAllData(){
    this.isPageReady=false;
    if(this.userId>0){
      this.http.get(`CommonController/getLoadAllDetailByUserId/${this.userId}`).then(Response => {
        if(Response.responseBody){
          this.keySkillData = Response.responseBody.keySkillResult;
          this.employmentDataArr = Response.responseBody.employmentDetailResult;
          this.educationDataArr = Response.responseBody.educationDetailResult;
          this.projectDataArr = Response.responseBody.projectDetailResult;
          this.ItSkillsDataArr = Response.responseBody.itSkillsResult;
          this.profileSummaryDataArr = Response.responseBody.profileSummaryResult;
          this.onlineProfileDataArr = Response.responseBody.onlineProfileResult;
          this.workSampleDataArr = Response.responseBody.workSampleResult;
          this.researchPublicationDataArr = Response.responseBody.researchPublicationResult;
          this.presentationDataArr = Response.responseBody.presentationResult;
          this.patentDataArr = Response.responseBody.patentResult;
          this.initAddKeySkillForm();
          this.initAddEmploymentForm();
          this.initAddEducationForm();
          this.initAddProjectForm();
          this.initAddItSkillForm();
          this.initAddProfileSummaryForm();
          this.initOnlineProfileForm();
          this.initWorkSampleForm();
          this.initResearchPublicationForm();
          this.initPresentationForm();
          this.initPatentForm();
          this.isPageReady = true;
        }
      })
    }
  }

loadEducationList(){
  this.http.get(`EducationList/getAllEducationList`).then(Response => {
    if(Response.responseBody){
      this.educationListData=Response.responseBody;
    }
  })
}

loadBoard(){
  this.http.get(`Board/getAllBoard`).then(Response => {
    if(Response.responseBody){
      let data = Response.responseBody;
      for (let i = 0; i < data.length; i++) {
        let boardData = {value: data[i].boardId, text: data[i].boardName};
        this.board.data.push(boardData)
      }
    }
  })
}

keySkillUpdatePopUp(item: keySkill, content: any){
  if(item != null){
    this.keySkillId = item.keySkillId;
    this.keySkillData = item;
    this.initAddKeySkillForm();
    this.keySkillModalReference = this.modalService.open(content,{ size: 'lg' });
  }
}

employmentUpdatePopUp(item: EmploymentDetail, content: any){
  if(item != null){
    this.employmentDetailId = item.employmentDetailId;
    this.employmentData = item;
    this.initAddEmploymentForm();
    this.emloymentModalReference = this.modalService.open(content,{ size: 'lg' });
  }

}

updateKeySkillData(){
  let value = this.addKeySkillForm.value;
  value.keySkill = '';
  value.keySkillData=this.keySkillsList;
  this.http.put(`KeySkill/ByKeySkillId/${this.keySkillData.keySkillId}`, value).then(res => {
    if(res.responseBody){
      this.keySkillData = res.responseBody;
      console.log(this.keySkillData);
      this.initAddKeySkillForm();
    }
  })
}

updateEmploymentData(){
  let value = this.addEmploymentForm.value;
  this.http.put(`EmploymentDetail/updateEmploymentDetail/${this.employmentDetailId}`, value).then(res =>{
    if(res.responseBody){
      this.employmentData=res.responseBody;
      console.log(this.employmentData);
      this.initAddEmploymentForm();
    }
  })
}

  updateEducationData(){
    let value = this.addEmploymentForm.value;
    this.http.put(`EducationalDetail/updateEducationalDetail/${this.educationalDetailId}`, value).then(res => {
      if(res.responseBody){
        this.educationData=res.responseBody;
        console.log(this.educationData);
        this.initAddEducationForm();
      }
    })
  }

  updateItSkillsData(){
    let value = this.addItSkillsForm.value;
    this.http.put(`ItSkills/updateItSkills/${this.itSkillId}`, value).then(res => {
      if(res.responseBody){
        this.itSkillsData=res.responseBody;
        console.log(this.itSkillsData);
        this.initAddItSkillForm();
      }
    })

  }

  updateProjectData(){
    let value = this.addProjectForm.value;
   this.http.put(`ProjectDetail/updateProjectDetail/${this.projectDetailId}`, value).then(res =>{
    if(res.responseBody){
      this.projectData=res.responseBody;
      console.log(this.projectData);
      this.initAddProjectForm();
    }
   })
  }

updateProfileSummaryData(){
  let value = this.addProfileSummaryForm.value;
  this.http.put(`ProfileSummary/updateByUserId/${this.userId}`, value).then(res => {
    if(res.responseBody){
      this.profileSummaryData = res.responseBody;
      console.log(this.profileSummaryData);
      this.initAddProfileSummaryForm();
    }
  })
}

updateOnlineProfileData(){
  let value = this.onlineProfileForm.value;
  this.http.put(`OnlineProfile/updateOnlineProfile/${this.onlineProfileId}`, value).then(res =>{
    if(res.responseBody){
      this.onlineProfileData = res.responseBody;
      console.log(this.onlineProfileData);
      this.initOnlineProfileForm();
    }
  })
}

updateWorkSampleData(){
  let value = this.workSampleForm.value;
  this.http.put(`WorkSample/updateWorkSample/${this.workSampleId}`, value).then(res =>{
    if(res.responseBody){
      this.workSampleData = res.responseBody;
      console.log(this.workSampleData);
      this.initWorkSampleForm();
    }
  })
}

updateResearchPublication(){
  let value = this.researchPublicationForm.value;
  this.http.put(`ResearchPublication/updateResearchPublication/${this.researchPublicationId}`, value).then(res =>{
    if(res.responseBody){
      this.researchPublicationData = res.responseBody;
      console.log(this.researchPublicationData);
      this.initResearchPublicationForm();
    }
  })
}

updatePresentation(){
  let value = this.presentationForm.value;
  this.http.put(`Presentation/updatePresentation/${this.presentationId}`, value).then(res =>{
    if(res.responseBody){
      this.presentationData = res.responseBody;
      console.log(this.presentationData);
      this.initPresentationForm();
    }
  })
}

updatePatent(){
  let value = this.patentForm.value;
  this.http.put(`Patent/updatePatent/${this.patentId}`, value).then(res => {
    if(res.responseBody){
      this.patentData = res.responseBody;
      console.log(this.patentData);
      this.initPatentForm();
    }
  })
}

addKeySkill(e: any) {
  let value = e.target.value;
  if (value) {
    this.keySkillsList.push(value);
    e.target.value = '';
  }
}

removekeySkill(index: number) {
  if (index > -1) {
    this.keySkillsList.splice(index, 1);
  }
}

charactersCount(e: any) {
  let target = e.target;
  let maxLength = target.getAttribute('maxlength');
  let currentLength = target.value.length;
  target.nextElementSibling.innerHTML = maxLength - currentLength + " " + "Character(s) Left";
}


  educationUpdatePopUp(item: EducationalDetail, content: any){
    if(item != null){
      this.educationalDetailId = item.educationalDetailId;
      this.educationData = item;
      this.initAddEducationForm();
      this.educationModalReference = this.modalService.open(content,{ size: 'lg'});
    }
  }

  itSkillsUpdatePopUp(item: ItSkills, content: any){
    if(item != null){
      this.itSkillId = item.itSkillId;
      this.itSkillsData = item;
      this.initAddItSkillForm();
      this.itSkillsModalReference = this.modalService.open(content,{size: 'lg'});

    }

  }


  projectUpdatePopUp(item: ProjectDetail, content: any) {
    if (item != null) {
      this.projectDetailId = item.projectDetailId;
      this.projectData = item;
      this.initAddProjectForm();
      this.projectsModalReference = this.modalService.open(content,{size: 'lg'});
    }
  }

  profileSummaryUpdatePopUp(item: ProfileSummary, content: any){
    if(item != null){
      this.userId = item.userId;
      this.profileSummaryData = item;
      this.initAddProfileSummaryForm();
      this.profileSummaryReference = this.modalService.open(content,{size: 'lg'});
    }
  }

  onlineProfileUpdatePopUp( item: OnlineProfile, content: any){
    if(item != null){
      this.userId = item.userId;
      this.onlineProfileId=item.onlineProfileId;
      this.onlineProfileData = item;
      this.initOnlineProfileForm();
      this.onlineProfileReference = this.modalService.open(content,{size: 'lg'});
    }
  }

  workSampleUpdatePopUp(item: WorkSample, content: any){
    if(item != null){
      this.userId = item.userId;
      this.workSampleId = item.workSampleId;
      this.workSampleData= item;
      this.initWorkSampleForm();
      this.workSampleReference = this.modalService.open(content,{size: 'lg'});
    }
  }

  researchPublicationUpdatePopUp(item: ResearchPublication, content: any){
    if(item != null){
      this.userId = item.userId;
      this.researchPublicationId = item.researchPublicationId;
      this.researchPublicationData = item;
      this.initResearchPublicationForm();
      this.researchPublicationReference = this.modalService.open(content, {size: 'lg'});
    }
  }

  presentationUpdatePopUp(item: Presentation, content: any){
    if(item != null){
      this.userId = item.userId;
      this.presentationId = item.presentationId;
      this.presentationData = item;
      this.initPresentationForm();
      this.presentationReference = this.modalService.open(content, {size: 'lg'});
    }
  }

  patentUpdatePopUp(item: Patent, content: any){
    if(item != null){
      this.userId = item.userId;
      this.patentId = item.patentId;
      this.patentData = item;
      this.initPatentForm();
      this.patentReference = this.modalService.open(content,{size: 'lg'});
    }
  }


  changeNoticePeriod(e: any){
    let value = e.target.value;
    if(value=='0')
      this.isServingNoticePeriod=true;
    else
      this.isServingNoticePeriod=false;
  }

  keySkillPopUp(content, item:any){
    if(item && item.keySkillId > 0) {
      this.keySkillData = item;
      this.keySkillsList = this.keySkillData.keySkillData;
    }
    else 
      this.keySkillData = new keySkill();
    this.initAddKeySkillForm();
    this.keySkillModalReference = this.modalService.open(content, {size: 'lg'});
  }

  employementPopup(content) {
    // $('#addEmployment').show();
    this.emloymentModalReference = this.modalService.open(content,{ size: 'lg' });
  }

  
  educationPopup(content){
    this.education.data = [];
    let data = this.educationListData.filter(x => x.childId == 0);
    for (let i = 0; i < data.length; i++) {
      let educationData = {value: data[i].educationListId, text: data[i].educationNameValue};
      this.education.data.push(educationData)
    }
    this.initAddEducationForm();
    this.educationModalReference = this.modalService.open(content,{ size: 'lg'});
  }

  itSkillsPopup(content){
    this.itSkillsData = new ItSkills();
    this.itSkillsData.userId = this.userId;
    this.itSkillsData.itSkillId = 0;
    this.initAddItSkillForm();
    this.itSkillsModalReference = this.modalService.open(content,{size: 'lg'});
  }
  projectsPopup(content){
    this.projectData = new ProjectDetail();
    this.initAddProjectForm();
    this.projectsModalReference = this.modalService.open(content,{size: 'lg'});
  }
  profileSummaryPopUp(content){
    this.profileSummaryReference = this.modalService.open(content,{size: 'lg'});
  }

  onlineProfilePopUp(content){
    this.onlineProfileData = new OnlineProfile();
    this.initOnlineProfileForm();
    this.onlineProfileReference = this.modalService.open(content,{size: 'lg'});
  }

  workSamplePopUp(content){
    this.workSampleData = new WorkSample();
    this.initWorkSampleForm();
    this.workSampleReference = this.modalService.open(content,{size: 'lg'});
  }

  researchPublicationPopUp(content){
    this.researchPublicationData = new ResearchPublication();
    this.initResearchPublicationForm();
    this.researchPublicationReference = this.modalService.open(content,{size: 'lg'});
  }

  presentationPopUp(content){
    this.presentationData = new Presentation();
    this.initPresentationForm();
    this.presentationReference = this.modalService.open(content,{size: 'lg'});
  }

  patentPopUp(content){
    this.patentData = new Patent();
    this.initPatentForm();
    this.patentReference = this.modalService.open(content,{size: 'lg'});
  }

  certificationPopUp(content){
    this.certificationReference = this.modalService.open(content,{size: 'lg'});
  }

  careerProfilePopUp(content){
    this.careerProfileReference = this.modalService.open(content,{size: 'lg'});
  }

  personalDetailPopUp(content){
    this.personalDetailReference = this.modalService.open(content,{size: 'lg'});
  }

  onDateSelection(e: NgbDateStruct) {
    let date = new Date(e.year, e.month - 1, e.day);
    this.addEmploymentForm.get("joiningDate").setValue(date);
  }

  workedTillDateSelection(e: NgbDateStruct) {
    let date = new Date(e.year, e.month - 1, e.day);
    this.addEmploymentForm.get("workedtill").setValue(date);
  }

  // closeMe() {
  //   this.modalReference.close();
  // }

  currentCompany(e: any) {
    let value = e.target.value;
    if (value == 'true')
      this.isCurrentCompany = true;
    else
      this.isCurrentCompany = false;
  }

  initAddKeySkillForm(){
    this.addKeySkillForm=this.fb.group({
      keySkillId: new FormControl(this.keySkillData.keySkillId),
      userId: new FormControl(this.userId),
      keySkill: new FormControl('')

    })
  }

  initAddEmploymentForm(){
    this.addEmploymentForm=this.fb.group({
      employmentDetailId: new FormControl(this.employmentDetailId),
      designation: new FormControl(this.employmentData.designation),
      companyName: new FormControl(this.employmentData.companyName),
      isCurrentCompany:new FormControl(this.employmentData.isCurrentCompany? 'true':'false'),
      joiningDate:new FormControl(this.employmentData.joiningDate),
      workedTill:new FormControl(this.employmentData.workedTill),
      currentAnnualSalary: new FormControl(this.employmentData.currentAnnualSalary),
      inLacs: new FormControl(this.employmentData.inLacs),
      inThousand: new FormControl(this.employmentData.inThousand),
      currencyType: new FormControl(this.employmentData.currencyType? 'true':'false'),
      skillsUsed: new FormControl(this.employmentData.skillsUsed),
      jobProfile: new FormControl(this.employmentData.jobProfile),
      noticePeriod: new FormControl(this.employmentData.noticePeriod),
      isServingNoticePeriod: new FormControl(this.employmentData.isServingNoticePeriod),
      remainingDaysOfNoticePeriod: new FormControl(this.employmentData.remainingDaysOfNoticePeriod)
    }) 
  }

  initAddEducationForm(){
    this.addEducationForm=this.fb.group({
      educationalDetailId: new FormControl(this.educationData.educationalDetailId),
      userId: new FormControl(this.educationData.userId),
      education: new FormControl(this.educationData.education),
      board: new FormControl(this.educationData.board),
      schoolMedium: new FormControl(this.educationData.schoolMedium),
      totalMarks: new FormControl(this.educationData.totalMarks),
      englishMarks: new FormControl(this.educationData.englishMarks),
      mathsMarks: new FormControl(this.educationData.mathsMarks),
      course: new FormControl(this.educationData.course),
      otherCourse: new FormControl(this.educationData.otherCourse),
      specialization: new FormControl(this.educationData.specialization),
      otherSpecialization: new FormControl(this.educationData.otherSpecialization),
      universityInstitute: new FormControl(this.educationData.universityInstitute),
      courseType: new FormControl(this.educationData.courseType == 1?'1': this.educationData.courseType==2?'2':'3'),
      passingOutYear: new FormControl(this.educationData.passingOutYear),
      gradingSystem: new FormControl(this.educationData.passingOutYear)
    
    })
  }
  initAddProjectForm(){
    this.addProjectForm=this.fb.group({
      projectDetailId: new FormControl(this.projectData.projectDetailId),
      userId: new FormControl(this.userId),
      projectTitle: new FormControl(this.projectData.projectTitle),
      client: new FormControl(this.projectData.client),
      projectStatus: new FormControl(this.projectData.projectStatus),
      workedFromYears: new FormControl(this.projectData.workedFromYears),
      workedFromMonth: new FormControl(this.projectData.workedFromMonth),
      workedTillYears: new FormControl(this.projectData.workedTillYears),
      workedTillMonth: new FormControl(this.projectData.workedTillMonth),
      detailsOfProject: new FormControl(this.projectData.detailsOfProject),
      projectLocation: new FormControl(this.projectData.projectLocation),
      projectSite: new FormControl(this.projectData.projectSite),
      natureOfEmployment: new FormControl(this.projectData.natureOfEmployment),
      teamSize: new FormControl(this.projectData.teamSize),
      role: new FormControl(this.projectData.role),
      roleDescription: new FormControl(this.projectData.roleDescription),
      skillsUsed: new FormControl(this.projectData.skillsUsed)
    })
  }
  initAddItSkillForm(){
    this.addItSkillsForm=this.fb.group({
      itSkillId: new FormControl(this.itSkillsData.itSkillId),
      userId: new FormControl(this.itSkillsData.userId),
      itSkillName: new FormControl(this.itSkillsData.itSkillName),
      softwareVersion: new FormControl(this.itSkillsData.softwareVersion),
      lastUsed: new FormControl(this.itSkillsData.lastUsed),
      yearsExperienceItSkill: new FormControl(this.itSkillsData.yearsExperienceItSkill),
      monthExperienceItSkill: new FormControl(this.itSkillsData.monthExperienceItSkill)
    })
  }

  initAddProfileSummaryForm(){
    this.addProfileSummaryForm=this.fb.group({
      userId: new FormControl(this.profileSummaryData.userId),
      profileSummary: new FormControl(this.profileSummaryData.profileSummary)
    })
  }

  initOnlineProfileForm(){
    this.onlineProfileForm = this.fb.group({
      onlineProfileId: new FormControl(this.onlineProfileData.onlineProfileId),
      userId: new FormControl(this.userId),
      socialProfile: new FormControl(this.onlineProfileData.socialProfile),
      url: new FormControl(this.onlineProfileData.url),
      description: new FormControl(this.onlineProfileData.description)
    })
  }

  initWorkSampleForm(){
    this.workSampleForm = this.fb.group({
      workSampleId: new FormControl(this.workSampleData.workSampleId),
      userId: new FormControl(this.userId),
      workTitle: new FormControl(this.workSampleData.workTitle),
      urlWorkSample: new FormControl(this.workSampleData.urlWorkSample),
      yearDurationFrom: new FormControl(this.workSampleData.yearDurationFrom),
      monthDurationFrom: new FormControl(this.workSampleData.monthDurationFrom),
      yearDurationTo: new FormControl(this.workSampleData.yearDurationTo),
      monthDurationTo: new FormControl(this.workSampleData.monthDurationTo),
      isCurrentWorking: new FormControl(this.workSampleData.isCurrentWorking),
      descriptionWorkSample: new FormControl(this.workSampleData.descriptionWorkSample)
    })
  }

  initResearchPublicationForm(){
    this.researchPublicationForm = this.fb.group({
      researchPublicationId: new FormControl(this.researchPublicationData.researchPublicationId),
      userId: new FormControl(this.userId),
      titleResearchPublication: new FormControl(this.researchPublicationData.titleResearchPublication),
      urlResearchPublication: new FormControl(this.researchPublicationData.urlResearchPublication),
      yearPublicationOn: new FormControl(this.researchPublicationData.yearPublicationOn),
      monthPublicationOn: new FormControl(this.researchPublicationData.monthPublicationOn),
      descriptionResearchPublication: new FormControl(this.researchPublicationData.descriptionResearchPublication)
    })
  }

  initPresentationForm(){
    this.presentationForm = this.fb.group({
      presentationId: new FormControl(this.presentationData.presentationId),
      userId: new FormControl(this.userId),
      presentationTitle: new FormControl(this.presentationData.presentationTitle),
      urlPresentation: new FormControl(this.presentationData.urlPresentation),
      descriptionPresentation: new FormControl(this.presentationData.descriptionPresentation)
    })

  }

  initPatentForm(){
    this.patentForm = this.fb.group({
      patentId: new FormControl(this.patentData.patentId),
      userId: new FormControl(this.userId),
      patentTitle: new FormControl(this.patentData.patentTitle),
      urlPatent: new FormControl(this.patentData.urlPatent),
      patentOffice: new FormControl(this.patentData.patentOffice),
      patentStatus: new FormControl(this.patentData.patentStatus),
      patentApplicationNumber: new FormControl(this.patentData.patentApplicationNumber),
      yearIssueDate: new FormControl(this.patentData.yearIssueDate),
      monthIssueDate: new FormControl(this.patentData.monthIssueDate),
      descriptionPatent: new FormControl(this.patentData.descriptionPatent)

    })
  }

  initCertificationForm(){
    this.certificationForm = this.fb.group({
      certificationId: new FormControl(this.certificationData.certificationId),
      userId: new FormControl(this.userId),
      certificationName: new FormControl(this.certificationData.certificationName),
      certificationCompletionId: new FormControl(this.certificationData.certificationCompletionId),
      certificationUrl: new FormControl(this.certificationData.certificationUrl),
      yearCrtificationFrom: new FormControl(this.certificationData.yearCrtificationFrom),
      monthCertificationFrom: new FormControl(this.certificationData.monthCertificationFrom),
      yearCrtificationTo: new FormControl(this.certificationData.yearCrtificationTo),
      monthCertificationTo: new FormControl(this.certificationData.monthCertificationTo),
      isCertificationNotExpire: new FormControl(this.certificationData.isCertificationNotExpire)

    })
  }

}

class EmploymentDetail {
  employmentDetailId: number=0;
  userId: number=0;
  designation: String='';
  companyName: String='';
  isCurrentCompany: boolean=null;
  joiningDate: Date=null;
  workedTill: Date=null;
  currencyType: boolean=null;
  currentAnnualSalary: number=0;
  inLacs: number=0;
  inThousand: number=0;
  skillsUsed: String='';
  jobProfile: String='';
  noticePeriod: number= null ;
  isServingNoticePeriod: boolean=null;
  remainingDaysOfNoticePeriod:  number=0;
}

class EducationalDetail{
  educationalDetailId: number=0;
  userId: number=0;
  education: number=null;
  board: number=null;
  schoolMedium: String='';
  totalMarks: String='';
  englishMarks: number=null;
  mathsMarks: number=null;
  course: number=null;
  otherCourse: String='';
  specialization: number=null;
  otherSpecialization: String='';
  universityInstitute: String='';
  courseType: number=null;
  passingOutYear: number=null;
  gradingSystem: String='';

}

class ProjectDetail{
  projectDetailId: number=0;
  userId: number=null;
  projectTitle: String='';
  client: String='';
  projectStatus: boolean=null;
  workedFromYears: number=null;
  workedFromMonth: String='';
  workedTillYears: number=null;
  workedTillMonth: String='';
  detailsOfProject: String='';
  projectLocation: String='';
  projectSite: boolean=null;
  natureOfEmployment: String='';
  teamSize: number=null;
  role: String='';
  roleDescription: String='';
  skillsUsed: String='';
}

class ItSkills{
  itSkillId: number=null;
  userId: number=null;
  itSkillName: String='';
  softwareVersion: String='';
  lastUsed: number=null;
  yearsExperienceItSkill: number=null;
  monthExperienceItSkill: number=null;
}

class ProfileSummary{
  userId: number=null;
  profileSummary: String='';

}

class keySkill{
  keySkillId: number = 0;
  userId: number = 0;
  keySkillData: Array<String> = [];
  keySkill: String='';
}

class OnlineProfile{
  onlineProfileId: number = 0;
  userId: number = 0;
  socialProfile: String='';
  url: String='';
  description: String='';

}

class WorkSample{
  workSampleId: number = 0;
  userId: number = 0;
  workTitle: String = '';
  urlWorkSample: String = '';
  yearDurationFrom: number = 0;
  monthDurationFrom: String = '';
  yearDurationTo: number = 0;
  monthDurationTo: String = '';
  isCurrentWorking: boolean = false;
  descriptionWorkSample: String = '';

}

class ResearchPublication{
  researchPublicationId: number = 0;
  userId: number = 0;
  titleResearchPublication: String = '';
  urlResearchPublication: string = '';
  yearPublicationOn: number = 0;
  monthPublicationOn: String = '';
  descriptionResearchPublication: String = '';

}

class Presentation{
  presentationId: number = 0;
  userId: number = 0;
  presentationTitle: String = '';
  urlPresentation: String = '';
  descriptionPresentation: String = '';
}

class Patent{
  patentId: number = 0;
  userId: number = 0;
  patentTitle: String = '';
  urlPatent: String = '';
  patentOffice: String = '';
  patentStatus: boolean = null;
  patentApplicationNumber: String = '';
  yearIssueDate: number = 0;
  monthIssueDate: String = '';
  descriptionPatent: String = '';

}

class Certification{
  certificationId: number = 0;
  userId: number = 0;
  certificationName: String = '';
  certificationCompletionId: String = '';
  certificationUrl: String = '';
  yearCrtificationFrom: number = 0;
  monthCertificationFrom: String = '';
  yearCrtificationTo: number = 0;
  monthCertificationTo: String = '';
  isCertificationNotExpire: boolean = true;

}