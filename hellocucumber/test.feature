Feature: Feature name

    Feature Description
Given Start to type your Given step here
When Start to type your When step here
Then Start to type your Then step here
When Start to type your When step here


Scenario: Register to platform
    Given I am on the Activity Base Home page
    Then I should see “Login or Register”
    When I press “Register”
    Then I should see “Register”
    Then I fill in “username” with “user1”
    And I fill in “password” with “password”
    And I fill in “confirm_password” with “password”

Scenario: Login to platform
    Given I am on the Activity Base Login page
    Then I should see “Login”
    When I fill in “phone” with “0800000000”
    And I press “Get verify code”
    Then I should see “OTP”
    When I fill in “otp” with “123456”
    And I press “Login”
    Then I should be on the Activity Base Home page

Scenario: Supervisor wants to view workers’ shift
	Given I am on the Home Page after Login
	Then I should see “Table of SHIFT and OT Plan Dashboard”
	When I press “See All SHIFT Table”
	Then I should see “ALL SHIFT Table”
	When I press see “See All OT Plan Table”
	Then I should see “All OT Plan Table”

Scenario: Supervisor want to increase or decrease number of worker in worker’s shift
	Given I am on the Home Page after Login
	Then I should see “Table of SHIFT and OT Plan Dashboard” 	
	When I press “See All SHIFT Table”
	Then I should see “ALL SHIFT Table”
	When I press one of the worker’s shift
	Then I should see the list of that worker’s shift
	When I press “จัดการตารางงาน”
	Then I should see “Add Worker” and “Delete Worker”
	When I press “Add Worker”
	Then I should see “Add Worker”
	Then I fill “Employee Name”
	Then I fill “Time”
	When I press Delete Worker
	Then I should see “X” button in front of every worker
	When I press “X” that in front of “สมหมาย บุ้ยบุ่ย”
	Then I should see “Delete สมหมาย บุ่ยบุ่ย”
	And I should see “Yes” and ”No” button
	If I press “Yes”
	Then I should not see “สมหมาย บุ้ยบุ่ย” in the worker’s list
    If I press “No”
    Then I should see “สมหมาย บุ้ยบุ่ย” in the worker’s list

Scenario: Supervisor can Add shift
	Given I am on the Home Page after Login
	Then I should see “Table of SHIFT and OT Plan Dashboard”
	When I press “+”
	Then I should see “Add Shift”
	When I fill in “title” with “งานถอนหงอก 1”
	And I fill in “date” with “2021-10-10”
	And I fill in “start_time” with “00:00”
	And I fill in “end_time” with “23:59”
	And I fill in “shift_qty” with “40”
	And I fill in “shift_hours” with “2.5”
	Then I press “Add shift”
    Then I should see “งานถอนหงอก 1 shift”

Scenario: Supervisor can manage shift
	Given I am on the Home Page after Login
	Then I should see “Table of SHIFT and OT Plan Dashboard”
	When I press “See All SHIFT Table”
	Then I should see “ALL SHIFT Table”
	When I press one of the worker’s shift
	Then I should see the list of that worker’s shift
	When i press “จัดการตารางงาน”
	Then I should see “Edit Shift”
	When 22 fill in “title” with “งานถอนหงอก 1”
	And I fill in “date” with “2021-10-10”
	And I fill in “start_time” with “00:00”
	And I fill in “end_time” with “23:59”
	And I fill in “shift_qty” with “40”
	And I fill in “shift_hours” with “2.5”
	Then I press “Edit OT shift”
	Then I should see “งานถอนหงอก 1 shift”

Scenario: Supervisor want to assign OT Shift to all employee in one time
    Given I am on the Home Page after Login
	Then I should see “Table of SHIFT and OT Plan Dashboard”
	When I press “See All SHIFT Table”
	Then I should see “ALL SHIFT Table”
    When I press one of the worker’s shift
	Then I should see the list of that worker’s shift
	When I press “จัดการตารางงาน”
	Then I should see “Add OT”
	When I press “Add OT”
	Then I should see “Add OT”
	And I fill in “OT Time” with “2 hour”
	Then I press “OK”
	Then I should see every employee in  the list of worker’s shift on “OT Column”

Scenario: Supervisor want to assign OT Shift to specific employee in one time
	Given I am on the Home Page after Login
	Then I should see “Table of SHIFT and OT Plan Dashboard
	When I press “See All SHIFT Table”
	Then I should see “ALL SHIFT Table”
    When I press one of the worker’s shift
	Then I should see the list of that worker’s shift
	When I press on “สมปอง งานวัด” one of the employee
	Then I should see “Add OT”
    When I press “Add OT”
    Then I should see “Add OT”
    And I fill “2 hour”
    When I press “OK”
    Then I should see “สมปอง งานวัด” on the “OT Column”

Scenario: User can view their OT shift schedule
	Given I am on the Home Page after Login
	Then I should see “OT shift scheduler”

Scenario: User can contract their supervisor to report any incident
	Given I am on the Home Page after Login
    Then I should see “ติดต่อหัวหน้างาน” button
    When I press “ติดต่อหัวหน้างาน” button
    I should see “ติดต่อหัวหน้างาน”
    And I should see “หมวดหมู่” drop down list
    And I should see “รายละเอียด” text box
    When I press “หมวดหมู่” drop down list
	I should see “ไม่สามารถทำตามกะที่กำหนดได้”
	And “ขอเวลาทำ OT เพิ่ม”
	Then I select “ไม่สามารถทำตามกะที่กำหนดได้”
	And I fill in “รายละเอียด” with “ติดโควิด”
    Then I press “ยืนยัน”	
    Then I should see “เรียบร้อยแล้ว”




