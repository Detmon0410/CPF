*** Settings ***
Library    SeleniumLibrary 

*** Variables ***
${url}=    http://localhost:8080/sign-in 
*** Test Cases ***
tc#1 Login to platform 
    
    I am on the Activity Base Home page
    I should see Login Box 
    I type manager phone number into number box and click
    # manager 0935461545, employee 0983902707, psw: 123456
    #I should see “Login or Register”
    #I press “Register”
    #I should see “Register”
    #I fill in “username” with “user1”
    #I fill in “password” with “password”
    #I fill in “confirm_password” with “password”
#robot -d result/tc1 -t "tc#1*" testcase/file.robot"

tc#3 Employee Log In   
    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type employee phone number into number box and click
    #password login part
    I should see password employee confirmation page
    I type password and click submit



tc#5 Check Employee NavBar
    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type employee phone number into number box and click
    #password login part
    I should see password employee confirmation page
    I type password and click submit
    # NabBar Part
    I should see the employe page NavBar

tc#7 Check Employee calendar&timecard
    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type employee phone number into number box and click
    #password login part
    I should see password employee confirmation page
    I type password and click submit
    #Calendar Part
    I should see calendar
    #Timecard Part
    I should see timecard

tc#9 Check Employee shifting table
    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type employee phone number into number box and click
    #password login part
    I should see password employee confirmation page
    I type password and click submit
    #shifting table part
    I should see shifting table

#Manager TEST
tc#2 Manager Log In
    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type manager phone number into number box and click
    #password login part
    I should see password manager confirmation page
    I type password and click submit

tc#4 Check Manager NavBar
    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type manager phone number into number box and click
    #password login part
    I should see password manager confirmation page
    I type password and click submit
    # NavBar Details
    I should see the manager NavBar 
    
tc6# Manager can see add work button and add work table
    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type manager phone number into number box and click
    #password login part
    I should see password manager confirmation page
    I type password and click submit
    #press add work button
    I should see add work button
    I press add work button
    #See Add work page details
    I should see add work page details
    





*** Keywords ***
I am on the Activity Base Home page
    open browser    ${url}    Firefox

I should see Login Box
    Page Should Contain    เข้าสู่ระบบ
    Page Should Contain    เบอร์โทรศัพท์
    Page Should Contain Button    เข้าสู่ระบบ
    Page Should Contain Element   xpath=//*[@id="root"]/section/div/div/p[2]

I type manager phone number into number box and click
    Input Text    id=outlined-basic    0935461545
    Click Element    xpath=//*[@id="root"]/section/div/div/form/button

I type employee phone number into number box and click
    Input Text    id=outlined-basic    0983902707
    Click Element    xpath=//*[@id="root"]/section/div/div/form/button

I should see password manager confirmation page
    Page Should Contain    กรอกรหัสยืนยัน
    Page Should Contain    รหัสยืนยัน 6 หลักจะถูกส่งไปที่ เบอร์ 0935461545
    Page Should Contain    รหัสยืนยัน
    Page Should Contain Button    ยืนยัน

I should see password employee confirmation page
    Page Should Contain    กรอกรหัสยืนยัน
    Page Should Contain    รหัสยืนยัน 6 หลักจะถูกส่งไปที่ เบอร์ 0983902707
    Page Should Contain    รหัสยืนยัน
    Page Should Contain Button    ยืนยัน
    
I type password and click submit
    Input Text    id=outlined-basic    123456
    Click Element    xpath=//*[@id="root"]/section/div/div/form/button


    
    
    
    
I should see the employe page NavBar
    Page Should Contain    CPF
    Page Should Contain    เดชมนต์ แจ้งจิตต์
    Page Should Contain    ออกจากระบบ

I should see calendar
    Page Should Contain    «
    Page Should Contain    ‹
    Page Should Contain Element    class:react-calendar  
    Page Should Contain Element    class:react-calendar__navigation__label
    Page Should Contain    ›
    Page Should Contain    »



I should see timecard
    Page Should Contain Element    class:timecard
    #time class detail
    Page Should Contain Element    class:mb-3
    Page Should Contain    สถานะ :
    Page Should Contain    ระยะเวลาทำงาน :
    Page Should Contain    ลงเวลางาน
    Page Should Contain    ติดต่อหัวหน้างาน
    Page Should Contain    เวลางานที่ได้รับมอบหมาย

I should see shifting table
    #Page Should Contain    DAY
    #Page Should Contain    xpath=//*[@id="root"]/section/div/section[2]/div/div/div[2]/div/div[2]/div/div[2]/div/div/div/div
    #Page Should Contain    xpath: //*[contains(text(), "example")]
    Page Should Contain Element    tag=table   
    Page Should Contain Element    tag=td    tabindex:0
    Page Should Contain    6:30 AM
    Page Should Contain Element    tag=table    class=MuiTable-root makeStyles-timeScaleContainer-41
# Manager Test

I should see the manager NavBar
    Page Should Contain    CPF
    Page Should Contain Element    tag=p    ณัฐกฤตย์ จตุภัทรดิษฐ์
    Page Should Contain    ออกจากระบบ

I should see working table
    Page Should Contain    xpath=//*[@id="table"]
    Page Should Contain    xpath=//*[@id="root"]/section/div/div[1]/table
    
I should see add work button
    Page Should Contain    xpath=//*[@id="root"]/section/div/div[1]/div/div[2]/button[1]

I should see edit work button
    Page Should Contain    xpath=//*[@id="root"]/section/div/div[1]/div/div[2]/button[2]

   
I press add work button
    Page Should Contain Button    เพิ่มตารางงาน

I should see add work page details
    Page Should Contain    ชื่องาน
    Page Should Contain    เลือกวันที่ทำงาน
    Page Should Contain    xpath=/html/body/div[2]/div[3]/div/div[2]/div[1]/div[2]/div[1]
    Page Should Contain    