const courseName=document.getElementById('courseName');
const courseCategory=document.getElementById('courseCategory');
const coursePrice=document.getElementById('coursePrice');
const courseDescription=document.getElementById('courseDescription');
const courseCapacity=document.getElementById('courseCapacity');
const addCourse=document.querySelector('[type="submit"]');
const deleteAll=document.getElementById('deleteBtn');
const isLocal=JSON.parse(localStorage.getItem('courses'))
let id=isLocal?.length || 0;
let courses=isLocal || [];
const tableCon=document.getElementById('data');
const invalidName=document.querySelector('.invalid-name');
const invalidCategory=document.querySelector('.invalid-category');
const invalidPrice=document.querySelector('.invalid-price');
const invalidDescription=document.querySelector('.invalid-description');
const invalidCapicity=document.querySelector('.invalid-capacity');
const allInput=document.querySelectorAll('input');
let flag=true;
allInput.forEach((item)=>{
 item.addEventListener('blur',()=>{
    validationCourse(item)
 })
})

const search=document.getElementById('search');
if(isLocal){
    renderCourse(courses)
}

function addCourseClick(e){
    console.log('addCourseClick')
    e.preventDefault();
    deleteAll.removeAttribute('disabled');
    const courseNameVal=courseName.value;
    const courseCategoryVal=courseCategory.value;
    const coursePriceVal=coursePrice.value;
    const courseDescriptionVal=courseDescription.value;
    const courseCapacityVal=courseCapacity.value;
    if(!flag || courseNameVal=='' || courseCategoryVal=='' || coursePriceVal=='' || courseDescriptionVal==''){
        alert('Please fill all fields');
        return;

    }
    const course={
        id:id++,
        name:courseNameVal,
        category:courseCategoryVal,
        price:coursePriceVal,
        description:courseDescriptionVal,
        capacity:courseCapacityVal
    }
    courses.push(course);
    saveToLocalStorge('courses',courses);
    renderCourse(courses);
}  
addCourse.addEventListener('click',addCourseClick);
// local storege
function saveToLocalStorge(key,item){
    localStorage.setItem(key,JSON.stringify(item));
}
function validationCourse(item){
  
 if(item.id=='courseName'){
   
    const coursePattren=/^[A-Z][a-z]{2,6}/
    if(!coursePattren.test(item.value)){
        invalidName.textContent='Invalid course name';
        invalidName.classList.add('is-invalid');
        flag=false;
        
    }
    else{
        invalidName.textContent='';
        invalidName.classList.remove('is-invalid')
    }
 } else if(item.id=='courseCategory'){
   
    const coursePattren=/^web(dev | design)/
    if(!coursePattren.test(item.value)){
        invalidCategory.textContent='Invalid course category';
        invalidCategory.classList.add('is-invalid')
        flag=false;
    }
    else{
        invalidCategory.textContent='';
        invalidCategory.classList.remove('is-invalid')
    }
 }else if(item.id=='courseCapacity'){
   console.log(item.vlaue)
    if(Number(item.value)>=50){
        invalidCapicity.textContent='Te capacity not exceeds 50';
        invalidCapicity.classList.add('is-invalid')
        flag=false;
    }
    else{
        invalidCapicity.textContent='';
        invalidCapicity.classList.remove('is-invalid')
    }}
 
}
//render course
function renderCourse(courses){
const content=courses.map((course,ind) => (
    `<tr>
        <td>${ind+1}</td>
        <td>${course.name}</td>
        <td>${course.category}</td>
        <td>${course.price}</td>
        <td>${course.description}</td>
        <td>${course.capacity}</td>
        <td><button onclick="updateCourse(${course.id})" class='btn btn-info'>update</button></td>
         <td><button onclick="deleteCourse(${course.id})" class='btn btn-danger'>delete</button></td>
    </tr>`
)).join(' ')
tableCon.innerHTML=content
}
function updateCourse(courseId){
    console.log(courseId)
    const course=courses.find(c=>c.id===courseId);
    console.log(course)
    courseName.value=course.name;
    courseCategory.value=course.category;
    coursePrice.value=course.price;
    courseDescription.value=course.description;
    courseCapacity.value=course.capacity;
    addCourse.textContent='Update';
    addCourse.removeEventListener('click',addCourseClick);
   addCourse.addEventListener('click', function updateCourseClick(e){
    e.preventDefault();
    if(flag){
    const courseNameVal=courseName.value;
    const courseCategoryVal=courseCategory.value;
    const coursePriceVal=coursePrice.value;
    const courseDescriptionVal=courseDescription.value;
    const courseCapacityVal=courseCapacity.value;
    const updatedCourse={
        id:courseId,
        name:courseNameVal,
        category:courseCategoryVal,
        price:coursePriceVal,
        description:courseDescriptionVal,
        capacity:courseCapacityVal
    }
    courses=courses.map(c=>c.id===courseId?updatedCourse:c);
    saveToLocalStorge('courses',courses);
    renderCourse(courses);
    addCourse.textContent='Add Course';
    addCourse.removeEventListener('click',updateCourseClick);
    addCourse.addEventListener('click',addCourseClick);
    reset();
   }});
   
 }

function reset(){
    courseName.value='';
    courseCategory.value='';
    coursePrice.value='';
    courseDescription.value='';
    courseCapacity.value='';
}
 //delete one course
 function deleteCourse(courseId){
    Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            courses=courses.filter(c=>c.id!==courseId);
            saveToLocalStorge('courses',courses);
            renderCourse(courses);
          Swal.fire({
            title: "Deleted!",
            text: "All course has been deleted.",
            icon: "success"
          });
        }
      });
   
 }

 //delete all course
 deleteAll.addEventListener('click',function (){

    Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            saveToLocalStorge('courses',courses);
            renderCourse(courses);
            deleteAll.setAttribute('disabled','disabled')
          Swal.fire({
            title: "Deleted!",
            text: "All course has been deleted.",
            icon: "success"
          });
        }
      });
  
 })
//live search
search.addEventListener('keyup',()=>{
    const value=search.value.toLowerCase();
    const result=courses.filter(c=>c.name.toLowerCase().includes(value));
    console.log(result)
    renderCourse(result);
  
 })
 //remove context menu
//  document.addEventListener('contextmenu', event => event.preventDefault());
 


