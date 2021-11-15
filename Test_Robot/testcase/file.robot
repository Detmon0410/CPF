*** Settings ***
Library    SeleniumLibrary 

*** Test Cases ***
tc#1 Login to platform
    I am on the Activity Base Home page
    #I should see “Login or Register”
    #I press “Register”
    #I should see “Register”
    #I fill in “username” with “user1”
    #I fill in “password” with “password”
    #I fill in “confirm_password” with “password”

*** Keywords ***
I am on the Activity Base Home page
    open browser    Firefox
    go to   http://localhost:8080/sign-in
