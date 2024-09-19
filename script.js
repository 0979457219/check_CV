

function checkStudent() {
    var resultCv
    const studentCode = document.getElementById("studentCode").value;
    const resultElement = document.getElementById("result");
    

    var timeInterview
    var fullname
    var birthdate

    resultElement.textContent = "Đang tra cứu...";

    
    fetch(`https://lcdkhoacntt1-ptit.tech/api/ctv-2024/result/${studentCode}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 200 && data.data.result === "approved") {
                resultCv = "pass";
                timeInterview = data.data.interviewTime


                resultElement.innerHTML = "Tra cứu thành công";
            } else {
                resultCv = "nopass"
                resultElement.textContent = "Tra cứu thành công";
            }
        })
        .catch(() => {
            resultElement.textContent = "Có lỗi xảy ra khi tra cứu, vui lòng thử lại!";
            resultCv = "error"
        });




        fetch(`https://lcdkhoacntt1-ptit.tech/api/ctv-2024/interview-info/all?otp=abc`)
        .then(response => response.json())
        .then(data => {
            const student = data.data.find(student => student.studentCode === studentCode);
            fullname = student.fullname
            birthdate = student.birthDate
            

            
        })
        
    

        .finally(() => {
            
            if (resultCv === "pass") {
                createSliderPass(studentCode, fullname, birthdate, timeInterview);
                show();
            } else if (resultCv === "nopass") {
                createSliderNoPass(studentCode);
                show();
            }
            else
            {
                location.reload();
            }
            
        });
        
        
        

}


function createSliderPass(studentCode, fullname, birthdate, timeInterview) {
    const sliderContainer = document.querySelector('.result-slider');
   
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('slider-content'); 

    const msv = document.createElement('p');
    msv.classList.add('slider-msv'); 
    msv.innerHTML = "Mã sinh viên: <strong>" + studentCode + "</strong>";    

    const name = document.createElement('p');
    name.classList.add('slider-name'); 
    name.innerHTML = "Họ và tên: <strong>" + fullname + "</strong>";

    const date = document.createElement('p');
    date.classList.add('slider-date'); 
    date.innerHTML = "Ngày sinh: <strong>" + birthdate + "</strong>";


    const ket_qua = document.createElement('p');
    ket_qua.classList.add('slider-kq'); 
    ket_qua.innerHTML = "<strong>Xin chúc mừng </strong>" + fullname + " đã xuất sắc vượt qua vòng CV.<br>" + 
    "Vui lòng xem kỹ thông tin phỏng vấn và liên hệ với chúng tôi nếu có bất kỳ thay đổi hoặc thắc mắc nào!";

    const timeIn = document.createElement('p');
    timeIn.classList.add('slider-timeIn'); 
    timeIn.innerHTML = "Thời gian phỏng vấn: <strong>" + timeInterview + "</strong><br>" +
    "Địa điểm: <strong>Hội trường A1 </strong>- HVCNBCVT cơ sở Hà Đông" ;

        
    itemDiv.appendChild(name);
    itemDiv.appendChild(msv);
    itemDiv.appendChild(date);
    itemDiv.appendChild(ket_qua);
    itemDiv.appendChild(timeIn);

    sliderContainer.appendChild(itemDiv)
}

function createSliderNoPass(studentCode) {
    const sliderContainer = document.querySelector('.result-slider');
   
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('slider-content'); 

        const msv = document.createElement('p');
    msv.classList.add('slider-msvNoPass'); 
    msv.innerHTML = "Mã sinh viên: <strong>" + studentCode + "</strong>";    

        const ket_qua = document.createElement('p');
        ket_qua.classList.add('slider-kq'); 
        ket_qua.innerHTML = "Rất tiếc! Bạn không vượt qua vòng CV.<br>" + 
    "Vui lòng liên hệ với chúng tôi nếu có bất kỳ thắc mắc nào!";
        

        itemDiv.appendChild(msv);
        itemDiv.appendChild(ket_qua);

        sliderContainer.appendChild(itemDiv);
    
}

    



const page_result = document.querySelector('.js-result-page')
const btn_search = document.querySelector('.js_btn_search')
const btn_close = document.querySelector('.js-modal-close')

function show () {
        page_result.classList.remove('hide')
    
    
}

function hide () {
    page_result.classList.add('hide')
    location.reload();
}

// btn_search.addEventListener('click', show)
btn_close.addEventListener('click', hide)





document.getElementById('studentCode').addEventListener('keypress', function(event) {
    // Kiểm tra nếu phím nhấn là Enter
    if (event.key === 'Enter') {
        checkStudent();
    }
});