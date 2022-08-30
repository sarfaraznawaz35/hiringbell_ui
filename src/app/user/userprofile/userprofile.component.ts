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
  modelWorkedTill: NgbDateStruct;
  isCurrentCompany:boolean=true;
  addEmploymentForm:FormGroup;
  addEducationForm:FormGroup;
  addProjectForm:FormGroup;
  addItSkillsForm:FormGroup;
  employmentDetailId: number=0;
  employmentData:EmploymentDetail=new EmploymentDetail();
  employmentDataArr: Array <EmploymentDetail> = [];
  educationData:EducationalDetail=new EducationalDetail();
  projectData:ProjectDetail=new ProjectDetail();
  projectDetailId: number=0;
  projectDataArr: Array <ProjectDetail> = [];
  itSkillsData: ItSkills=new ItSkills();
  educationalDetailId: number=0;
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
  
   private emloymentModalReference;
   private educationModalReference;
   private itSkillsModalReference;
   private projectsModalReference;
   

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
      this.initAddEmploymentForm();
      this.loadEmploymentData();
      this.initAddEducationForm();
      this.loadEducationData();
      this.loadPojectData();
      this.initAddProjectForm();
    }
    else
    ErrorToast("please login again..")
  }


  createEmploymentData(){
    let finalAmount = Number(this.addEmploymentForm.get('inLacs').value) + Number(this.addEmploymentForm.get('inThousand').value);
    this.addEmploymentForm.get('currentAnnualSalary').setValue(finalAmount);
    let value = this.addEmploymentForm.value;
    this.http.post("EmploymentDetail/addEmploymentDetail", value).then(Response => {
      if(Response.responseBody){
        this.employmentData=Response.responseBody;
        this.initAddEmploymentForm();
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

  createProjectData(){
    let value = this.addProjectForm.value;
    this.http.post("ProjectDetail/addProjectDetail", value).then(Response => {
      if(Response.responseBody){
        this.projectData=Response.responseBody;
        Toast("Record inserted");

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

  loadEmploymentData(){
    if(this.userId > 0){
      this.http.get(`EmploymentDetail/getByUserId/${this.userId}`).then(response =>{
        if(response.responseBody){
          this.employmentDataArr=response.responseBody;
          console.log(this.employmentDataArr);
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
          Toast("Record found");
        }
      })
    }
  }

  loadEducationData(){
    this.educationalDetailId=1;
    if(this.educationalDetailId>0){
      this.http.get(`EducationalDetail/getById/${this.educationalDetailId}`).then(Response => {
        if(Response.responseBody){
          this.educationData=Response.responseBody;
          console.log(this.educationData);
          this.initAddEducationForm();
        }
      })
    }
  }
  
  loadPojectData(){
    this.isPageReady = false;
    if(this.userId>0){
      this.http.get(`ProjectDetail/getByUserId/${this.userId}`).then(Response => {
        if(Response.responseBody){
          let data = Response.responseBody;
          for (let i = 0; i < data.length; i++) {
            this.projectDataArr.push(data[i]);
          }
          console.log(this.projectDataArr);
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

employmentUpdatePopUp(item: EmploymentDetail, content: any){
  if(item != null){
    this.employmentDetailId = item.employmentDetailId;
    this.employmentData = item;
    this.initAddEmploymentForm();
    this.emloymentModalReference = this.modalService.open(content)
    this.emloymentModalReference = this.modalService.open(content,{ size: 'lg' });
  }

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
    this.educationalDetailId=1;
    let value = this.addEmploymentForm.value;
    this.http.put(`EducationalDetail/updateEducationalDetail/${this.educationalDetailId}`, value).then(res => {
      if(res.responseBody){
        this.educationData=res.responseBody;
        console.log(this.educationData);
        this.initAddEducationForm();
      }
    })
  }

  projectUpdatePopUp(item: ProjectDetail, content: any) {
    if (item != null) {
      this.projectDetailId = item.projectDetailId;
      this.projectData = item;
      this.initAddProjectForm();
      this.projectsModalReference = this.modalService.open(content,{size: 'lg'});
    }
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

  changeNoticePeriod(e: any){
    let value = e.target.value;
    if(value=='0')
      this.isServingNoticePeriod=true;
    else
      this.isServingNoticePeriod=false;
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
    this.itSkillsModalReference = this.modalService.open(content,{size: 'lg'});
  }
  projectsPopup(content){
    this.projectData = new ProjectDetail();
    this.initAddProjectForm();
    this.projectsModalReference = this.modalService.open(content,{size: 'lg'});
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
  schoolMedium: number=null;
  totalMarks: number=null;
  englishMarks: number=null;
  mathsMarks: number=null;
  course: number=null;
  otherCourse: String='';
  specialization: number=null;
  otherSpecialization: String='';
  universityInstitute: String='';
  courseType: number=null;
  passingOutYear: number=null;
  gradingSystem: number=null;

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