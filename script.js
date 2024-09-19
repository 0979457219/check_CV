

function checkStudent() {
    var resultCv
    const studentCode = document.getElementById("studentCode").value;
    const resultElement = document.getElementById("result");
    

    var timeInterview
    var fullname
    var classname
    var major
    // var birthdate

    resultElement.textContent = "Đang tra cứu...";

    
    fetch(`https://lcdkhoacntt1-ptit.tech/api/ctv-2024/result/${studentCode}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 200 && data.data.result === "approved") {
                resultCv = "pass";

                timeInterview = data.data.interviewTime
                fullname = data.data.fullname
                classname = data.data.className
                major = data.data.major

                resultElement.innerHTML = "Tra cứu thành công";
            } else {
                resultCv = "nopass"
                resultElement.textContent = "Tra cứu thành công";
            }
        })
        .catch(() => {
            resultElement.textContent = "Có lỗi xảy ra khi tra cứu, vui lòng thử lại!";
            resultCv = "error"
        })


        .finally(() => {
            
            if (resultCv === "pass") {
                createSliderPass(studentCode, fullname, classname, major, timeInterview);
                show();
            } else if (resultCv === "nopass") {
                createSliderNoPass(studentCode);
                show();
            }
            else
            {
                setTimeout(function() {
                    location.reload();
                }, 1000);
                
            }
            
        });
        
        
        

}


function createSliderPass(studentCode, fullname, classname, major, timeInterview) {
    const sliderContainer = document.querySelector('.result-slider');
   
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('slider-content'); 

    const msv = document.createElement('p');
    msv.classList.add('slider-msv'); 
    msv.innerHTML = "Mã sinh viên: <strong>" + studentCode + "</strong>";    

    const name = document.createElement('p');
    name.classList.add('slider-name'); 
    name.innerHTML = "Họ và tên: <strong>" + fullname + "</strong>";

    const ma_lop = document.createElement('p');
    ma_lop.classList.add('slider-classname'); 
    ma_lop.innerHTML = "Mã lớp: <strong>" + classname + "</strong>";

    const nganh = document.createElement('p');
    nganh.classList.add('slider-major'); 
    nganh.innerHTML = "Ngành học: <strong>" + major + "</strong>";

    // const date = document.createElement('p');
    // date.classList.add('slider-date'); 
    // date.innerHTML = "Ngày sinh: <strong>" + birthdate + "</strong>";


    const ket_qua = document.createElement('p');
    ket_qua.classList.add('slider-kq'); 
    ket_qua.innerHTML = "<strong>Xin chúc mừng </strong>" + fullname + " đã xuất sắc vượt qua vòng CV.<br>" + 
    "Vui lòng xem kỹ khung thời gian phỏng vấn của bạn và liên hệ với chúng tôi nếu có bất kỳ<br>thay đổi hoặc thắc mắc nào!";

    const timeIn = document.createElement('p');
    timeIn.classList.add('slider-timeIn'); 
    timeIn.innerHTML = "Thời gian phỏng vấn: <strong>" + timeInterview + "</strong><br>" +
    "Địa điểm: <strong>Hội trường A1 </strong>- HVCNBCVT cơ sở Hà Đông" ;

        
    itemDiv.appendChild(name);
    itemDiv.appendChild(msv);
    // itemDiv.appendChild(date);
    itemDiv.appendChild(ma_lop);
    itemDiv.appendChild(nganh);
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
        ket_qua.innerHTML = "Dựa trên thông tin bạn chia sẻ trong CV, chúng tôi rất tiếc phải thông báo rằng bạn<br>chưa phù hợp với vai trò CTV mà chúng tôi đang tìm kiếm. Cảm ơn bạn đã quan tâm và hy vọng<br>bạn sẽ tiếp tục ủng hộ các hoạt động của Liên chi Đoàn trong tương lai.<br><br>" + 
        "<em>Vui lòng liên hệ với chúng tôi nếu có bất kỳ thắc mắc nào!</em>";
        

        itemDiv.appendChild(msv);
        itemDiv.appendChild(ket_qua);

        sliderContainer.appendChild(itemDiv);
    
}

    



const page_result = document.querySelector('.js-result-page')
const btn_search = document.querySelector('.js_btn_search')
const btn_close = document.querySelector('.js-modal-close')

const contact_close = document.querySelector('.js-contact-close')
const contact_more = document.querySelector('.js_contact_more')
const contact_page = document.querySelector('.contact-page')

const contact_double_close = document.querySelector('.js-double-close')






function show () {
        page_result.classList.remove('hide')    
    
}

function hide () {
    page_result.classList.add('hide')
    location.reload();
}

function show_contact_more() {
    page_result.classList.add('hide')
    contact_page.classList.remove('hide')
}

function hide_contact_more() {
    page_result.classList.remove('hide')
    contact_page.classList.add('hide')
}

btn_close.addEventListener('click', hide)

contact_more.addEventListener('click', show_contact_more)
contact_close.addEventListener('click', hide_contact_more)

contact_double_close.addEventListener('click', hide)




document.getElementById('studentCode').addEventListener('keypress', function(event) {
    // Kiểm tra nếu phím nhấn là Enter
    if (event.key === 'Enter') {
        checkStudent();
    }
});