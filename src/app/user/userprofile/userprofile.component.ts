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
  employmentDetailId: number=0;
  employmentData:EmploymentDetail=new EmploymentDetail();
  isServingNoticePeriod: boolean=false;
  education: autoCompleteModal = null;
  educationValue: number= 0;
  course: autoCompleteModal=null;
  specialization: autoCompleteModal=null;
  specializationDate: Array<any> = [];
  passingoutyear: autoCompleteModal=null;
  schoolMedium: autoCompleteModal=null;
  totalMarks: autoCompleteModal=null;
  courseValue: number=0;
  courseData: Array<any> = [];
  educationQualification:any={
    below10th :false,
    tenth :false,
    twelve : false,
    graduation : false,
    masters : false,
    doctoratePhD : false
  };
  gradingSystem: autoCompleteModal=null;
  board: autoCompleteModal=null;
  lastused: autoCompleteModal=null;
  years: autoCompleteModal=null;
  months: autoCompleteModal=null;

  constructor(private modalService: NgbModal,
              private fb:FormBuilder,
              private htttp:AjaxService,
              private nav:iNavigation) { }
  
   private emloymentModalReference;
   private educationModalReference;
   private itSkillsModalReference;

  ngOnInit(): void {
    this.education = new autoCompleteModal();
    this.education.data = [];
    this.education.className='';
    this.education.placeholder = "Select Education";
    this.education.data.push({value: 0,text: "Below 10th"},
                            {value:1, text: "10th"},
                            {value:2, text: "12th"},
                            {value:3, text: "Graduation/Diploma"},
                            {value:4, text: "Masters/Post-Graduation"},
                            {value:5, text: "Doctorate/PhD"});
    
    this.course = new autoCompleteModal();
    this.course.data = [];
    this.course.className='';
    this.course.placeholder = "Select Course";
    this.courseData.push({value:0, text: "B.A"},
                          {value:1, text: "B.Arch"},
                          {value:2, text: "BCA"},
                          {value:3, text: "BBA/BMS"},
                          {value:4, text: "B.Com"},
                          {value:5, text: "B.Ed"},
                          {value:6, text: "BDS"},
                          {value:7, text: "BHM"},
                          {value:8, text: "B.Pharma"},
                          {value:9, text: "B.Sc"},
                          {value:10, text: "B.Tech/B.E"},
                          {value:11, text: "LLB"},
                          {value:12, text: "MBBS"},
                          {value:13, text: "Diploma"},
                          {value:14, text: "BVSC"},
                          {value:15, text: "BAMS"},
                          {value:16, text: "BHMS"},
                          {value:17, text: "B.EI.Ed"},
                          {value:18, text: "B.P.Ed"},
                          {value:19, text: "BHMCT"},
                          {value:20, text: "B.Des"},
                          {value:21, text: "BFA"},
                          {value:22, text: "B.U.M.S"},
                          {value:23, text: "Other Graduate"},
                          {value:24, text: "CA"},
                          {value:25, text: "CS"},
                          {value:26, text: "ICWA (CMA)"},
                          {value:27, text: "Integrated PG"},
                          {value:28, text: "LLM"},
                          {value:29, text: "M.A"},
                          {value:30, text: "M.Arch"},
                          {value:31, text: "M.Com"},
                          {value:32, text: "M.Ed"},
                          {value:33, text: "M.Pharma"},
                          {value:34, text: "MS/M.Sc(Science)"},
                          {value:35, text: "M.Tech"},
                          {value:36, text: "MBA/PGDM"},
                          {value:37, text: "MCA"},
                          {value:38, text: "Medical-MS/MD"},
                          {value:39, text: "PG Diploma"},
                          {value:40, text: "MVSC"},
                          {value:41, text: "MCM"},
                          {value:42, text: "MDS"},
                          {value:43, text: "MFA"},
                          {value:44, text: "M.Des."},
                          {value:45, text: "DM"},
                          {value:46, text: "M.Ch"},
                          {value:47, text: "Other Post Graduate"},
                          {value:48, text: "Ph.D/Doctorate"},
                          {value:49, text: "MPHIL"},
                          {value:50, text: "Other Doctorate"});
                    
    this.specialization = new autoCompleteModal();
    this.specialization.data = [];
    this.specialization.className='';
    this.specialization.placeholder = "Select Specialization";
    this.specializationDate.push({value:0, text: "Arts&Humanities"}, //GRADUATION -- starts -->>  ..BA --> Start
                                  {value:1, text: "Communication"},
                                  {value:2, text: "Economics"},
                                  {value:3, text: "English"},
                                  {value:4, text: "Film"},
                                  {value:5, text: "Fine Arts"},
                                  {value:6, text: "Hindi"},
                                  {value:7, text: "History"},
                                  {value:8, text: "Journalism"},
                                  {value:9, text: "Maths"},
                                  {value:10, text: "Pass Course"},
                                  {value:11, text: "Political Science"},
                                  {value:12, text: "PR/Advertising"},
                                  {value:13, text: "Psychology"},
                                  {value:14, text: "Sanskrit"},
                                  {value:15, text: "Sociology"},
                                  {value:16, text: "Statistics"},
                                  {value:17, text: "Vocational Course"},
                                  {value:18, text: "Hotel Management"}, //BA  <-- end --
                                  {value:19, text: "Architecture"},     //B.arch
                                  {value:20, text: "Computers"},        //BCA
                                  {value:21, text: "Management"},       //BBA
                                  {value:22, text: "Commerce"},           //B.Com
                                  {value:23, text: "Education"},          //B.Ed
                                  {value:24, text: "Dentistry"},          //BDS
                                  {value:25, text: "Hotel Management"},   //BHM
                                  {value:26, text: "Pharmacy"},           //B.Pharma
                                  {value:27, text: "Agriculture"},        //B.SC  --> Start
                                  {value:28, text: "Anthropology"},
                                  {value:29, text: "Bio-Chemistry"},
                                  {value:30, text: "Biology"},
                                  {value:31, text: "Botany"},
                                  {value:32, text: "Chemistry"},
                                  {value:33, text: "Computers"},
                                  {value:34, text: "Dairy Technology"},
                                  {value:35, text: "Electronics"},
                                  {value:36, text: "Environmental Science"},
                                  {value:37, text: "Food Technology"},    
                                  {value:38, text: "Geology"},
                                  {value:39, text: "Home Science"},
                                  {value:40, text: "Maths"},
                                  {value:41, text: "Microbiology"},
                                  {value:42, text: "Nursing"},
                                  {value:43, text: "Physics"},
                                  {value:44, text: "Statistics"},
                                  {value:45, text: "Zoology"},
                                  {value:46, text: "General"},
                                  {value:47, text: "Hospitality and Hotel Management"},
                                  {value:48, text: "Optometry"},            //B.Sc  <-- ends ---
                                  {value:49, text: "Agriculture"},          //B.Tech --> strat
                                  {value:50, text: "Automobile"},
                                  {value:51, text: "Aviation"},
                                  {value:52, text: "Bio-Chemistry / Bio-Technology"},
                                  {value:53, text: "Biomedical"},
                                  {value:54, text: "Ceramics"},
                                  {value:55, text: "Chemical"},
                                  {value:56, text: "Civil"},
                                  {value:57, text: "Computers"},
                                  {value:58, text: "Electrical"},
                                  {value:59, text: "Electronics/Telecommunication"},
                                  {value:60, text: "Energy"},
                                  {value:61, text: "Environmental"},
                                  {value:62, text: "Instrumentation"},
                                  {value:63, text: "Marine"},
                                  {value:64, text: "Mechanical"},
                                  {value:65, text: "Metallurgy"},
                                  {value:66, text: "Mineral"},
                                  {value:67, text: "Mining"},
                                  {value:68, text: "Nuclear"},
                                  {value:69, text: "Paint/Oil"},
                                  {value:70, text: "Petroleum"},
                                  {value:71, text: "Plastics"},
                                  {value:72, text: "Production/Industrial"},
                                  {value:73, text: "Textile"},              //-- B.Tech <--- ends ---
                                  {value:74, text: "Law"},                // LLB
                                  {value:75, text: "Medicine"},           //MBBS
                                  {value:76, text: "Architecture"},       // Diploma  -- starts -->
                                  {value:77, text: "Chemical"},
                                  {value:78, text: "Civil"},
                                  {value:79, text: "Computers"},
                                  {value:80, text: "Electrical"},
                                  {value:81, text: "Electronics / Telecommunication"},
                                  {value:82, text: "Engineering"},
                                  {value:83, text: "Export/Import"},
                                  {value:84, text: "Fashion Designing / Other Designing"},
                                  {value:85, text: "Graphic/ Web Designing"},
                                  {value:86, text: "Hotel Management"},
                                  {value:87, text: "Insurance"},
                                  {value:88, text: "Management"},
                                  {value:89, text: "Mechanical"},
                                  {value:90, text: "Tourism"},
                                  {value:91, text: "Visual Arts"},
                                  {value:92, text: "Vocational Course"},       // Diploma <--- ends --
                                  {value:93, text: "Veterinary Science"},     //BVSC
                                  {value:94, text: "Ayurveda"},             //BAMS
                                  {value:95, text: "Homeopathy"},         //BHMS
                                  {value:96, text: "Elementary Education"}, //B.EI.Ed
                                  {value:97, text: "Physical Education"},   //B.P.Ed
                                  {value:98, text: "Hotel Management"},     //BHMCT
                                  {value:99, text: "Animation Film Design"},  //B.Des  -- start -->
                                  {value:100, text: "Ceramic & Glass Design"},
                                  {value:101, text: "Exhibition Design"},
                                  {value:102, text: "Film and Video Communication"},
                                  {value:103, text: "Textile Design"},
                                  {value:104, text: "Furniture Design"},
                                  {value:105, text: "Product Design"},
                                  {value:106, text: "Graphic Design"},       //B.Des  <-- ends --
                                  {value:107, text: "Painting"},           //BFA -- starts --->
                                  {value:108, text: "Sculpture"},
                                  {value:109, text: "Arts History"},
                                  {value:110, text: "Printmaking"},
                                  {value:111, text: "Visual Communication"},   // <-- ends --
                                  {value:112, text: "Unani Medicine"},        // BUMS  .... --GRADUATION  <<--- ENDS --
                                  {value:113, text: "CA"},               // MASTERS/PostGraduation -- starts -->>  -- CA -- starts -->
                                  {value:114, text: "Pursuing"},
                                  {value:115, text: "First Attempt"},
                                  {value:116, text: "Second Attempt"},     // CA  <-- ends --
                                  {value:117, text: "CS"},   //CS
                                  {value:118, text: "ICWA (CMA)"},   //ICWA(CMA)
                                  {value:119, text: "Journalism/Mass Communication"},    // Integrated PG  -- start -->
                                  {value:120, text: "Management"},
                                  {value:121, text: "PR/Advertising"},
                                  {value:122, text: "Tourism"},                  // Integrated PG  <-- ends --
                                  {value:123, text: "Law"},  //LLM
                                  {value:124, text: "Anthropology"},     //MA -- starts -->
                                  {value:125, text: "Arts & Humanities"},
                                  {value:126, text: "Communication"},
                                  {value:127, text: "Economics"},
                                  {value:128, text: "English"},
                                  {value:129, text: "Film"},
                                  {value:130, text: "Fine Arts"},
                                  {value:131, text: "Hindi"},
                                  {value:132, text: "History"},
                                  {value:133, text: "Journalism"},
                                  {value:134, text: "Maths"},
                                  {value:135, text: "Political Science"},
                                  {value:136, text: "PR/Advertising"},
                                  {value:137, text: "Psychology"},
                                  {value:138, text: "Sanskrit"},
                                  {value:139, text: "Sociology"},
                                  {value:140, text: "Statistics"},    //MA  <-- ends --
                                  {value:141, text: "Architecture"},   // M.Arch
                                  {value:142, text: "Commerce"},     //M.Com
                                  {value:143, text: "Education"},    //M.Ed
                                  {value:144, text: "Pharmacy"},   //M.Pharma
                                  {value:145, text: "Agriculture"},  //MS/M.Sc -- starts -->
                                  {value:146, text: "Anthropology"},
                                  {value:147, text: "Bio-Chemistry"},
                                  {value:148, text: "Biology"},
                                  {value:149, text: "Botany"},
                                  {value:150, text: "Chemistry"},
                                  {value:151, text: "Computers"},
                                  {value:152, text: "Dairy Technology"},
                                  {value:153, text: "Electronics"},
                                  {value:154, text: "Environmental Science"},
                                  {value:155, text: "Food Technology"},
                                  {value:156, text: "Geology"},
                                  {value:157, text: "Home Science"},
                                  {value:158, text: "Maths"},
                                  {value:159, text: "Microbiology"},
                                  {value:160, text: "Nursing"},
                                  {value:161, text: "Physics"},
                                  {value:162, text: "Statistics"},
                                  {value:163, text: "Zoology"},
                                  {value:164, text: "Veterinary Science"},
                                  {value:165, text: "Biotechnology"},
                                  {value:166, text: "Organic Chemistry"},
                                  {value:167, text: "Optometry"},
                                  {value:168, text: "Astronautical Engineering"},
                                  {value:169, text: "Aerospace & Mechanical Engineering"},
                                  {value:170, text: "Chemical Engineering & Material Science"},
                                  {value:171, text: "Civil & Environmental Engineering"},
                                  {value:172, text: "Electrical Engineering"},
                                  {value:173, text: "Industrial & Systems Engineering"},
                                  {value:174, text: "Petroleum Engineering"},
                                  {value:175, text: "Cyber Security Engineering"},
                                  {value:176, text: "Data Informatics"},
                                  {value:177, text: "Systems Architecting and Engineering"},
                                  {value:178, text: "Mechanical Engineering"},
                                  {value:179, text: "Marine Engineering"},
                                  {value:180, text: "Electronics & Embedded Technology"},
                                  {value:181, text: "Mechatronics"},
                                  {value:182, text: "Hospitality Administration"},  //MS/M.Sc <-- ends --
                                  {value:183, text: "Agriculture"},    //M.Tech  -- starts -->
                                  {value:184, text: "Automobile"},
                                  {value:185, text: "Aviation"},
                                  {value:186, text: "Bio-Chemistry/Bio-Technology"},
                                  {value:187, text: "Biomedical"},
                                  {value:188, text: "Ceramics"},
                                  {value:189, text: "Chemical"},
                                  {value:190, text: "Civil"},
                                  {value:191, text: "Computers"},
                                  {value:192, text: "Electrical"},
                                  {value:193, text: "Electronics/Telecommunication"},
                                  {value:194, text: "Energy"},
                                  {value:195, text: "Environmental"},
                                  {value:196, text: "instrumentation"},
                                  {value:197, text: "Marine"},
                                  {value:198, text: "Mechanical"},
                                  {value:199, text: "Metallurgy"},
                                  {value:200, text: "Mineral"},
                                  {value:201, text: "Mining"},
                                  {value:202, text: "Nuclear"},
                                  {value:203, text: "Paint/Oil"},
                                  {value:204, text: "Petroleum"},
                                  {value:205, text: "Plastics"},
                                  {value:206, text: "Production/Industrial"},
                                  {value:207, text: "Textile"},    //M.Tech  <-- ends --
                                  {value:208, text: "Advertising/Mass Communication"}, //MBA -- starts -->
                                  {value:209, text: "Finance"},
                                  {value:210, text: "HR/Industrial Relations"},
                                  {value:211, text: "Information Technology"},
                                  {value:212, text: "International Business"},
                                  {value:213, text: "Marketing"},
                                  {value:214, text: "Systems"},
                                  {value:215, text: "Operations"},
                                  {value:216, text: "Hospitality Management"}, //MBA <-- ends --
                                  {value:217, text: "Computers"},  //MCA
                                  {value:218, text: "Cardiology"},       //Medical-MS/MD -- start -->
                                  {value:219, text: "Dermatology"},
                                  {value:220, text: "ENT"},
                                  {value:221, text: "General Practitioner"},
                                  {value:222, text: "Gyneocology"},
                                  {value:223, text: "Hepatology"},
                                  {value:224, text: "immunology"},
                                  {value:225, text: "Microbiology"},
                                  {value:226, text: "Neonatal"},
                                  {value:227, text: "Nephrology"},
                                  {value:228, text: "Urology"},
                                  {value:229, text: "Obstretrics"},
                                  {value:230, text: "Oncology"},
                                  {value:231, text: "Opthalmology"},
                                  {value:232, text: "Orthopaedic"},
                                  {value:233, text: "Pathology"},
                                  {value:234, text: "Pediatrics"},
                                  {value:235, text: "Psychiatry"},
                                  {value:236, text: "Psychology"},
                                  {value:237, text: "Radiology"},
                                  {value:238, text: "Rheumatology"},
                                  {value:239, text: "Ayurveda"},
                                  {value:240, text: "Thoracic Medicine"},
                                  {value:241, text: "Sports Medicine"},
                                  {value:242, text: "Aviation Medicine/Aerospace Medicine"},
                                  {value:243, text: "Tuberculosis & Respiratory Disease / Pulmonary Medicine"},
                                  {value:244, text: "Medical Genetics"},
                                  {value:245, text: "Palliative Medicine"},
                                  {value:246, text: "Public Health(Epidemiology)"},
                                  {value:247, text: "Blood Banking & Immuno.Haem./Imm.Haem.& Blood Trans."},
                                  {value:248, text: "Tropical Medicine"},
                                  {value:249, text: "Maternity & Child Health"},
                                  {value:250, text: "Pulmonary Medicine"},
                                  {value:251, text: "CCM"},
                                  {value:252, text: "P.S.M"},
                                  {value:253, text: "Emergency Medicine"},
                                  {value:254, text: "R&D"},
                                  {value:255, text: "Anaesthesiology"},
                                  {value:256, text: "Anatomy"},
                                  {value:257, text: "Forensic Medicine/Forensic Medicine & Toxicology"},
                                  {value:258, text: "Geriatrics"},
                                  {value:259, text: "Hospital Administration"},
                                  {value:260, text: "Health Administration"},
                                  {value:261, text: "Lab Medicine"},
                                  {value:262, text: "Nuclear Medicine"},
                                  {value:263, text: "Pharmacology"},
                                  {value:264, text: "Physical Medicine & Rehabilitation"},
                                  {value:265, text: "Radiotherapy"},
                                  {value:266, text: "Social & Preventive Medicine / Community Medicine"},
                                  {value:267, text: "Venereology"},
                                  {value:268, text: "Bio-Chemistry"},
                                  {value:269, text: "Unani"},
                                  {value:270, text: "Bio-Physics"},
                                  {value:271, text: "General Surgery"},
                                  {value:272, text: "Neuro Surgery"},
                                  {value:273, text: "Traumatology and Surgery"},   //Medical-MS/MD <-- ends --
                                  {value:274, text: "Chemical"},     //PG Diploma -- starts -->
                                  {value:275, text: "Civil"},
                                  {value:276, text: "Computers"},
                                  {value:277, text: "Electrical"},
                                  {value:278, text: "Electronics"},
                                  {value:279, text: "Mechanical"},   //PG Diploma  <-- ends --
                                  {value:280, text: "Veterinal Science"},  //MVSC
                                  {value:281, text: "Computers and Management"},  //MCM 
                                  {value:282, text: "Dentistry"},   //MDS
                                  {value:283, text: "Sculpture"},           //MFA  -- starts -->
                                  {value:284, text: "Printmaking"},
                                  {value:285, text: "Visual Communication"},   //MFA  <-- ends --
                                  {value:286, text: "Animation Film Design"},   //M.Des  --starts -->
                                  {value:287, text: "Apparel Design"},
                                  {value:288, text: "Ceramic & Glass Design"},
                                  {value:289, text: "Design For Retail Experience"},
                                  {value:290, text: "Digital Game Design"},
                                  {value:291, text: "Film and Video Communication"},
                                  {value:292, text: "Furniture Design"},
                                  {value:293, text: "Graphic Design"},
                                  {value:294, text: "Information Design"},
                                  {value:295, text: "Interaction Design"},
                                  {value:296, text: "Lifestyle Accessory Design"},
                                  {value:297, text: "New Media Design"},
                                  {value:298, text: "Photography Design"},
                                  {value:299, text: "Product Design"},
                                  {value:300, text: "Strategic Design Management"},
                                  {value:301, text: "Textile Design"},
                                  {value:302, text: "Toy & Game Design"},
                                  {value:303, text: "Transportation & Automobile Design"},
                                  {value:304, text: "Universal Design"},               //M.Des  <-- ends --
                                  {value:305, text: "Clinical Pharmacology"},          //DM  -- starts -->
                                  {value:306, text: "Clinical Haematology"},
                                  {value:307, text: "Pulmonary Medicine"},
                                  {value:308, text: "Neuro Radiology"},
                                  {value:309, text: "Nephrology"},
                                  {value:310, text: "Neonatology"},
                                  {value:311, text: "Oncology"},
                                  {value:312, text: "Gastroenterology"},
                                  {value:313, text: "Cardiology"},
                                  {value:314, text: "Neurology"},
                                  {value:315, text: "Rheumatology"},
                                  {value:316, text: "Endocrinology"},
                                  {value:317, text: "Clinical Immunology"},
                                  {value:318, text: "Pulmonary Med. & Critical Care Med."},
                                  {value:319, text: "Cardiac-Anaes."},
                                  {value:320, text: "Haematology Pathology"},
                                  {value:321, text: "Medical Genetics"},
                                  {value:322, text: "Hepatology"},
                                  {value:323, text: "Immunology"},
                                  {value:324, text: "Child & Adolescent Psychiatry"},
                                  {value:325, text: "Pediatric Anaesthesia"},
                                  {value:326, text: "Neuro Anaesthesia"},
                                  {value:327, text: "Pediatric Nephrology"},
                                  {value:328, text: "Reproductive Medicine"},
                                  {value:329, text: "Virology"},
                                  {value:330, text: "Pediatric Hepatology"},
                                  {value:331, text: "Infectious Disease"},
                                  {value:332, text: "Organ Transplant Anaesthesia & Critical Care"},
                                  {value:333, text: "Critical Care Medicine"},               //DM  <-- ends --
                                  {value:334, text: "Hand Surgery"},     //M.ch -- starts -->
                                  {value:335, text: "Gynaecological Oncology"},
                                  {value:336, text: "Pediatric Cardio-Thoracic Vascular Surgery"},
                                  {value:337, text: "Plastic & Reconstructive Sutgery"},
                                  {value:338, text: "Hepato Pancreato Biliary Surgery"},
                                  {value:339, text: "Urology/Genito-Urinary Surgery"},
                                  {value:340, text: "Hand & Micro Surgery"},
                                  {value:341, text: "Burns & Plastic Surgery"},
                                  {value:342, text: "Oncology"},
                                  {value:343, text: "Vascular Surgery"},
                                  {value:344, text: "Cardio Thoracic Surgery"},
                                  {value:345, text: "Cardio Thoracic Surgery and Vascular Surgery"},
                                  {value:346, text: "Neuro Surgery"},
                                  {value:347, text: "Pediatric Surgery"},
                                  {value:348, text: "Plastic Surgery"},
                                  {value:349, text: "Surgical Gastroenterology/G.I Surgery"},
                                  {value:350, text: "Surgical Oncology"},
                                  {value:351, text: "Thoracic Surgery"},
                                  {value:352, text: "Urology"},               // M.ch -- Masters/PostGraduation <-- Ends --  
                                  {value:353, text: "Advertising/Mass Communication"},       //Doctorate/PhD -- Ph.D/Doctorate -- starts -->
                                  {value:354, text: "Agriculture"},       
                                  {value:355, text: "Anthropology"},
                                  {value:356, text: "Architecture"},
                                  {value:357, text: "Arts & Humanities"},
                                  {value:358, text: "Automobile"},
                                  {value:359, text: "Aviation"},
                                  {value:360, text: "Bio-Chemistry/Bio-Technology"},
                                  {value:361, text: "Biomedical"},
                                  {value:362, text: "Biotechnology"},
                                  {value:363, text: "Ceramics"},
                                  {value:364, text: "Chemical"},
                                  {value:365, text: "Chemistry"},
                                  {value:366, text: "Civil"},
                                  {value:367, text: "Commerce"},
                                  {value:368, text: "Communication"},
                                  {value:369, text: "Computers"},
                                  {value:370, text: "Dairy Technology"},
                                  {value:371, text: "Dermatology"},
                                  {value:372, text: "Economics"},
                                  {value:373, text: "Electrical"},
                                  {value:374, text: "Electronics/Telecommunication"},
                                  {value:375, text: "Energy"},
                                  {value:376, text: "ENT"},
                                  {value:377, text: "Environmental"},
                                  {value:378, text: "Fashion Designing/Other Designing"},
                                  {value:379, text: "Film"},
                                  {value:380, text: "Finance"},
                                  {value:381, text: "Fine Arts"},
                                  {value:382, text: "Food Technology"},
                                  {value:383, text: "Hotel Management"},
                                  {value:384, text: "History"},
                                  {value:385, text: "HR/Industrial Relations"},
                                  {value:386, text: "Immunology"},
                                  {value:387, text: "International Business"},
                                  {value:388, text: "Instrumentation"},
                                  {value:389, text: "Journalism"},
                                  {value:390, text: "Law"},
                                  {value:391, text: "Literature"},
                                  {value:392, text: "Marine"},
                                  {value:393, text: "Marketing"},
                                  {value:394, text: "Maths"},
                                  {value:395, text: "Mechanical"},
                                  {value:396, text: "Medicine"},
                                  {value:397, text: "Metallurgy"},
                                  {value:398, text: "Microbiology"},
                                  {value:399, text: "Mineral"},
                                  {value:400, text: "Mining"},
                                  {value:401, text: "Neonatal"},
                                  {value:402, text: "Nuclear"},
                                  {value:403, text: "Obstetrics"},
                                  {value:404, text: "Paint/Oil"},
                                  {value:405, text: "Pathology"},
                                  {value:406, text: "Petroleum"},
                                  {value:407, text: "Pediatrics"},
                                  {value:408, text: "Pharmacy"},
                                  {value:409, text: "Physics"},
                                  {value:410, text: "Plastics"},
                                  {value:411, text: "Production/Industrial"},
                                  {value:412, text: "Psychiatry"},
                                  {value:413, text: "Psychology"},
                                  {value:414, text: "Radiology"},
                                  {value:415, text: "Rheumatology"},
                                  {value:416, text: "Sanskrit"},
                                  {value:417, text: "Sociology"},
                                  {value:418, text: "Statistics"},
                                  {value:419, text: "Systems"},
                                  {value:420, text: "Textile"},
                                  {value:421, text: "Vocational Courses"},
                                  {value:422, text: "Nursing"},
                                  {value:423, text: "Linguistics"},
                                  {value:424, text: "Political Science"},
                                  {value:425, text: "Home Science"},
                                  {value:426, text: "Special Education"},
                                  {value:427, text: "Education"},
                                  {value:428, text: "Music"},
                                  {value:429, text: "Botany"},
                                  {value:430, text: "Philosophy"},
                                  {value:431, text: "Zoology"},
                                  {value:432, text: "Physical Education"},
                                  {value:433, text: "Genetics"},
                                  {value:434, text: "Astrophysics"},
                                  {value:435, text: "Biophysics"},
                                  {value:436, text: "Other Specialization"});

    this.gradingSystem = new autoCompleteModal();
    this.gradingSystem.data = [];
    this.gradingSystem.className='';
    this.gradingSystem.placeholder = "Select grading system";
    this.gradingSystem.data.push({value:0, text: "Scale 10 Grading System"},
                                  {value:1, text: "Scale 4 Grading System"},
                                  {value:2, text: "%Marks of 100 Maximum"},
                                  {value:3, text: "Course Requires a Pass"});

    this.board = new autoCompleteModal();
    this.board.data = [];
    this.board.className='';
    this.board.placeholder = "Select board";
    this.board.data.push({value:0, text: "CBSE"},
                        {value:1, text: "CISCE(ICSE/ISC)"},
                        {value:2, text: "Diploma"},
                        {value:3, text: "National Open School"},
                        {value:4, text: "IB(International Baccalaureate)"},
                        {value:5, text: "Andhra Pradesh"},
                        {value:6, text: "Arunachal Pradesh"},
                        {value:7, text: "Assam"},
                        {value:8, text: "Bihar"},
                        {value:9, text: "Chhattisgarh"},
                        {value:10, text: "Goa"},
                        {value:11, text: "Gujarat"},
                        {value:12, text: "Haryana"},
                        {value:13, text: "Himachal Pradesh"},
                        {value:14, text: "J&K"},
                        {value:15, text: "Jharkhand"},
                        {value:16, text: "Karnataka"},
                        {value:17, text: "Kerala"},
                        {value:18, text: "Madhya Pradesh"},
                        {value:19, text: "Maharashtra"},
                        {value:20, text: "Manipur"},
                        {value:21, text: "Meghalaya"},
                        {value:22, text: "Mizoram"},
                        {value:23, text: "Nagaland"},
                        {value:24, text: "Odisha"},
                        {value:25, text: "Punjab"},
                        {value:26, text: "Rajasthan"},
                        {value:27, text: "Tamil Nadu"},
                        {value:28, text: "Telangana"},
                        {value:29, text: "Tripura"},
                        {value:30, text: "Uttar Pradesh"},
                        {value:31, text: "Uttarakhand"},
                        {value:32, text: "West Bengal"},
                        {value:33, text: "Other"});
                    
  this.passingoutyear = new autoCompleteModal();
  this.passingoutyear.data = [];
  this.passingoutyear.className='';
  this.passingoutyear.placeholder = "Select Passing out year";
  this.passingoutyear.data.push({value:0, text: "2022"},
                                {value:1, text: "2021"},
                                {value:2, text: "2020"},
                                {value:3, text: "2019"},
                                {value:4, text: "2018"},
                                {value:5, text: "2017"},
                                {value:6, text: "2016"},
                                {value:7, text: "2015"},
                                {value:8, text: "2014"},
                                {value:9, text: "2013"},
                                {value:10, text: "2012"},
                                {value:11, text: "2011"},
                                {value:12, text: "2010"},
                                {value:13, text: "2009"},
                                {value:14, text: "2008"},
                                {value:15, text: "2007"},
                                {value:16, text: "2006"},
                                {value:17, text: "2005"},
                                {value:18, text: "2004"},
                                {value:19, text: "2003"},
                                {value:20, text: "2002"});

  this.schoolMedium = new autoCompleteModal();
  this.schoolMedium.data = [];
  this.schoolMedium.className='';
  this.schoolMedium.placeholder = "Select School Medium";
  this.schoolMedium.data.push({value:0, text: "Assamese / Asomiya"},
                              {value:1, text: "Bengali / Bangla"},
                              {value:2, text: "English"},
                              {value:3, text: "Gujarati"},
                              {value:4, text: "Hindi"},
                              {value:5, text: "Kannada"},
                              {value:6, text: "Kashmiri"},
                              {value:7, text: "Konkani"},
                              {value:8, text: "Malayalam"},
                              {value:9, text: "Manipuri"},
                              {value:10, text: "Marathi"},
                              {value:11, text: "Oriya"},
                              {value:12, text: "Punjabi"},
                              {value:13, text: "Sanskrit"},
                              {value:14, text: "Tamil"},
                              {value:15, text: "Telugu"},
                              {value:16, text: "Urdu"},
                              {value:17, text: "Other"});
     
  this.totalMarks = new autoCompleteModal();
  this.totalMarks.data = [];
  this.totalMarks.className='';
  this.totalMarks.placeholder = "Select Total Marks";
  this.totalMarks.data.push({value:0, text: "< 40%"},
                            {value:1, text: "40-44.9%"},
                            {value:2, text: "45-49.9%"},
                            {value:3, text: "50-54.9%"},
                            {value:4, text: "55-59.9%"},
                            {value:5, text: "60-64.9%"},
                            {value:6, text: "65-69.9%"},
                            {value:7, text: "70-74.9%"},
                            {value:8, text: "75-79.9%"},
                            {value:9, text: "80-84.9%"},
                            {value:10, text: "85-89.9%"},
                            {value:11, text: "90-94.9%"},
                            {value:12, text: "95-99.9%"},
                            {value:13, text: "100%"});

  this.lastused = new autoCompleteModal();
  this.lastused.data = [];
  this.lastused.className='';
  this.lastused.placeholder = "Select last used";
  this.lastused.data.push({value:0, text: "2022"},
                          {value:1, text: "2021"},
                          {value:2, text: "2020"},
                          {value:3, text: "2019"},
                          {value:4, text: "2018"},
                          {value:5, text: "2017"},
                          {value:6, text: "2016"},
                          {value:7, text: "2015"},
                          {value:8, text: "2014"},
                          {value:9, text: "2013"},
                          {value:10, text: "2012"},
                          {value:11, text: "2011"},
                          {value:12, text: "2010"},
                          {value:13, text: "2009"},
                          {value:14, text: "2008"},
                          {value:15, text: "2007"},
                          {value:16, text: "2006"},
                          {value:17, text: "2005"},
                          {value:18, text: "2004"},
                          {value:19, text: "2003"},
                          {value:20, text: "2002"});
                              
    this.years = new autoCompleteModal();
    this.years.data = [];
    this.years.className='';
    this.years.placeholder = "Select Years";
    this.years.data.push({value:0, text: "0 year"},
                          {value:1, text: "1 year"},
                          {value:2, text: "2 years"},
                          {value:3, text: "3 years"},
                          {value:4, text: "4 years"},
                          {value:5, text: "5 years"},
                          {value:6, text: "6 years"},
                          {value:7, text: "7 years"},
                          {value:8, text: "8 years"},
                          {value:9, text: "9 years"},
                          {value:10, text: "10 years"},
                          {value:11, text: "11 years"},
                          {value:12, text: "12 years"},
                          {value:13, text: "13 years"},
                          {value:14, text: "14 years"},
                          {value:15, text: "15 years"},
                          {value:16, text: "16 years"},
                          {value:17, text: "17 years"},
                          {value:18, text: "18 years"},
                          {value:19, text: "19 years"},
                          {value:20, text: "20 years"},
                          {value:21, text: "21 years"},
                          {value:22, text: "22 years"},
                          {value:23, text: "23 years"},
                          {value:24, text: "24 years"},
                          {value:25, text: "25 years"},
                          {value:26, text: "26 years"},
                          {value:27, text: "27 years"},
                          {value:28, text: "28 years"},
                          {value:29, text: "29 years"},
                          {value:30, text: "30 years"});
                         
            
    this.months = new autoCompleteModal();
    this.months.data = [];
    this.months.className='';
    this.months.placeholder = "Select Months";
    this.months.data.push({value:0, text: "0 Month"},
                          {value:1, text: "1 Month"},
                          {value:2, text: "2 Months"},
                          {value:3, text: "3 Months"},
                          {value:4, text: "4 Months"},
                          {value:5, text: "5 Months"},
                          {value:6, text: "6 Months"},
                          {value:7, text: "7 Months"},
                          {value:8, text: "8 Months"},
                          {value:9, text: "9 Months"},
                          {value:10, text: "10 Months"},
                          {value:11, text: "11 Months"});
                                
    let data = this.nav.getValue();
    if(data){
      this.employmentDetailId = data.userId;
      this.initAddEmploymentForm();
      this.loaddata();
    }
    else
    ErrorToast("please login again..")
  }


  createData(){
    let finalAmount = Number(this.addEmploymentForm.get('inLacs').value) + Number(this.addEmploymentForm.get('inThousand').value);
    this.addEmploymentForm.get('currentAnnualSalary').setValue(finalAmount);
    let value = this.addEmploymentForm.value;
    this.htttp.post(`EmploymentDetail/addEmploymentDetail`, value).then(Response => {
      if(Response.responseBody){
        this.employmentData=Response.responseBody;
        this.initAddEmploymentForm();
        Toast("Record found");
        
      }
    })
  }

  selectEducation(e: any){
    let data = e;
    this.course = new autoCompleteModal();
    this.course.className='';
    this.course.placeholder = "Select Course";
    this.course.data = [];
    this.educationValue =0;
    this.educationQualification={
      below10th :false,
      tenth :false,
      twelve : false,
      graduation : false,
      masters : false,
      doctoratePhD : false
    };
    switch (data) {
      case 0:
        this.educationQualification.below10th=true;
      break;
      case 1:
        this.educationQualification.tenth=true;
      break;
      case 2:
        this.educationQualification.twelve=true;
      break;
      case 3:
        let graduateValue = this.courseData.filter(x => x.value >= 0 && x.value <= 23);
        for (let i = 0; i < graduateValue.length; i++) {
          this.course.data.push(graduateValue[i])
        }
        this.educationQualification.graduation=true;
      break;
      case 4:
          let masterValue = this.courseData.filter(x => x.value >= 24 && x.value <= 47);
          for (let i = 0; i < masterValue.length; i++) {
            this.course.data.push(masterValue[i])
          }
          this.educationQualification.masters=true;
      break;
      case 5:
        let doctorateValue = this.courseData.filter(x => x.value >= 48 && x.value <= 50);
        for (let i = 0; i < doctorateValue.length; i++) {
          this.course.data.push(doctorateValue[i]);
        }
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
    this.courseValue =0;
    switch (data) {
      case 0:
        let baValue = this.specializationDate.filter(x => (x.value >=0 && x.value <= 18) || x.value == 436);
        for (let i = 0; i < baValue.length; i++) {
          this.specialization.data.push(baValue[i]);
          
        }

        break;
    }

  }

  loaddata(){
    this.employmentDetailId=1;
    if(this.employmentDetailId > 0){
      this.htttp.get(`EmploymentDetail/getByEmploymentDetailId/${this.employmentDetailId}`).then(response =>{
        if(response.responseBody){
          this.employmentData=response.responseBody;
          console.log(this.employmentData);
          this.initAddEmploymentForm();
          if(this.employmentData.currentAnnualSalary>0){
                        let income = this.employmentData.currentAnnualSalary;
                          if(income > 100000){
                          let value = ((income/100000).toFixed(2)).toString();
                          let data = value.split('.')
                          this.addEmploymentForm.get('inLacs').setValue(data[0]);
                          this.addEmploymentForm.get('inThousand').setValue(data[1]);
                        }
                      }
                      

            
          let date = new Date(this.employmentData.joiningDate);
          this.model = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()};
          Toast("Record found");
        }
      })
    }
  }

  updateData(){
    let value = this.addEmploymentForm.value;
    
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
    this.educationModalReference = this.modalService.open(content,{ size: 'lg'});
  }

  itSkillsPopup(content){
    this.itSkillsModalReference = this.modalService.open(content,{size: 'lg'});
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

}

class EmploymentDetail {
  employmentDetailId: number=0;
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